import secrets
import re

# Device/status reports and focus notifications are terminal protocol traffic.
# Keep forwarding them to the PTY, but never treat them as an edited command.
TERMINAL_REPLY = re.compile(r'(?:\x1b\[(?:[?>]?[0-9;]*c|[?]?[0-9]+;[0-9]+R|[IO]|0n)|\x1b\](?:10|11|12);[^\x07\x1b]*(?:\x07|\x1b\\))+')

class InputGate:
    """Track input activity conservatively; never retain user keystrokes."""
    def __init__(self):
        self.dirty = False
        self.pending = None

    def user_input(self, text):
        if TERMINAL_REPLY.fullmatch(text):
            return
        for char in text:
            self.dirty = char not in '\r\n\x03'

    def offer(self, text, require_confirmation=False):
        if self.pending is not None:
            return {'status': 'busy', 'id': self.pending['id']}
        if self.dirty or require_confirmation:
            self.pending = {'id': secrets.token_hex(12), 'text': text}
            return {'status': 'queued', 'id': self.pending['id']}
        return {'status': 'sent'}

    def confirm(self, request_id, overwrite=False):
        if not self.pending or self.pending['id'] != request_id:
            raise ValueError('Pending command has changed')
        if self.dirty and not overwrite:
            raise ValueError('Finish or cancel your current input before sending')
        text = self.pending['text']
        self.pending = None
        if overwrite:
            self.dirty = False
            return '\x03' + text
        return text

    def reject(self, request_id):
        if not self.pending or self.pending['id'] != request_id:
            raise ValueError('Pending command has changed')
        self.pending = None
