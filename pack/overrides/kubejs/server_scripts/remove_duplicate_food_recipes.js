ServerEvents.recipes(event => {
    event.remove([
        { id: 'create:smelting/bread' },
        { id: 'create:smoking/bread' },
        { id: 'farmersdelight:rice' },
        { id: 'kaleidoscope_cookery:straw_block' },
        { id: 'kaleidoscope_cookery:rice_panicle' },
        { id: 'kaleidoscope_cookery:tomato_seed' }
    ]);
});
