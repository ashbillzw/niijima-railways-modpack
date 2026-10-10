#!/usr/bin/env python3
"""从 GitHub 更新服务器副本；用法见 agent/服务端更新器.md。"""

import argparse
from http.client import HTTPException
import json
from pathlib import Path
import shutil
import tempfile
import time
from urllib.error import URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent
REPOSITORY = "ashbillzw/niijima-railways-modpack"
DEFAULT_REF = "master"
SERVERS = ("create-cn", "train-cn")


def checked(root, relative):
    if not isinstance(relative, str) or not relative:
        raise ValueError(f"无效路径：{relative!r}")
    parts = relative.split("/")
    if "\\" in relative or ":" in relative or any(p in ("", ".", "..") for p in parts):
        raise ValueError(f"只允许普通相对路径：{relative!r}")
    path = root
    for part in [None] + parts:
        if part is not None:
            path = path / part
        if path.is_symlink() or (path.exists() and
                getattr(path.lstat(), "st_file_attributes", 0) & 0x400):
            raise ValueError(f"不支持符号链接或 junction：{path}")
    if not path.resolve().is_relative_to(root.resolve()):
        raise ValueError(f"路径越界：{path}")
    return path


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def request(url, read):
    while True:
        try:
            with urlopen(Request(url, headers={"User-Agent": "niijima-server-updater"}), timeout=30) as response:
                return read(response)
        except (URLError, TimeoutError, ConnectionError, HTTPException) as exc:
            print(f"网络请求失败：{url}：{exc}；30 秒后重试，Ctrl+C 可终止。", flush=True)
            time.sleep(30)


def download(url, destination):
    if not url.lower().startswith(("http://", "https://")):
        raise ValueError(f"下载地址必须使用 HTTP 或 HTTPS：{url}")
    print(f"GET {url}", flush=True)
    destination.parent.mkdir(parents=True, exist_ok=True)
    def save(response):
        with destination.open("wb") as output:
            shutil.copyfileobj(response, output)
    request(url, save)


class GitHub:
    def __init__(self, ref, cache):
        self.cache = cache
        self.ref = ref
        self.fetched = set()
        self.external_files = {}
        self.branches = {}
        api = f"https://api.github.com/repos/{REPOSITORY}"
        commit = request(f"{api}/commits/{quote(ref, safe='')}", json.load)
        self.sha = commit["sha"]
        tree = request(f"{api}/git/trees/{commit['commit']['tree']['sha']}?recursive=1", json.load)
        if tree.get("truncated"):
            raise ValueError("GitHub 文件树不完整，停止更新")
        self.entries = {entry["path"]: entry for entry in tree["tree"]}
        print(f"GitHub commit: {self.sha}", flush=True)

    def fetch(self, relative):
        destination = checked(self.cache, relative)
        if relative in self.fetched:
            return destination
        entry = self.entries.get(relative)
        if entry is None:
            raise ValueError(f"GitHub 缺少路径：{relative}")
        if entry["type"] == "tree":
            destination.mkdir(parents=True, exist_ok=True)
            for name, child in self.entries.items():
                if name.startswith(relative + "/") and child["type"] != "tree":
                    self.fetch(name)
        elif entry["type"] == "blob" and entry["mode"] in ("100644", "100755"):
            url = f"https://raw.githubusercontent.com/{REPOSITORY}/{self.sha}/{quote(relative, safe='/')}"
            download(url, destination)
            if destination.stat().st_size != entry["size"]:
                raise ValueError(f"GitHub 文件大小不符：{relative}")
        else:
            raise ValueError(f"不支持 Git 链接或子模块：{relative}")
        self.fetched.add(relative)
        return destination

    def external(self, url):
        if url not in self.external_files:
            destination = self.cache.parent / "external" / str(len(self.external_files))
            download(url, destination)
            self.external_files[url] = destination
        return self.external_files[url]

    def from_branch(self, branch, relative):
        if not branch:
            raise ValueError(".ablink 必须填写 URL 或分支名，例如 __master__")
        if self.ref == branch:
            return self.fetch("pack/overrides/" + relative)
        if branch not in self.branches:
            cache = self.cache.parent / f"branch-{len(self.branches)}"
            self.branches[branch] = GitHub(branch, cache)
        return self.branches[branch].fetch("pack/overrides/" + relative)


