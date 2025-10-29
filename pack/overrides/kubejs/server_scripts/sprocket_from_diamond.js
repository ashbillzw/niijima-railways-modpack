ServerEvents.recipes(event => {
  event.shapeless('numismatics:sprocket', ['minecraft:diamond'])
       .id('kubejs:sprocket_from_diamond');

  event.shapeless('minecraft:diamond', [
      'numismatics:sprocket',
      'numismatics:spur'
  ]).id('kubejs:diamond_from_sprocket_spur');
});
