import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'images')
os.makedirs(OUT, exist_ok=True)

# category -> background treatment (kept within black/gold/white brand palette)
CATEGORY_BG = {
    "mens": "#0c0c0e",
    "ladies": "#121013",
    "unisex": "#0e0e10",
    "jewellery": "#100e0a",
}

ITEMS = [
    ("gw-m001", "Classic Gold\nMen's Watch", "mens", "round"),
    ("gw-m002", "Executive Black\nMen's Watch", "mens", "round"),
    ("gw-m003", "Silver Chronograph\nWatch", "mens", "chrono"),
    ("gw-l001", "Elegant Gold\nLadies' Watch", "ladies", "round-small"),
    ("gw-l002", "Classic Rose Gold\nLadies' Watch", "ladies", "round-small"),
    ("gw-l003", "Silver Crystal\nLadies' Watch", "ladies", "round-small"),
    ("gw-u001", "Minimalist\nBlack Watch", "unisex", "round"),
    ("gw-u002", "Classic Silver\nUnisex Watch", "unisex", "round"),
    ("gw-u003", "Modern Gold\nUnisex Watch", "unisex", "round"),
    ("gw-j001", "Gold Bracelet", "jewellery", "bracelet"),
    ("gw-j002", "Elegant Necklace", "jewellery", "necklace"),
    ("gw-j003", "Classic Ring", "jewellery", "ring"),
    ("gw-j004", "Jewellery Set", "jewellery", "set"),
]

GOLD = "#c8a35a"
GOLD_BRIGHT = "#e4c682"
GOLD_DIM = "#8a6f3d"

def watch_svg(bg):
    return f'''
    <circle cx="300" cy="300" r="150" fill="none" stroke="{GOLD}" stroke-width="6"/>
    <circle cx="300" cy="300" r="150" fill="#1a1a1e" opacity="0.4"/>
    <circle cx="300" cy="300" r="128" fill="none" stroke="{GOLD_DIM}" stroke-width="1.5"/>
    <line x1="300" y1="300" x2="300" y2="205" stroke="{GOLD_BRIGHT}" stroke-width="4" stroke-linecap="round"/>
    <line x1="300" y1="300" x2="360" y2="300" stroke="{GOLD_BRIGHT}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="300" cy="300" r="6" fill="{GOLD_BRIGHT}"/>
    <rect x="270" y="130" width="60" height="45" rx="6" fill="none" stroke="{GOLD}" stroke-width="4"/>
    <rect x="270" y="425" width="60" height="45" rx="6" fill="none" stroke="{GOLD}" stroke-width="4"/>
    <rect x="130" y="285" width="55" height="30" rx="4" fill="none" stroke="{GOLD}" stroke-width="3"/>
    <rect x="415" y="285" width="55" height="30" rx="4" fill="none" stroke="{GOLD}" stroke-width="3"/>
    '''

def bracelet_svg():
    links = ""
    for i in range(9):
        x = 140 + i * 40
        links += f'<circle cx="{x}" cy="300" r="24" fill="none" stroke="{GOLD}" stroke-width="4"/>'
    return links

def necklace_svg():
    return f'''
    <path d="M170,220 Q300,420 430,220" fill="none" stroke="{GOLD}" stroke-width="4"/>
    <circle cx="300" cy="360" r="20" fill="none" stroke="{GOLD_BRIGHT}" stroke-width="4"/>
    <circle cx="300" cy="378" r="8" fill="{GOLD_BRIGHT}"/>
    '''

def ring_svg():
    return f'''
    <ellipse cx="300" cy="330" rx="90" ry="70" fill="none" stroke="{GOLD}" stroke-width="10"/>
    <circle cx="300" cy="235" r="26" fill="none" stroke="{GOLD_BRIGHT}" stroke-width="5"/>
    <circle cx="300" cy="235" r="10" fill="{GOLD_BRIGHT}"/>
    '''

def set_svg():
    return necklace_svg() + f'<circle cx="180" cy="470" r="16" fill="none" stroke="{GOLD}" stroke-width="4"/><circle cx="420" cy="470" r="16" fill="none" stroke="{GOLD}" stroke-width="4"/>'

def render(name_id, label, category, shape):
    bg = CATEGORY_BG[category]
    if shape.startswith("round") or shape == "chrono":
        art = watch_svg(bg)
    elif shape == "bracelet":
        art = bracelet_svg()
    elif shape == "necklace":
        art = necklace_svg()
    elif shape == "ring":
        art = ring_svg()
    elif shape == "set":
        art = set_svg()
    else:
        art = watch_svg(bg)

    lines = label.split("\n")
    text_svg = ""
    start_y = 560 - (len(lines) - 1) * 12
    for i, line in enumerate(lines):
        text_svg += f'<text x="300" y="{start_y + i * 24}" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-size="19" letter-spacing="1" fill="{GOLD}">{line}</text>'

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <radialGradient id="bgGrad-{name_id}" cx="50%" cy="42%" r="70%">
      <stop offset="0%" stop-color="#1c1a16"/>
      <stop offset="100%" stop-color="{bg}"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad-{name_id})"/>
  <rect x="18" y="18" width="564" height="564" fill="none" stroke="{GOLD_DIM}" stroke-width="1"/>
  <g>{art}</g>
  {text_svg}
  <text x="300" y="60" text-anchor="middle" font-family="Georgia, serif" font-size="13" letter-spacing="6" fill="{GOLD_DIM}">GABA WRIST</text>
</svg>'''
    path = os.path.join(OUT, f"{name_id}.svg")
    with open(path, "w") as f:
        f.write(svg)
    print("wrote", path)

for item in ITEMS:
    render(*item)

print("done", len(ITEMS), "images")

# ---- Hero slideshow images (wider aspect, one per category) ----
HERO_ITEMS = [
    ("hero-mens", "Men's Watches", "mens", "round"),
    ("hero-ladies", "Ladies' Watches", "ladies", "round-small"),
    ("hero-unisex", "Unisex Watches", "unisex", "round"),
    ("hero-jewellery", "Fine Jewellery", "jewellery", "set"),
]

def render_hero(name_id, label, category, shape):
    bg = CATEGORY_BG[category]
    if shape.startswith("round"):
        art = watch_svg(bg)
    elif shape == "set":
        art = set_svg()
    else:
        art = watch_svg(bg)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="bgGrad-{name_id}" cx="50%" cy="38%" r="75%">
      <stop offset="0%" stop-color="#1c1a16"/>
      <stop offset="100%" stop-color="{bg}"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bgGrad-{name_id})"/>
  <g transform="translate(500,150) scale(1.4)">{art}</g>
  <text x="800" y="770" text-anchor="middle" font-family="Georgia, serif" font-size="34" letter-spacing="10" fill="{GOLD}">{label.upper()}</text>
  <rect x="60" y="60" width="1480" height="780" fill="none" stroke="{GOLD_DIM}" stroke-width="1"/>
</svg>'''
    path = os.path.join(OUT, f"{name_id}.svg")
    with open(path, "w") as f:
        f.write(svg)
    print("wrote", path)

for item in HERO_ITEMS:
    render_hero(*item)
