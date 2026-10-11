ServerEvents.recipes(event => {
    event.shaped(
        Item.of('farmersdelight:safety_net', 1),
        [
            'RR',
            'RR'
        ],
        {
            R: 'supplementaries:rope'
        }
    ).id('kubejs:safety_net_from_other_rope');
});