def copy_node(source, destination):
    if source.is_dir():
        destination.mkdir(parents=True, exist_ok=True)
        for child in sorted(source.iterdir()):
            checked(source, child.name)
            if child.name.endswith(".ablink"):
                raise ValueError(f"引用源中不能再有 .ablink：{child}")
            copy_node(child, destination / child.name)
    elif source.is_file():
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)
    else:
        raise ValueError(f"源文件不存在：{source}")


def expand(layer, stage, github, relative=""):
    children = sorted(layer.iterdir())
    # 先展开引用，再覆盖同名本地内容。
    for child in children:
        checked(layer, child.name)
        if child.name.endswith(".ablink"):
            if not child.is_file():
                raise ValueError(f".ablink 必须是文件：{child}")
            name = child.name[:-7]
            rel = f"{relative}/{name}" if relative else name
            destination = checked(stage, rel)
            content = child.read_text(encoding="utf-8-sig").strip()
            if content.lower().startswith(("http://", "https://")):
                source = github.external(content)
            else:
                branch = content[2:-2] if content.startswith("__") and content.endswith("__") else content
                source = github.from_branch(branch, rel)
            copy_node(source, destination)
    for child in children:
        if child.name.endswith(".ablink"):
            continue
        rel = f"{relative}/{child.name}" if relative else child.name
        destination = checked(stage, rel)
        if child.is_dir():
            destination.mkdir(parents=True, exist_ok=True)
            expand(child, stage, github, rel)
        else:
            copy_node(child, destination)


def prepare(github, rules, server, stage):
    target = checked(ROOT, server)
    deletions = [checked(target, p) for p in rules["shared"] + rules[server]]
    for layer in ("shared", server):
        folder = github.fetch("server/" + layer)
        expand(folder, stage, github)
    items = sorted(stage.rglob("*"))
    for item in items:
        dest = checked(target, item.relative_to(stage).as_posix())
        removed = any(dest == p or p in dest.parents for p in deletions)
        if not removed and dest.exists() and dest.is_dir() != item.is_dir():
            raise ValueError(f"文件/目录类型冲突，请加入删除表：{dest}")
    return target, deletions, items


def apply(target, deletions, items, stage):
    for path in deletions:
        print(f"DELETE {target.name}/{path.relative_to(target).as_posix()}")
    for item in items:
        if item.is_file():
            print(f"WRITE  {target.name}/{item.relative_to(stage).as_posix()}")
    for path in deletions:
        if not path.exists():
            print(f"NOTE 路径不存在，跳过删除：{path}")
            continue
        answer = ""
        while answer not in ("y", "n"):
            answer = input(f"删除 {path}？[y/n] ").strip().lower()
        if answer == "n":
            raise SystemExit(f"已取消更新：{path}")
        if path.is_dir():
            shutil.rmtree(path)
        elif path.exists():
            path.unlink()
    for item in items:
        dest = checked(target, item.relative_to(stage).as_posix())
        if item.is_dir():
            dest.mkdir(parents=True, exist_ok=True)
        else:
            shutil.copyfile(item, dest)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--server", choices=(*SERVERS, "all"), default="all", help="目标服务器，默认 all")
    parser.add_argument("--branch", default=DEFAULT_REF, help="服务端分包来源分支，默认 master")
    args = parser.parse_args()
    selected = SERVERS if args.server == "all" else (args.server,)
    try:
        for server in selected:
            if not checked(ROOT, server).is_dir():
                raise ValueError(f"请先将服务器副本放入：{ROOT / server}")
        with tempfile.TemporaryDirectory(prefix="download-", dir=ROOT) as temp:
            workspace = Path(temp)
            print(f"临时下载与展开目录：{workspace}", flush=True)
            github = GitHub(args.branch, workspace / "source")
            rules = read_json(github.fetch("server/delete.json"))
            if not isinstance(rules, dict) or set(rules) != {"shared", *SERVERS}:
                raise ValueError("delete.json 必须包含 shared、create-cn、train-cn 三个数组")
            for entries in rules.values():
                if not isinstance(entries, list):
                    raise ValueError("删除表的每一项必须是路径数组")
                for entry in entries:
                    checked(ROOT / selected[0], entry)
            plans = []
            for server in selected:
                stage = workspace / server
                stage.mkdir()
                plans.append((*prepare(github, rules, server, stage), stage))
            # 所选服务器全部准备完成后，才开始删除和写入。
            for plan in plans:
                apply(*plan)
        print("更新完成。")
    except (OSError, ValueError, KeyError, TypeError, EOFError) as exc:
        parser.exit(1, f"错误：{exc}\n")


if __name__ == "__main__":
    main()
