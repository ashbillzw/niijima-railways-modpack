ServerEvents.recipes(event => {
    ['maple', 'oak', 'sakura'].forEach(tree => {
        event.forEachRecipe({ id: `yuushya:block/falling_${tree}_spawner` }, recipe => {
            recipe.merge({ ingredient: { item: 'yuushya:living_being_blueprint' } });
        });
    });
});
