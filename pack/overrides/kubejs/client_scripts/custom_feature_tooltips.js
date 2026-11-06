ItemEvents.tooltip(event => {
    event.add('minecraft:lead', '[AshBill]也能拴住村民等。');
    event.add('simpleplanes:liquid_engine', '可用岩浆驱动。[AshBill]也能烧种子油、生物乙醇和荧光油（效率最高）');
    event.add('railways:fuel_tank', '可用岩浆驱动。[AshBill]也能烧种子油、荧光油和生物乙醇（效率最高）');
    event.add([
        'minecraft:white_bed',
        'minecraft:red_bed',
        'minecraft:end_rod',
        'yuushya:toilet',
        'yuushya:couch_raw_crimson_wood',
        'yuushya:park_bench_raw_oak_wood'
    ], '[AshBill]装配于列车上可当座位。');

    const wireHints = {
        'wire.pantographsandwires.catenary_headspan': '[AshBill]也可连接栅栏。',
        'wire.pantographsandwires.support_wire': '[AshBill]也可连接活板门、锁链、铁栏杆、棕色和绿色绝缘子。'
    };
    event.addAdvanced('pantographsandwires:wire_coil', (stack, advanced, lines) => {
        const hint = wireHints[stack.item.getSubType(stack).getTranslationKey()];
        if (hint) lines.add(Text.of(hint));
    });
});
