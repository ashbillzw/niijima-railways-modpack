import collections
import argparse
import os
import hmac
import json
import pathlib
import secrets
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

ROOT = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / 'vendor'))
from winpty import PtyProcess
from input_gate import InputGate, UiLease

parser = argparse.ArgumentParser()
parser.add_argument('--session-file', default='session.json')
args = parser.parse_args()
session_file = ROOT / args.session_file

ui_token, agent_token = secrets.token_urlsafe(32), secrets.token_urlsafe(32)
lock = threading.RLock()
chunks = collections.deque(maxlen=2048)
sequence = 0
approval = UiLease()
gate = InputGate()
terminal_env = dict(os.environ, TERM='xterm-256color', COLORTERM='truecolor')
proc = PtyProcess.spawn(['cmd.exe', '/Q'], cwd=str(ROOT), env=terminal_env, dimensions=(32, 110))

def reader():
    global sequence
    try:
        while True:
            value = proc.read(8192)
            if not value:
                break
            with lock:
                sequence += 1
                chunks.append((sequence, value, False))
    except (EOFError, OSError):
        pass

def expire_approval():
    while not closing.wait(1):
        with lock:
            approval.expire()

closing = threading.Event()

class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def reply(self, status, data, mime='application/json'):
        if not isinstance(data, bytes):
            data = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', mime)
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'")
        self.end_headers()
        self.wfile.write(data)

    def valid_host(self):
        return self.headers.get('Host') == f'127.0.0.1:{self.server.server_port}'

    def do_GET(self):
        if not self.valid_host():
            return self.reply(403, {})
        paths = {'/': ('index.html', 'text/html; charset=utf-8'), '/app.js': ('app.js', 'text/javascript'), '/xterm.js': ('static/xterm.js', 'text/javascript'), '/xterm.css': ('static/xterm.css', 'text/css')}
        item = paths.get(urlsplit(self.path).path)
        if not item:
            return self.reply(404, {})
        self.reply(200, (ROOT / item[0]).read_bytes(), item[1])

    def do_POST(self):
        origin = f'http://127.0.0.1:{self.server.server_port}'
        if not self.valid_host() or self.headers.get('Origin', origin) != origin:
            return self.reply(403, {})
        token = self.headers.get('Authorization', '').removeprefix('Bearer ')
        is_ui = hmac.compare_digest(token, ui_token)
        is_agent = hmac.compare_digest(token, agent_token)
        if not (is_ui or is_agent):
            return self.reply(403, {'error': 'Authentication required'})
        size = int(self.headers.get('Content-Length', 0))
        if not 0 <= size <= 65536:
            return self.reply(413, {})
        try:
            data = json.loads(self.rfile.read(size))
            with lock:
                approval.expire()
                if closing.is_set():
                    return self.reply(409, {'error': 'Terminal is stopping'})
                if self.path == '/state':
                    if is_ui:
                        approval.heartbeat()
                    after = int(data.get('after', 0))
                    output = ''.join(t for n, t, hidden in chunks if n > after)
                    return self.reply(200, {'version': 6, 'cursor': sequence, 'output': output, 'allow_all': approval.enabled, 'alive': proc.isalive(), 'user_input_active': gate.dirty, 'pending': gate.pending})
                if self.path == '/ui-disconnect' and is_ui:
                    approval.disconnect()
                    return self.reply(200, {'ok': True})
                if self.path == '/allow-all' and is_ui:
                    approval.set_enabled(bool(data['enabled']))
                    if approval.enabled and gate.pending is not None and not gate.dirty:
                        proc.write(gate.confirm(gate.pending['id']))
                    return self.reply(200, {'allow_all': approval.enabled})
                if self.path == '/input':
                    text = data['text']
                    if not isinstance(text, str):
                        raise ValueError('text must be a string')
                    if is_agent:
                        result = gate.offer(text, require_confirmation=not approval.enabled)
                        if result['status'] != 'sent':
                            return self.reply(409 if result['status'] == 'busy' else 202, result)
                    else:
                        gate.user_input(text)
                    proc.write(text)
                    return self.reply(200, {'ok': True, 'status': 'sent'})
                if self.path == '/confirm' and is_ui:
                    try:
                        text = gate.confirm(data['id'], overwrite=data.get('overwrite') is True)
                    except ValueError as exc:
                        return self.reply(409, {'error': str(exc)})
                    proc.write(text)
                    return self.reply(200, {'status': 'sent'})
                if self.path == '/reject' and is_ui:
                    gate.reject(data['id'])
                    return self.reply(200, {'status': 'discarded'})
                if self.path == '/stop' and is_ui:
                    approval.disconnect()
                    try:
                        proc.close(force=True)
                        if proc.isalive():
                            raise OSError('Terminal process is still alive')
                    except Exception as exc:
                        print('Terminal close failed: ' + repr(exc), file=sys.stderr, flush=True)
                        return self.reply(500, {'error': 'Failed to close terminal'})
                    closing.set()
                    try:
                        return self.reply(200, {'ok': True})
                    finally:
                        threading.Thread(target=self.server.shutdown, daemon=True).start()
            self.reply(404, {})
        except (ValueError, KeyError, TypeError):
            self.reply(400, {'error': 'Invalid request'})

server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
session = {'url': f'http://127.0.0.1:{server.server_port}', 'ui_token': ui_token, 'agent_token': agent_token}
session_file.write_text(json.dumps(session), encoding='utf-8')
threading.Thread(target=reader, daemon=True).start()
threading.Thread(target=expire_approval, daemon=True).start()
print('Shared terminal ready at ' + session['url'], flush=True)
try:
    server.serve_forever()
finally:
    closing.set()
    try:
        proc.close(force=True)
    finally:
        server.server_close()
        session_file.unlink(missing_ok=True)
