ServerEvents.recipes(event => {
    event.remove([
        { id: 'create:smelting/bread' },
        { id: 'create:smoking/bread' }
    ]);
});
