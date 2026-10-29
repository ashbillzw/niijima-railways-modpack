import unittest
from input_gate import InputGate, UiLease

class LeaseTests(unittest.TestCase):
    def test_timeout_and_reconnect_do_not_restore_permission(self):
        now = [0]
        lease = UiLease(clock=lambda: now[0])
        lease.set_enabled(True)
        now[0] = 14
        self.assertTrue(lease.expire())
        now[0] = 15
        self.assertFalse(lease.expire())
        lease.heartbeat()
        self.assertFalse(lease.enabled)

    def test_heartbeat_renews_and_disconnect_revokes(self):
        now = [0]
        lease = UiLease(clock=lambda: now[0])
        lease.set_enabled(True)
        now[0] = 10
        lease.heartbeat()
        now[0] = 20
        self.assertTrue(lease.expire())
        lease.disconnect()
        lease.heartbeat()
        self.assertFalse(lease.enabled)

    def test_expiry_preserves_pending_and_input(self):
        now = [0]
        lease = UiLease(clock=lambda: now[0])
        gate = InputGate()
        lease.set_enabled(True)
        gate.user_input('draft')
        queued = gate.offer('echo waiting\r')
        now[0] = 16
        lease.expire()
        self.assertTrue(gate.dirty)
        self.assertEqual(gate.pending['id'], queued['id'])
        self.assertEqual(gate.offer('second\r', require_confirmation=not lease.enabled)['status'], 'busy')

class GateTests(unittest.TestCase):
    def test_terminal_replies_are_not_user_input(self):
        for report in ['\x1b[?1;2c','\x1b[>0;276;0c','\x1b[12;40R','\x1b[I','\x1b[O','\x1b]10;rgb:ffff/ffff/ffff\x1b\\']:
            g=InputGate(); g.user_input(report)
            self.assertFalse(g.dirty,repr(report))
            self.assertEqual(g.offer('echo test\r')['status'],'sent')
            g.user_input('draft'); g.user_input(report)
            self.assertTrue(g.dirty)

    def test_overwrite_cancels_and_sends_exactly_once(self):
        g=InputGate(); g.user_input('draft'); r=g.offer('echo replacement\r')
        self.assertEqual(g.confirm(r['id'],overwrite=True),'\x03echo replacement\r')
        self.assertFalse(g.dirty)
        with self.assertRaises(ValueError):g.confirm(r['id'],overwrite=True)

    def test_collision_requires_confirmation_even_after_enter(self):
        g=InputGate(); g.user_input('ssh custom-sz-cn')
        result=g.offer('echo assistant\r')
        self.assertEqual(result['status'],'queued')
        with self.assertRaises(ValueError): g.confirm(result['id'])
        g.user_input('\r')
        self.assertIsNotNone(g.pending)
        self.assertEqual(g.confirm(result['id']),'echo assistant\r')
        with self.assertRaises(ValueError): g.confirm(result['id'])

    def test_history_and_backspace_are_conservative(self):
        for text in ['\x1b[A', 'x\b', '\x1b[200~echo x\x1b[201~']:
            g=InputGate(); g.user_input(text)
            self.assertTrue(g.dirty)
            g.user_input('\x03')
            self.assertFalse(g.dirty)

    def test_queued_command_is_never_overwritten(self):
        g=InputGate(); g.user_input('x')
        first=g.offer('first\r')
        self.assertEqual(g.offer('second\r')['status'],'busy')
        self.assertEqual(g.pending['text'],'first\r')
        g.reject(first['id'])
        self.assertIsNone(g.pending)

    def test_typing_again_blocks_stale_confirmation(self):
        g=InputGate(); g.user_input('x'); r=g.offer('test\r')
        g.user_input('\x03'); g.user_input('new draft')
        with self.assertRaises(ValueError): g.confirm(r['id'])

if __name__=='__main__': unittest.main()
