ServerEvents.recipes(event => {
    for (let n = 1; n <= 8; n++) {
        let ingredients = ['minecraft:dragon_breath'];
        for (let i = 0; i < n; i++) {
            ingredients.push('minecraft:glass_bottle');
        }
        event.shapeless((n+1) + 'x minecraft:dragon_breath', ingredients);
    }
});