ServerEvents.blockLootTables(event => {
    function setRolls(box, rolls) {
        event.modify('yuushya:' + box + '_gift_box', table => {
            table.pools.get(0).getAsJsonObject().addProperty('rolls', rolls);
        });
    }

    setRolls('businessman', 3);
    setRolls('cook', 3);
    setRolls('electrician', 1);
    setRolls('gardener', 3);
});
