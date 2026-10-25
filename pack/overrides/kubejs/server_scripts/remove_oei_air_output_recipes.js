// OEI can replace outputs with air without removing their recipes.
// Use exact IDs because output stacks may already have been replaced.
ServerEvents.recipes(event => {
    const recipeIds = [
        'yuushya:idol_gift_box',
        'yuushya:bismuth_crystal',
        'design_decor:tinted_framed_glass_from_glass_tinted_stonecutting',
        'design_decor:horizontal_tinted_framed_glass_from_glass_tinted_stonecutting',
        'design_decor:vertical_tinted_framed_glass_from_glass_tinted_stonecutting',
        // Existing OEI rules; these IDs simply do not match when the mod is absent.
        'create_things_and_misc:train_stop_craft',
        'create_things_and_misc:copper_sticky_launcher_craft',
        'create_things_and_misc:brass_sticky_launcher_craft'
    ];
    recipeIds.forEach(id => event.remove({ id: id }));
    // Keep blueprint recipes: yuushya_blueprint_currency_recipes.js
    // already changes their ingredient to Numismatics currency.
});
