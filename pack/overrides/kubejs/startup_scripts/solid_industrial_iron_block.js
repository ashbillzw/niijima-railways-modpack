StartupEvents.registry('block', event => {
    event.create('kubejs:solid_industrial_iron_block')
        .model('create:block/industrial_iron_block')
        .mapColor('color_gray')
        .soundType('netherite_block')
        .hardness(3)
        .resistance(6)
        .requiresTool()
        .tagBlock('minecraft:mineable/pickaxe')
        .tagBlock('create:wrench_pickup');
});
