ServerEvents.recipes(event => {
    event.recipes.create.pressing('minecraft:dirt_path', '#minecraft:dirt')
    event.remove({id: 'create:pressing/path'});
})
