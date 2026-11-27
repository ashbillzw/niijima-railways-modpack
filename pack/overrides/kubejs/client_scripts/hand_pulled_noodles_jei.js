JEIEvents.information(event => {
    const route = Text.join(
        Text.translate('item.kaleidoscope_cookery.raw_dough'), Text.of(' ×1 → '),
        Text.translate('item.kaleidoscope_cookery.raw_noodles'), Text.of(' ×1')
    );
    event.addItem(['kaleidoscope_cookery:raw_dough', 'kaleidoscope_cookery:raw_noodles'], [
        route, Text.translate('tooltip.kaleidoscope_cookery.raw_dough')
    ]);
});
