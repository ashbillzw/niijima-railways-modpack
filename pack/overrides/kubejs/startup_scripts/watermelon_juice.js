// Finish carries the stack from before drinking, including when it was the last bottle.
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEntityUseItemEvent$Finish', event => {
    if (event.item.id === 'kaleidoscope_tavern:watermelon_juice' && !event.entity.level.clientSide) {
        Item.getItem('farmersdelight:melon_juice').affectConsumer(event.item, event.entity.level, event.entity);
    }
});
