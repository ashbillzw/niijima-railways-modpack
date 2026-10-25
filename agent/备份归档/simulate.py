"""Reproduce hourly retention with a completed backup every two days."""
import argparse
import json
from archive import Backup, DAY, deletion_order


def simulate(days, policy):
    kept = []
    snapshots = {}
    for hour in range(max(days) * 24 + 1):
        now = hour * 3600
        if hour % 48 == 0:
            kept.append(Backup(str(hour), now, ()))
        latest = hour // 48 * 48
        protected = {str(h) for h in range(max(0, latest-288), latest+1, 48)}
        removed = {b.name for b in deletion_order(kept, protected, now, policy)}
        kept = [b for b in kept if b.name not in removed]
        if hour % 24 == 0 and hour // 24 in days:
            snapshots[hour//24] = [(now-b.timestamp)//DAY for b in reversed(kept)]
    return snapshots


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--days', type=int, nargs='+', default=[100, 200, 500, 1000])
    args = parser.parse_args()
    if min(args.days) < 0:
        parser.error('days must be nonnegative')
    print(json.dumps(simulate(args.days, {'min_days': 7, 'ratio': .3, 'max_days': 180}), indent=2))
