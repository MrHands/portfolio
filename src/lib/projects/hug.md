As a contractor on _Horizon Hunters Gathering_, I provided support on several user interface elements using the Decima Engine.

# Shop screen

I implemented an initial version of the shop screen that used an offset item grid to closely match the UI design.

# Resource keys

I implemented a feature that allowed specific content, like in-game characters, to be locked behind a feature flag. Once enabled, the content would be completely removed from cooked builds. This allowed designers or producers to decide when to enable certain content, without worrying about leaks from data miners.

# Quest tracker

I reimplemented the quest tracker from the previous game to use the new UI system. The new system uses visual scripting, which allowed artists and designers to make modifications without involving the programming team.

# Tooltip HUD

I implemented a HUD element that showed stats on highlighted creatures.

# Nine-slicing

![A nine-sliced image in the editor.][1]

Although a graphics programmer had already built the underlying rendering tech for displaying nine-sliced images on the UI, it wasn't yet enabled. I was tasked with creating a component that allowed the UI team to use this feature in their screens.

# Editor changes

I added debug drawing for components the Decima UI Editor to highlight gaps between elements in a layout. This enabled developers to see their layout changes without loading the game.

[1]: HUG_NineSlice.png '{ "orientation": "right" }'
