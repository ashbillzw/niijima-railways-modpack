// kubejs/server_scripts/recipes_numismatics.js

ServerEvents.recipes(event => {
  // 1 diamond -> 1 sprocket
  event.shapeless('numismatics:sprocket', ['minecraft:diamond'])
       .id('kubejs:sprocket_from_diamond');

  // 1 sprocket + 1 spur -> 1 diamond
  event.shapeless('minecraft:diamond', [
      'numismatics:sprocket',
      'numismatics:spur'
  ]).id('kubejs:diamond_from_sprocket_spur');
});
