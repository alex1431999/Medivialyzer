# V1.2.0
- Added Falcon NPCs
- Add NPC Omar
- Add reset button to supplies modal
- Add ability to edit existing items
- Add number formatting (thousand separator)
- Supplies are saved after client is closed
- Show number of monsters killed in a hunt
- Add a loot luck indicator

# V1.1.1
- Added ability to define your own loot file path
- Added missing supply types

# V1.1.0
## Features
- Added profit indicator
- Add ability to add custom items
  - Medivialyzer now shows all items looted even if they are not recognized. This makes sure you can rely on Medivialyzer to show the complete list of items looted.
- Add ability to share custom items with Medivialyzer
  - This is 100% optional for every user, consent is collected first and only then will data be shared
  - This feature exists to reliably ensure data completeness
  - The consent is only given for sharing the item information, no other information is transmitted
  - The data is stored in a [baserow](baserow.io) table
  - Every submitted item is manually checked for correctness before it's added to the client
  - The items will always be added to the official client with the next release
- Show where you can sell the items looted
- Various items added

## UX
- Added tooltips to UI elements
- Color schemes and fonts have been improved

## Misc
- Performance improvements

# v1.0.0
This in the first public release!

It includes the base functionality of Medivialyzer.