// Central Kitchen supplies these recipes through its optional Farmer's Delight datapack.
ServerEvents.recipes(event => {
    event.forEachRecipe({ id: 'create_central_kitchen:mixing/hot_cocoa' }, recipe => {
        const results = recipe.json.getAsJsonArray('results').deepCopy();
        results.get(0).getAsJsonObject().addProperty('fluid', 'create_confectionery:hot_chocolate');
        recipe.merge({ results: results });
    });
    // Existing tanks can still be bottled. Draining uses Confectionery's recipe.
    event.forEachRecipe({ id: 'create_central_kitchen:filling/hot_cocoa' }, recipe => {
        const results = recipe.json.getAsJsonArray('results').deepCopy();
        results.get(0).getAsJsonObject().addProperty('item', 'create_confectionery:hot_chocolate_bottle');
        recipe.merge({ results: results });
    });
    event.remove({ id: 'create_central_kitchen:emptying/hot_cocoa' });
});
