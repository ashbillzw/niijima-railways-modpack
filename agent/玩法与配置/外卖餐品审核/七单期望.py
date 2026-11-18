"""按审核餐表计算七张随机动物单的期望报酬。需 Python 3.10+ 和 NumPy。"""
import argparse
from collections import Counter
from fractions import Fraction
from functools import cache
import hashlib
import itertools
import json
import math
from pathlib import Path
import subprocess

import numpy as np


HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
PUBLIC = (HERE / "public").relative_to(ROOT)
CONFIG = ROOT / "server/shared/config/trainresync/meituan.json"
# 分组顺序为普通、好、整蛊三池，各池再分主餐与副餐。
REGULAR, PREFERRED, PRANK = 0, 2, 4
QUANTITIES = range(3, 8)


def read_groups(ref, base_multiplier):
    def read(name):
        path = PUBLIC / name
        if ref is None:
            return (ROOT / path).read_bytes()
        return subprocess.check_output(["git", "show", f"{ref}:{path.as_posix()}"], cwd=ROOT)

    raw = read("catalog.json")
    progress = json.loads(read("review-progress.json"), parse_float=Fraction)
    if progress["baseline"] not in {hashlib.sha256(data).hexdigest() for data in (raw, raw.replace(b"\r\n", b"\n"))}:
        raise ValueError("审核进度与 catalog.json 基线不匹配")
    foods = json.loads(raw, parse_float=Fraction)["foods"]
    defaults = {"preferred": False, "tasteMultiplier": 1}
    for edit in progress["changes"]:
        food = foods[edit["id"]]
        for field, change in edit["changes"].items():
            if food.get(field, defaults.get(field)) != change["before"]:
                raise ValueError(f"{edit['id']} 的 {field} 与审核前值不符")
            food[field] = change["after"]

    groups = [[] for _ in range(6)]
    for item, food in foods.items():
        if not food["enabled"]:
            continue
        if food["price"] is None or food["price"] <= 0:
            raise ValueError(f"已启用餐品 {item} 缺少有效单价")
        if food["category"] == "搞怪（整蛊）":
            group = PRANK
        else:
            group = PREFERRED if food.get("preferred") else REGULAR
        unit = food["price"] * food.get("tasteMultiplier", 1) * math.prod(food["bonuses"].values())
        groups[group + int(food["sideDish"])].append(unit * food["qty"] * base_multiplier)
    return groups


def draw_probabilities(sizes, preferred, prank, mains_only=False):
    remaining = sizes.copy()
    if mains_only:
        remaining[1::2] = [0, 0, 0]
        remaining[PRANK:] = [0, 0]
    available = [sum(remaining[i:i + 2]) for i in (REGULAR, PREFERRED, PRANK)]
    prank = prank if available[2] else 0
    if not available[0] or not available[1]:
        preferred = int(bool(available[1]))
    for i, chance in enumerate(((1 - prank) * (1 - preferred), (1 - prank) * preferred, prank)):
        if chance:
            for group in (2 * i, 2 * i + 1):
                if remaining[group]:
                    yield group, chance * remaining[group] / available[i]


def menu_weights(sizes, preferred, prank):
    if sizes[REGULAR] + sizes[PREFERRED] == 0:
        raise ValueError("至少需要一种可单独成单的非整蛊餐品")
    max_kinds = min(3, sum(sizes[:PRANK]))
    weights = Counter()

    def record(sequence, probability, had_prank):
        counts = tuple(sequence.count(i) for i in range(6))
        weights[counts, had_prank] += probability

    def draw(sequence, probability, kinds):
        remaining = [size - sequence.count(i) for i, size in enumerate(sizes)]
        if len(sequence) < kinds:
            for group, chance in draw_probabilities(remaining, preferred, prank):
                draw(sequence + (group,), probability * chance, kinds)
            return
        had_prank = any(group >= PRANK for group in sequence)
        if all(group % 2 for group in sequence):
            for group, chance in draw_probabilities(remaining, preferred, 0, mains_only=True):
                record(sequence[:-1] + (group,), probability * chance, had_prank)
        else:
            record(sequence, probability, had_prank)

    for kinds in range(1, max_kinds + 1):
        draw((), Fraction(1, max_kinds), kinds)
    return weights


