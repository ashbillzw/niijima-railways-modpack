// priority: -100
// Copy concrete members after ordinary additions to avoid a cycle between the tags.
ServerEvents.tags('item', event => {
    const pairs = JSON.parse(JsonIO.readString('kubejs/config/fruit_tag_aliases.json'));
    pairs.forEach(pair => {
        const left = event.get(pair[0]);
        const right = event.get(pair[1]);
        const leftItems = left.getObjectIds();
        const rightItems = right.getObjectIds();
        leftItems.forEach(id => { if (!rightItems.contains(id)) right.add(String(id)); });
        rightItems.forEach(id => { if (!leftItems.contains(id)) left.add(String(id)); });
    });
});
