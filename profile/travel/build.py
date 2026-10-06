"""Generate data.js for profile/travel from the flight record.

Source of truth: 040_personal/0451_travel/flight_record/flights.csv (local only).
Only month / city / country / coordinates are published — no flight numbers or seats.

    python3 profile/travel/build.py
"""
import csv, json, re
from collections import defaultdict
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE.parents[1] / "040_personal/0451_travel/flight_record"
HOME = "Tokyo"

# Places reached without a flight (rail / car / ship). (month, city, country, lat, lon)
EXTRAS = [
    ("2014-08", "Lucerne", "Switzerland", 47.0502, 8.3093),
    ("2014-08", "Bern", "Switzerland", 46.9480, 7.4474),
    ("2018-12", "Lucerne", "Switzerland", 47.0502, 8.3093),
    ("2019-01", "Lausanne", "Switzerland", 46.5197, 6.6323),
    ("2020-03", "Konstanz", "Germany", 47.6603, 9.1758),
    ("2021-05", "Ogasawara", "Japan", 27.0944, 142.1919),
    ("2021-09", "Fort Worth", "United States", 32.7555, -97.3308),
    ("2021-10", "Giza", "Egypt", 29.9870, 31.2118),
    ("2021-10", "New Cairo City", "Egypt", 30.0300, 31.4700),
    ("2022-08", "Carthage", "Tunisia", 36.8529, 10.3233),
    ("2022-09", "Bosnia and Herzegovina", "Bosnia and Herzegovina", 43.8563, 18.4131),
    ("2023-10", "Pokhara", "Nepal", 28.2096, 83.9856),
    ("2025-04", "Agra", "India", 27.1767, 78.0081),
]

# Airports missing from flight_record.html's AIRPORTS table.
CITY_COORDS = {
    "Salt Lake City": (40.7608, -111.8910), "Amami": (28.4306, 129.7125),
    "Austin": (30.2672, -97.7431), "Phoenix": (33.4484, -112.0740),
    "Tucson": (32.2226, -110.9747), "Omaha": (41.2565, -95.9345),
    "Kansas City": (39.0997, -94.5786), "Des Moines": (41.5868, -93.6250),
    "Detroit": (42.3314, -83.0458), "Philadelphia": (39.9526, -75.1652),
    "Orlando": (28.5384, -81.3789), "Tampa": (27.9506, -82.4572),
    "Da Nang": (16.0544, 108.2022), "Dublin": (53.3498, -6.2603),
    "Tallinn": (59.4370, 24.7536), "Riga": (56.9496, 24.1052),
    "Vilnius": (54.6872, 25.2797), "Montevideo": (-34.9011, -56.1645),
    "Mallorca": (39.5696, 2.6502),
}

BUCKET_LIST = [
    ("Vientiane", 17.9757, 102.6331), ("Seattle", 47.6062, -122.3321),
    ("Utrecht", 52.0907, 5.1214), ("Mérida", 20.9674, -89.5926),
    ("Cancún", 21.1619, -86.8515), ("La Paz", -16.4897, -68.1193),
    ("Perth", -31.9523, 115.8613), ("Samarkand", 39.6270, 66.9750),
]

