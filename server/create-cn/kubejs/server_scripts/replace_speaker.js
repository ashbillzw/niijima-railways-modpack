ServerEvents.recipes(event => {
    event.replaceOutput(
        { type: 'minecraft:crafting_shaped' },
        'create_things_and_misc:brass_speaker',
        'supplementaries:speaker_block'
    );
    event.remove({ id: 'supplementaries:speaker_block' });
});
