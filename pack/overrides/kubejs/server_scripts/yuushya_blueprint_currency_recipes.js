ServerEvents.recipes(event => {
    const blueprintCosts = {
        'block_blueprint': 'numismatics:spur',
        'catering_blueprint': 'numismatics:cog',
        'extra_shapes_blueprint': 'numismatics:sprocket',
        'fabric_blueprint': 'numismatics:cog',
        'facility_blueprint': 'numismatics:sprocket',
        'furniture_blueprint': 'numismatics:cog',
        'lighting_blueprint': 'numismatics:cog',
        'living_being_blueprint': 'numismatics:cog',
        'sign_blueprint': 'numismatics:cog',
        'stone_blueprint': 'numismatics:spur',
        'store_blueprint': 'numismatics:sprocket',
        'traffic_blueprint': 'numismatics:sprocket',
        'window_blueprint': 'numismatics:sprocket',
        'wood_blueprint': 'numismatics:spur'
    };

    Object.entries(blueprintCosts).forEach(([blueprint, coin]) => {
        event.forEachRecipe({ id: `yuushya:${blueprint}` }, recipe => {
            recipe.merge({ ingredient: { item: coin } });
        });
    });
});
