ServerEvents.recipes(event => {
    event.recipes.create.compacting(
        'minecraft:cobbled_deepslate', [
            Item.of('minecraft:flint', 2),
            Item.of('minecraft:diorite', 1),
            Fluid.of('minecraft:lava', 100)
        ]).id('kubejs:cobbled_deepslate_from_diorite');
})
