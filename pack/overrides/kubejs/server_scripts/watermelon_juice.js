// Only adjust Central Kitchen's recipes when its Farmer's Delight datapack supplies them.
ServerEvents.recipes(event => {
    const juice = 'kaleidoscope_tavern:watermelon_juice';
    const bottle = 'kaleidoscope_tavern:empty_bottle';
    function changeVessel(recipe, input, output) {
        const ingredients = recipe.json.getAsJsonArray('ingredients').deepCopy();
        const results = recipe.json.getAsJsonArray('results').deepCopy();
        ingredients.get(0).getAsJsonObject().addProperty('item', input);
        results.get(0).getAsJsonObject().addProperty('item', output);
        recipe.merge({ ingredients: ingredients, results: results });
    }
    event.forEachRecipe({ id: 'create_central_kitchen:filling/melon_juice' }, recipe => changeVessel(recipe, bottle, juice));
    event.forEachRecipe({ id: 'create_central_kitchen:emptying/melon_juice' }, recipe => changeVessel(recipe, juice, bottle));
});
