ServerEvents.recipes(event => {
    ['ctl:htlb_block', 'ctl:ilb_block'].forEach(id => {
        event.forEachRecipe({ id: id }, recipe => {
            recipe.merge({ ingredient: { tag: 'forge:glass' } });
        });
    });

    event.forEachRecipe({ id: 'ctl:quarter_htlb' }, recipe => {
        recipe.merge({ result: 'ctl:quarter_htlb' });
    });
});