# country -> (flag, region)
COUNTRIES = {
    "Japan": ("🇯🇵", "Asia"), "China": ("🇨🇳", "Asia"), "South Korea": ("🇰🇷", "Asia"),
    "Taiwan": ("🇹🇼", "Asia"), "Hong Kong": ("🇭🇰", "Asia"), "Macau": ("🇲🇴", "Asia"),
    "Thailand": ("🇹🇭", "Asia"), "Cambodia": ("🇰🇭", "Asia"), "Vietnam": ("🇻🇳", "Asia"),
    "Indonesia": ("🇮🇩", "Asia"), "Singapore": ("🇸🇬", "Asia"), "Malaysia": ("🇲🇾", "Asia"),
    "Philippines": ("🇵🇭", "Asia"), "India": ("🇮🇳", "Asia"), "Nepal": ("🇳🇵", "Asia"),
    "Sri Lanka": ("🇱🇰", "Asia"),
    "United Arab Emirates": ("🇦🇪", "Middle East"), "Qatar": ("🇶🇦", "Middle East"),
    "Turkey": ("🇹🇷", "Middle East"),
    "Switzerland": ("🇨🇭", "Europe"), "Germany": ("🇩🇪", "Europe"), "United Kingdom": ("🇬🇧", "Europe"),
    "Spain": ("🇪🇸", "Europe"), "Portugal": ("🇵🇹", "Europe"), "France": ("🇫🇷", "Europe"),
    "Italy": ("🇮🇹", "Europe"), "Belgium": ("🇧🇪", "Europe"), "Netherlands": ("🇳🇱", "Europe"),
    "Luxembourg": ("🇱🇺", "Europe"), "Poland": ("🇵🇱", "Europe"), "Greece": ("🇬🇷", "Europe"),
    "Ireland": ("🇮🇪", "Europe"), "Norway": ("🇳🇴", "Europe"), "Sweden": ("🇸🇪", "Europe"),
    "Finland": ("🇫🇮", "Europe"), "Denmark": ("🇩🇰", "Europe"), "Estonia": ("🇪🇪", "Europe"),
    "Latvia": ("🇱🇻", "Europe"), "Lithuania": ("🇱🇹", "Europe"), "Austria": ("🇦🇹", "Europe"),
    "Hungary": ("🇭🇺", "Europe"), "Czech Republic": ("🇨🇿", "Europe"), "Serbia": ("🇷🇸", "Europe"),
    "Montenegro": ("🇲🇪", "Europe"), "Bosnia and Herzegovina": ("🇧🇦", "Europe"), "Malta": ("🇲🇹", "Europe"),
    "Egypt": ("🇪🇬", "Africa"), "Tunisia": ("🇹🇳", "Africa"), "Ethiopia": ("🇪🇹", "Africa"),
    "South Africa": ("🇿🇦", "Africa"), "Tanzania": ("🇹🇿", "Africa"), "Rwanda": ("🇷🇼", "Africa"),
    "Kenya": ("🇰🇪", "Africa"), "Nigeria": ("🇳🇬", "Africa"), "Ghana": ("🇬🇭", "Africa"),
    "Côte d'Ivoire": ("🇨🇮", "Africa"), "Senegal": ("🇸🇳", "Africa"),
    "United States": ("🇺🇸", "North & Central America"), "Canada": ("🇨🇦", "North & Central America"),
    "Mexico": ("🇲🇽", "North & Central America"), "Guatemala": ("🇬🇹", "North & Central America"),
    "Costa Rica": ("🇨🇷", "North & Central America"),
    "Brazil": ("🇧🇷", "South America"), "Argentina": ("🇦🇷", "South America"),
    "Chile": ("🇨🇱", "South America"), "Uruguay": ("🇺🇾", "South America"),
    "Australia": ("🇦🇺", "Oceania"), "New Zealand": ("🇳🇿", "Oceania"),
}
REGIONS = ["Asia", "Middle East", "Europe", "Africa",
           "North & Central America", "South America", "Oceania"]


def airports():
    html = (SRC / "flight_record.html").read_text()
    return {k: (float(a), float(b)) for k, a, b in
            re.findall(r"([A-Z]{3}):\[(-?[\d.]+),\s*(-?[\d.]+)\]", html)}


def main():
    ap = airports()
    trips = defaultdict(dict)    # month -> {city: country}
    coords, first = {}, {}
    rows = list(csv.DictReader(open(SRC / "flights.csv", encoding="utf-8")))
    for r in rows:
        m = r["date"][:7]
        for side in ("dep", "arr"):
            city, country = r[f"{side}_city"], r[f"{side}_country"]
            if city == HOME:
                continue
            trips[m][city] = country
            if not coords.get(city):
                coords[city] = ap.get(r[f"{side}_iata"]) or CITY_COORDS.get(city)
    for m, city, country, lat, lon in EXTRAS:
        trips[m][city] = country
        coords.setdefault(city, (lat, lon))

    unknown = {c for t in trips.values() for c in t.values()} - COUNTRIES.keys()
    if unknown:
        raise SystemExit(f"add to COUNTRIES: {sorted(unknown)}")
    missing = [c for c, v in coords.items() if v is None]
    if missing:
        raise SystemExit(f"no coordinates for: {missing}")

    for m in sorted(trips):
        for country in trips[m].values():
            first.setdefault(country, m)

    data = {
        "updated": date.today().isoformat(),
        "flights": len(rows),
        "regions": REGIONS,
        "countries": {c: {"flag": f, "region": rg, "first": first[c]}
                      for c, (f, rg) in COUNTRIES.items() if c in first},
        "trips": [{"month": m, "places": [[c, k] for c, k in trips[m].items()]}
                  for m in sorted(trips, reverse=True)],
        "cities": {c: [round(v[0], 4), round(v[1], 4)] for c, v in coords.items()},
        "bucket": [[n, la, lo] for n, la, lo in BUCKET_LIST],
    }
    out = HERE / "data.js"
    out.write_text("// generated by build.py — do not edit\nconst DATA = "
                   + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
    print(f"{out.name}: {len(data['countries'])} countries, {len(coords)} cities, "
          f"{len(trips)} trips, {len(rows)} flights")


if __name__ == "__main__":
    main()
