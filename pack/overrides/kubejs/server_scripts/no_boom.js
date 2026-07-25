// 在 server_scripts 中
ServerEvents.recipes(event => {
    event.remove({ output: 'securitycraft:mine' });
    event.remove({ output: 'securitycraft:bouncing_betty' });
    event.remove({ output: 'securitycraft:track_mine' });
});