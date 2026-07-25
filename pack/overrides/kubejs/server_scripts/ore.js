ServerEvents.recipes(event => {

    // ================== 矿脉生成 ==================
    // 氟矿石
    event.recipes.createoreexcavation.vein('{"text": "氟矿石"}', 'mekanism:fluorite_ore')
        .placement(128, 8, 333333)
        .biomeWhitelist('minecraft:is_overworld')
        .id("kubejs:fluorite_vein");

    // 铀矿
    event.recipes.createoreexcavation.vein('{"text": "铀矿"}', 'mekanism:uranium_ore')
        .placement(128, 8, 333333)
        .biomeWhitelist('minecraft:is_overworld')
        .id("kubejs:uranium_vein");

    // 锇矿
    event.recipes.createoreexcavation.vein('{"text": "锇矿"}', 'mekanism:osmium_ore')
        .placement(128, 8, 333333)
        .biomeWhitelist('minecraft:is_overworld')
        .id("kubejs:osmium_vein");

    // 铅矿
    event.recipes.createoreexcavation.vein('{"text": "铅矿"}', 'mekanism:lead_ore')
        .placement(128, 8, 333333)
        .biomeWhitelist('minecraft:is_overworld')
        .id("kubejs:lead_vein");

    // ================== 钻井配方 ==================
    const TIME = {
        DIAMOND: 400,
        NETHERITE: 160
    };
    const URANIUM_TIME = {
        DIAMOND: 600,
        NETHERITE: 240
    };

    // 氟矿石
    event.recipes.createoreexcavation.drilling('mekanism:fluorite_ore', 'kubejs:fluorite_vein', TIME.DIAMOND)
        .fluid('minecraft:water 250')
        .stress(256)
        .drill(['createoreexcavation:diamond_drill'])
        .id("kubejs:drilling_fluorite_diamond");

    event.recipes.createoreexcavation.drilling('mekanism:fluorite_ore', 'kubejs:fluorite_vein', TIME.NETHERITE)
        .fluid('minecraft:water 250')
        .stress(256)
        .drill(['createoreexcavation:netherite_drill'])
        .id("kubejs:drilling_fluorite_netherite");

    // 铀矿
    event.recipes.createoreexcavation.drilling('mekanism:uranium_ore', 'kubejs:uranium_vein', URANIUM_TIME.DIAMOND)
        .fluid('minecraft:water 500')
        .stress(512)
        .drill(['createoreexcavation:diamond_drill'])
        .id("kubejs:drilling_uranium_diamond");

    event.recipes.createoreexcavation.drilling('mekanism:uranium_ore', 'kubejs:uranium_vein', URANIUM_TIME.NETHERITE)
        .fluid('minecraft:water 500')
        .stress(512)
        .drill(['createoreexcavation:netherite_drill'])
        .id("kubejs:drilling_uranium_netherite");

    // 锇矿（无水）
    event.recipes.createoreexcavation.drilling('mekanism:osmium_ore', 'kubejs:osmium_vein', TIME.DIAMOND)
        .stress(256)
        .drill(['createoreexcavation:diamond_drill'])
        .id("kubejs:drilling_osmium_diamond");

    event.recipes.createoreexcavation.drilling('mekanism:osmium_ore', 'kubejs:osmium_vein', TIME.NETHERITE)
        .stress(256)
        .drill(['createoreexcavation:netherite_drill'])
        .id("kubejs:drilling_osmium_netherite");

});   // <--- 这里必须有一个 } 来结束 ServerEvents.recipes 回调