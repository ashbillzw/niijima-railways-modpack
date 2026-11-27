// Confectionery applies the white chocolate effect itself but omits the caramel filling.
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEntityUseItemEvent$Finish', event => {
    if (event.item.id === 'create_confectionery:white_chocolate_candy' && !event.entity.level.clientSide) {
        Java.loadClass('net.mcreator.createconfectionery.procedures.BarOfCaramelFoodEatenProcedure').execute(event.entity);
    }
});
