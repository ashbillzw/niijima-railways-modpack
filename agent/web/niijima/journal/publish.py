"""Render manually edited articles from journal/issues into the static website."""
from datetime import date
from html import escape
from pathlib import Path
from urllib.parse import quote

from markdown_it import MarkdownIt

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT.parent / "dist" / "journal"


def publish(source=ROOT / "issues", output=OUTPUT):
    template = (ROOT / "page.html").read_text(encoding="utf-8")
    markdown = MarkdownIt("commonmark", {"html": False})
    issues = []
    for path in sorted(source.glob("*.md"), reverse=True):
        day = date.fromisoformat(path.stem[:10]).isoformat()
        heading, author, body = path.read_text(encoding="utf-8").split("\n", 2)
        if not heading.startswith("# ") or not author.startswith("署名：") or not body.strip():
            raise ValueError(f"{path}: 需要标题、署名和正文")
        title = escape(heading[2:].strip())
        url = "/v3/journal/" + quote(path.stem) + "/"
        link = f'<a href="{url}" target="_parent">{title}</a>'
        article = (f'<article><h2>{link}</h2><div class="byline"><time>{day}</time>'
                   f' · {escape(author[3:].strip())}</div>{markdown.render(body)}</article>')
        issues.append((path.stem, article, f'<li><time>{day}</time>{link}</li>'))

    def write(directory, content):
        directory.mkdir(parents=True, exist_ok=True)
        (directory / "index.html").write_text(template.replace("<!-- published issues -->", content), encoding="utf-8")

    for slug, article, _ in issues:
        write(output / slug, article)
    archive = '<ol>' + ''.join(entry for _, _, entry in issues[1:]) + '</ol>' if len(issues) > 1 else ''
    write(output, (issues[0][1] if issues else '') + archive)


if __name__ == "__main__":
    publish()
