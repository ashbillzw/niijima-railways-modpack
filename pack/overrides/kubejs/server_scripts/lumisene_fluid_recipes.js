ServerEvents.recipes(event => {
    event.recipes.create.emptying(
        [
            Fluid.of('supplementaries:lumisene', FluidAmounts.BUCKET),
            'minecraft:bucket'
        ],
        'supplementaries:lumisene_bucket'
    ).id('kubejs:lumisene_bucket_emptying');

    event.recipes.create.emptying(
        [
            Fluid.of('supplementaries:lumisene', FluidAmounts.BOTTLE),
            'minecraft:glass_bottle'
        ],
        'supplementaries:lumisene_bottle'
    ).id('kubejs:lumisene_bottle_emptying');

    event.recipes.create.filling(
        'supplementaries:lumisene_bottle',
        [
            Fluid.of('supplementaries:lumisene', FluidAmounts.BOTTLE),
            'minecraft:glass_bottle'
        ]
    ).id('kubejs:lumisene_bottle_filling');

    event.recipes.create.mixing(
        [
            Fluid.of('supplementaries:lumisene', FluidAmounts.BUCKET)
        ],
        [
            Fluid.of('minecraft:water', FluidAmounts.BUCKET),
            Item.of('minecraft:glow_berries', 8)
        ]
    ).id('kubejs:lumisene_mixing');
});
