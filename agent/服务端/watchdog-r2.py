import os, time, datetime, socket
import argparse
import email.utils
import http.client
import ssl
from pathlib import Path

CHECK_INTERVAL = 60
MAX_MISSES = 6
DAILY_LIMIT = 10

DEBUG_LOG_MISSES = True

servers = {
    "mc-create-cn": {
        "port": 25591,
        "service": "mc-create-cn-r2",
        "misses": 0,
        "restarts_today": 0,
    },
    "mc-train-cn": {
        "port": 25590,
        "service": "mc-train-cn-r2",
        "misses": 0,
        "restarts_today": 0,
    },
}

def is_server_live(port, host="127.0.0.1"):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1.0)
    try:
        s.connect((host, port))
        return True
    except (OSError):
        if DEBUG_LOG_MISSES and host == "127.0.0.1":
            log(f"DEBUG: {port} missed.")
        return False
    finally:
        s.close()

def log(msg):
    print(msg)
    timestamp = '[' + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S") + '] '
    with open("watchdog-r2.log", "a", encoding="utf-8") as f:
        f.write(timestamp + msg + "\n")

# Daohome schedules its daily startup at 00:16 on its own UTC+8 clock.
NAS_WOL_DEFAULT = True
NAS_HOST = "192.168.1.252"
NAS_BROADCAST = "192.168.1.255"
NAS_MAC = bytes.fromhex("001132653369")
NAS_WAKE_MINUTE = 16


def parse_watchdog_args(argv=None):
    parser = argparse.ArgumentParser(description="Minecraft and NAS watchdog")
    parser.add_argument("--nas-wol", action=argparse.BooleanOptionalAction,
                        default=NAS_WOL_DEFAULT, help="enable scheduled NAS wake-on-LAN")
    return parser.parse_args(argv)


def nas_next_wake(host_now):
    """Translate the NAS clock to the host's next wake deadline."""
    connection = http.client.HTTPSConnection(
        NAS_HOST, 5001, timeout=2, context=ssl._create_unverified_context()
    )
    try:
        connection.request("HEAD", "/")
        response = connection.getresponse()
        if response.status != 200:
            raise ValueError(f"DSM HTTP {response.status}")
        nas_time = email.utils.parsedate_to_datetime(response.getheader("Date")).timestamp()
    finally:
        connection.close()
    local_seconds = (nas_time + 8 * 3600) % 86400
    return round(host_now + (NAS_WAKE_MINUTE * 60 - local_seconds) % 86400)


def send_nas_wol():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        sock.sendto(b"\xff" * 6 + NAS_MAC * 16, (NAS_BROADCAST, 9))


class NasWakeWatch:
    def __init__(self, state_file):
        self.state_file = state_file
        self.next_sync = 0
        self.wake_at = 0
        self.attempts = 0
        self.misses = 0
        if state_file.is_file():
            try:
                self.wake_at, self.attempts = map(int, state_file.read_text().split())
            except (ValueError, OSError) as error:
                print(f"NAS WOL: cannot load schedule: {error}", flush=True)

    def save(self):
        temp = self.state_file.with_suffix(".tmp")
        temp.write_text(f"{self.wake_at} {self.attempts}\n")
        temp.replace(self.state_file)

    def check(self, now):
        # Learn clock changes while DSM is available, including corrections by NTP.
        if now >= self.next_sync:
            self.next_sync = now + 600
            try:
                wake = nas_next_wake(now)
            except (OSError, http.client.HTTPException, TypeError, ValueError):
                pass  # Keep the last measured deadline through the scheduled shutdown.
            else:
                if abs(wake - self.wake_at) > 10:
                    self.wake_at = wake
                    self.attempts = self.misses = 0
                    self.save()
                    deadline = datetime.datetime.fromtimestamp(wake, datetime.timezone.utc)
                    log(f"NAS WOL: next scheduled startup {deadline.isoformat()}")
        if not self.wake_at or now < self.wake_at:
            return
        # Bound each day's wake window even if the service was stopped for maintenance.
        if now - self.wake_at >= 3600 * 2:
            self.wake_at += (int((now - self.wake_at - 7200) // 86400) + 1) * 86400
            self.attempts = self.misses = 0
            self.save()
            if now < self.wake_at:
                return
        if is_server_live(2049, NAS_HOST) or is_server_live(5001, NAS_HOST):
            self.wake_at += 86400
            self.attempts = self.misses = 0
            self.save()
            log("NAS WOL: NAS is awake")
            return
        if self.attempts >= DAILY_LIMIT:
            return
        self.misses += 1
        if self.misses >= MAX_MISSES:
            self.misses = 0
            self.attempts += 1
            self.save()
            send_nas_wol()
            log(f"NAS WOL: sent magic packet ({self.attempts}/{DAILY_LIMIT})")


if __name__ == "__main__":
    args = parse_watchdog_args()
    nas = NasWakeWatch(Path("/var/lib/mc-watchdog-r2-nas-wol.state")) if args.nas_wol else None
    log(f"NAS WOL: {'enabled' if nas else 'disabled'}")
    log("Watchdog R2 started.")

    today = datetime.date.today()
    while True:
        if today != datetime.date.today():
            for cfg in servers.values():
                cfg["restarts_today"] = 0
            today = datetime.date.today()

        for server, cfg in servers.items():
            cfg["misses"] = 0 if is_server_live(cfg["port"]) else cfg["misses"] + 1

            if cfg["misses"] >= MAX_MISSES:
                if cfg["restarts_today"] < DAILY_LIMIT:
                    log(f"{server}: Restarting, {cfg['restarts_today'] + 1}/{DAILY_LIMIT}.")
                    os.system(f"systemctl restart {cfg['service']}")
                if cfg["restarts_today"] == DAILY_LIMIT:
                    log(f"{server}: Daily restart limit({DAILY_LIMIT}) reached, giving up on further restarts.")
                cfg["misses"] = 0
                cfg["restarts_today"] += 1

        if nas is not None:
            try:
                nas.check(time.time())
            except (OSError, ValueError) as error:
                log(f"NAS WOL: {error}")

        time.sleep(CHECK_INTERVAL)
