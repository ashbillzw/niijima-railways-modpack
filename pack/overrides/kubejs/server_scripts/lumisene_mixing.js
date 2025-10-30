ServerEvents.recipes(event => {
    e.custom({
        "type": "create:mixing",
        "ingredients": [
            {
                "amount": 8,
                "item": "minecraft:glow_berries"
            },
            {
                "amount": 1000,
                "fluid": "minecraft:water",
                "nbt": {}
            }
        ],
        "results": [
            {
                "amount": 1000,
                "fluid": "supplementaries:lumisene"
            }
        ]
    })
});
