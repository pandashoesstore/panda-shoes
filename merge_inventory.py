#!/usr/bin/env python3
import csv, json, re, os, sys
from collections import defaultdict

REPO_CSVS = ["store_1_inventory_panda.csv", "store_2_inventory_panda.csv"]
STOCK = os.path.expanduser("~/Downloads/inventory_filtered.csv")

if not os.path.exists(STOCK):
    sys.exit("ERROR: inventory_filtered.csv is not in Downloads. Re-download it from the chat on this computer first.")

meta = {}
for f in REPO_CSVS:
    if not os.path.exists(f):
        print(f"warning: {f} not found, skipping")
        continue
    with open(f, newline="", encoding="utf-8", errors="replace") as fh:
        for row in csv.DictReader(fh):
            style = (row.get("Style") or "").strip()
            if style and style not in meta:
                meta[style] = {
                    "gender_raw": (row.get("Gender") or "").upper(),
                    "type": (row.get("Type") or "").upper(),
                    "subtype": (row.get("SubType") or "").upper(),
                    "color": (row.get("Color") or "").title().strip(),
                }

def to_gender(raw, desc):
    t = raw + " " + desc.upper()
    if re.search(r"GIRL|BOY|KID|INFANT|TODDLER|YOUTH|JUNIOR", t): return "kids"
    if re.search(r"WOMEN|LADIES|LADY", t): return "womens"
    if re.search(r"\bMEN", t): return "mens"
    return "unisex"

TYPE_MAP = {
    "DRESSSHOE": "dress shoes", "DRESS": "dress shoes",
    "WORKBOOT": "work boots", "BOOT": "boots", "BOOTS": "boots",
    "SNEAKER": "sneakers", "SNEAKERS": "sneakers", "ATHLETIC": "sneakers",
    "SANDAL": "sandals", "SANDALS": "sandals",
    "SLIPPER": "slippers", "CASUAL": "casual", "LOAFER": "loafers",
}
def to_category(tp, sub, desc):
    for key, val in TYPE_MAP.items():
        if key in tp or key in sub: return val
    d = desc.upper()
    if "BOOT" in d: return "boots"
    if "SNEAK" in d or "RUNNER" in d: return "sneakers"
    if "SANDAL" in d: return "sandals"
    if "DRESS" in d: return "dress shoes"
    if "LOAFER" in d: return "loafers"
    if "SLIPPER" in d: return "slippers"
    return "shoes"

def clean_name(desc, style):
    s = desc if desc.strip() else style
    s = re.sub(r"[.]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip().title()
    return s.replace("'S", "'s")

stock = defaultdict(lambda: {"sizes": {}, "price": 0, "brand": "", "desc": ""})
with open(STOCK, newline="") as fh:
    for row in csv.DictReader(fh):
        st = stock[row["style"]]
        st["brand"] = row["brand"].title()
        st["desc"] = row["description"] or ""
        st["price"] = float(row["price"])
        sz = str(row["size"])
        st["sizes"][sz] = st["sizes"].get(sz, 0) + int(row["qty"])

matched = 0
out_rows = []
for style, st in stock.items():
    m = meta.get(style)
    if m: matched += 1
    gender = to_gender(m["gender_raw"] if m else "", st["desc"])
    category = to_category(m["type"] if m else "", m["subtype"] if m else "", st["desc"])
    color = m["color"] if m else ""
    sizes_sorted = sorted(st["sizes"].keys(), key=lambda x: float(x) if re.match(r"^\d+(\.\d+)?$", x) else 99)
    out_rows.append({
        "name": clean_name(st["desc"], style),
        "brand": st["brand"],
        "style": style,
        "price": st["price"],
        "sizes": json.dumps(sizes_sorted),
        "gender": gender,
        "category": category,
        "color": color,
        "is_active": "true",
        "is_new": "false",
    })

out_rows.sort(key=lambda r: (r["brand"], r["style"]))
with open("products_final.csv", "w", newline="") as fh:
    w = csv.DictWriter(fh, fieldnames=["name","brand","style","price","sizes","gender","category","color","is_active","is_new"])
    w.writeheader()
    w.writerows(out_rows)

g = defaultdict(int); c = defaultdict(int)
for r in out_rows: g[r["gender"]] += 1; c[r["category"]] += 1
print(f"products_final.csv written: {len(out_rows)} products")
print(f"metadata matched from repo CSVs: {matched}/{len(out_rows)}")
print("gender:", dict(g))
print("category:", dict(c))
