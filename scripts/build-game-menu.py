"""Freeze the offline shell from the online homepage; keep geometry and entry UI identical."""
from pathlib import Path
import re
import shutil

repo = Path(__file__).resolve().parents[1]
site = repo / 'agent/web/niijima/dist'
target = repo / 'pack/overrides/config/fancymenu/assets/niijima'

def expand(text):
    text = re.sub(r'<!--#\s*include virtual="/v3/([^"]+)"\s*-->',
                  lambda m: expand((site / m[1]).read_text(encoding='utf8')), text)
    # Homepage branches: home=1, no redirect and no active section.
    text = re.sub(r'<!--# if expr="\$nav_section = [^"]+" -->.*?<!--# endif -->', '', text, flags=re.S)
    return re.sub(r'<!--#.*?-->', '', text, flags=re.S)

seen = set()
def asset(relative):
    relative = relative.split('?')[0]
    if relative in seen: return
    seen.add(relative)
    source, dest = site / relative, target / relative
    dest.parent.mkdir(parents=True, exist_ok=True)
    if source.suffix not in ('.css', '.js'):
        shutil.copyfile(source, dest)
        return
    text = source.read_text(encoding='utf8')
    if relative == 'assets/home.js':
        text = text[text.index('// This frame has the same dimensions'):]
    for url in re.findall(r'url\([\s\'"]*([^\)\'"\s]+)', text):
        if url.startswith(('data:', 'http', '#')): continue
        if url == '/assets/bg-loading.gif':
            text = text.replace(url, 'bg-loading.gif')
        elif url.startswith('/v3/'):
            asset(url[4:])
            import os
            text = text.replace(url, os.path.relpath(target / url[4:], dest.parent).replace('\\','/'))
        else:
            import posixpath
            asset(posixpath.normpath(str(Path(relative).parent).replace('\\','/')+'/'+url))
    if relative == 'assets/game-entry.js':
        text = text.replace("'/v3/assets/press-anywhere-label.png'", "'assets/press-anywhere-label.png'")
    dest.write_text(text, encoding='utf8')

text = expand((site / 'index.html').read_text(encoding='utf8'))
text = text.replace('class="home-page"', 'class="home-page local-home"')
text = re.sub(r'<script[^>]+src="/v3/assets/(?:home-status|download-selection)\.js[^>]*></script>', '', text)
for url in re.findall(r'(?:src|href)="(/v3/assets/[^"]+)"', text):
    asset(url[4:])
    text = text.replace(url, url[4:])
# Remove hidden meter artwork and dynamic counter content; mounting plates retain their layout.
text = re.sub(r'<div class="meter-case">.*?</svg></div>', '<div class="meter-case"></div>', text, flags=re.S)
text = re.sub(r'<template\b.*?</template>', '', text, flags=re.S)
text = text.replace('<div class="map-outage" hidden>', '<div class="map-outage" hidden style="display:none">')
(target / 'local.html').write_text(text, encoding='utf8')
print(f'Offline shell: {len(seen)} shared assets, {sum((target/p).stat().st_size for p in seen):,} bytes')
