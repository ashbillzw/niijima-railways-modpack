ServerEvents.tags('block', event => {
    event.add('pantographsandwires:catenary_headspan_connectable', '#minecraft:fences');
    event.add('pantographsandwires:support_wire_connectable', [
        '#minecraft:trapdoors',
        'minecraft:chain',
        'minecraft:iron_bars',
        'pantographsandwires:insulator_brown',
        'pantographsandwires:insulator_green'
    ]);
});
