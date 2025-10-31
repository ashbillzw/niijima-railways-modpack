ServerEvents.tags('block', event => {
    event.add('trainresync:fake_seats', [
        'minecraft:white_bed',
        'minecraft:red_bed',
        'minecraft:end_rod',
        'yuushya:toilet',
        'yuushya:couch_raw_crimson_wood',
        'yuushya:park_bench_raw_oak_wood'
    ]);
    event.add('create:movable_empty_collider', [
        'yuushya:beef',
        'yuushya:detergent',
        'yuushya:gas_stove',
        'yuushya:jack',
        'yuushya:park_bench_raw_oak_wood'
    ]);
});