def order_multipliers(config, event):
    far = config["farProbability"]
    hot = config["hotProbability"]
    levels = range(config["hotMinHundredths"], config["hotMaxHundredths"] + 1)
    heat = Counter({1: 1 - hot})
    for level in levels:
        heat[Fraction(level, 100)] += hot / len(levels)
    result = Counter()
    for distance, chance in ((1, 1 - far), (config["farMultiplier"], far)):
        for factor, prob in heat.items():
            if prob and chance:
                result[Fraction(distance * factor * (2 if event else 1))] += chance * prob
    return result


def group_spectrum(prices, scale, modulus):
    # 第 k 行按金额余数累计从本组选 k 种不同餐品的方式数（每种另选 3–7 件）。
    ways = np.zeros((min(3, len(prices)) + 1, modulus))
    ways[0, 0] = 1
    for used, price in enumerate(prices, 1):
        unit = int(price * scale)
        for count in range(min(used, 3), 0, -1):
            for quantity in QUANTITIES:
                ways[count] += np.roll(ways[count - 1], quantity * unit)
    ways /= ways.sum(axis=1, keepdims=True)
    return np.fft.rfft(ways, axis=1)


def expected_quote(groups, delivery_rate, multipliers):
    # E[floor(金额)] = E[金额] - E[小数部分]。只卷积余数即可，无须展开数百万种菜单。
    scale = math.lcm(delivery_rate.denominator, *(x.denominator for group in groups for x in group))
    modulus = scale * math.lcm(*(m.denominator for m in multipliers))
    if modulus > 1_000_000:
        raise ValueError("当前单价或倍率的小数精度超出余数枚举的内存范围")
    residues = np.arange(modulus, dtype=np.int64)
    loss = np.zeros(modulus)
    for multiplier, chance in multipliers.items():
        step = int(multiplier * modulus / scale) % modulus
        loss += (residues * step % modulus) * (float(chance) / modulus)
    spectra = [group_spectrum(group, scale, modulus) for group in groups]
    mean_lines = [5 * sum(group) / len(group) if group else 0 for group in groups]
    mean_multiplier = sum(m * p for m, p in multipliers.items())

    @cache
    def quote(counts):
        delivery = delivery_rate * (sum(counts) + 1)
        mean = delivery + sum(count * price for count, price in zip(counts, mean_lines))
        spectrum = math.prod(group[count] for group, count in zip(spectra, counts))
        probabilities = np.fft.irfft(spectrum, n=modulus)
        probabilities = np.roll(probabilities, int(delivery * scale))
        return float(mean * mean_multiplier) - probabilities @ loss

    return quote


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--review-ref", help="从指定 Git 提交读取目录和审核进度，默认使用工作区")
    parser.add_argument("--base-multiplier", type=Fraction, help="试算隐藏基础倍率，默认读取两服共享配置")
    parser.add_argument("--event", action=argparse.BooleanOptionalAction, help="试算活动开关，默认读取两服共享配置")
    args = parser.parse_args()
    config = json.loads(CONFIG.read_bytes(), parse_int=Fraction, parse_float=Fraction)
    for field in ("hotMinHundredths", "hotMaxHundredths"):
        config[field] = int(config[field])
    base = config["basePriceMultiplier"] if args.base_multiplier is None else args.base_multiplier
    if base <= 0:
        parser.error("基础倍率须为正数")
    event = config["eventActive"] if args.event is None else args.event
    groups = read_groups(args.review_ref, base)
    sizes = list(map(len, groups))
    quote = expected_quote(groups, config["deliveryBaseRate"], order_multipliers(config, event))
    normal = menu_weights(sizes, config["preferredPoolChance"], config["prankItemChance"])
    disabled = menu_weights(sizes, config["preferredPoolChance"], 0)
    clean = {key: p for key, p in normal.items() if not key[1]}
    print(f"餐表 {args.review_ref or '工作区'}，常规 {sum(sizes[:PRANK])} 种，整蛊 {sum(sizes[PRANK:])} 种")
    print(f"基础 ×{float(base):g}，活动 ×{2 if event else 1}，远单占 {float(config['farProbability']):.1%}")
    for label, weights in (("含整蛊", normal), ("关闭整蛊", disabled), ("恰好均未抽中整蛊", clean)):
        mass = sum(weights.values())
        if mass:
            mean = math.fsum(float(prob / mass) * quote(counts) for (counts, _), prob in weights.items())
            print(f"{label}：七单共 {7 * mean:,.2f} 元")
        else:
            print(f"{label}：发生概率为零，条件期望无定义")


if __name__ == "__main__":
    main()
