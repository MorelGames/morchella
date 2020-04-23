#!/usr/bin/python3

"""
Converts a JSON file from JSON Against Humanity to a bunch of JSON files used
by Morels Against Humanity.
"""
import sys, json

from pathlib import Path
from slugify import slugify

data = json.load(sys.stdin)

try:
    to = sys.argv[1]
except:
    to = "cah-data"

to = Path(to)

from pathlib import Path
to.mkdir(parents=True, exist_ok=True)

black_cards = data['blackCards']
white_cards = data['whiteCards']

official = [
    'Base',
    'CAHe1',
    'CAHe2',
    'CAHe3',
    'CAHe4',
    'CAHe5',
    'CAHe6',
    'greenbox',
    '90s',
    'Box',
    'fantasy',
    'food',
    'science',
    'www',
    'hillary',
    'trumpvote',
    'trumpbag',
    'xmas2012',
    'xmas2013',
    'PAXE2013',
    'PAXP2013',
    'PAXE2014',
    'PAXEP2014',
    'PAXPP2014',
    'PAX2015',
    'HOCAH',
    'reject',
    'reject2',
    'Canadian',
    'misprint',
]

colors = {
    'CAHe1': '#d90000',
    'CAHe2': '#d90000',
    'CAHe3': '#d90000',
    'CAHe4': 'blue',
    'CAHe5': 'blue',
    'CAHe6': 'blue',
    'greenbox': 'green'
}

icons = {
    'cutlery': 'utensils',
    'moon-o': 'moon',
    'lemon-o': 'lemon',
    'arrow-circle-o-right': 'arrow-alt-circle-right',
    'thumbs-o-up': 'thumbs-up',
    'sun-o': 'sun',
    'meh-o': 'meh',
    'file-text-o': 'file-alt',
    'frown-o': 'frown',
    'shield': 'shield-alt',
    'picture-o': 'image',
    'ils': 'kiss-wink-heart',
    'youtube-play': 'youtube',
    'video-camera': 'video',
    'close': 'times'
}

icons_pack = {
    'paypal': 'fab',
    'apple': 'fab',
    'reddit': 'fab',
    'youtube': 'fab',
    'black-tie': 'fab',
}

order = {v: k for k, v in enumerate(data['order'])}

decks = {}

def convert_icon(icon):
    return icons[icon] if icon in icons else icon

for deck_id, deck in data.items():
    if deck_id in ['blackCards', 'whiteCards', 'order']: continue

    name = deck['name'].replace('[C] ', '').replace('[$] ', '')
    slug = slugify(name)
    icon = convert_icon(deck['icon']) if 'icon' in deck and not isinstance(deck['icon'], int) else None

    deck_json = {
        'id': slug,
        'name': name,
        'official': deck_id in official,
        'locale': 'en',
        'icon': icon,
        'icon_pack': icons_pack[icon] if icon in icons_pack else None,
        'number': deck['icon'] if 'icon' in deck and isinstance(deck['icon'], int) else None,
        'color': colors[deck_id] if deck_id in colors else None,
        'counts': {
            'black': len(deck['black']),
            'white': len(deck['white'])
        },
        'cards': {
            'black': [black_cards[i] for i in deck['black']],
            'white': [white_cards[i] for i in deck['white']],
        }
    }

    with open(to / f'{order[deck_id]:03d}-{slug}.json', 'w') as f:
        json.dump(deck_json, f, indent=4)

    deck_json.pop('cards', None)
    decks[slug] = deck_json

with open(to / 'decks.json', 'w') as f:
    json.dump(decks, f, indent=4)

import_name = lambda icon: 'fa' + ''.join(x.capitalize() or '_' for x in icon.split('-'))
fas_icons = [import_name(deck['icon']) for deck in decks.values() if deck['icon'] and not deck['icon_pack']]
fab_icons = [import_name(deck['icon']) for deck in decks.values() if deck['icon'] and deck['icon_pack'] == 'fab']

print('import {')
for icon in fas_icons:
    print(f'  {icon},')
print("} from '@fortawesome/free-solid-svg-icons'")

print('\nimport {')
for icon in fab_icons:
    print(f'  {icon},')
print("} from '@fortawesome/free-brands-svg-icons'")

print('\nlibrary.add(')
for icon in fas_icons + fab_icons:
    print(f'  {icon},')
print(')')
