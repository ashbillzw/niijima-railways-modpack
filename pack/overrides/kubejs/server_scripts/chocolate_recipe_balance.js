ServerEvents.recipes(event => {
    // OEI handles item unification; keep this recipe's ingredients and result ID.
    event.forEachRecipe({ id: 'neapolitan:chocolate/chocolate_bar' }, recipe => {
        const result = recipe.json.getAsJsonObject('result').deepCopy();
        result.addProperty('count', 1);
        recipe.merge({ result: result });
    });

    // Retain the author's fluid tag, output and conditions; only lower fluid use.
    event.forEachRecipe({ id: 'farmersdelight:integration/create/filling/chocolate_pie' }, recipe => {
        const ingredients = recipe.json.getAsJsonArray('ingredients').deepCopy();
        for (let i = 0; i < ingredients.size(); i++) {
            const ingredient = ingredients.get(i).getAsJsonObject();
            if (ingredient.has('fluidTag') && ingredient.get('fluidTag').getAsString() === 'forge:chocolate') {
                ingredient.addProperty('amount', 250);
            }
        }
        recipe.merge({ ingredients: ingredients });
    });
});
