// Localize exact hardcoded tooltips from Misc and Things 4.0A.
// Keep unrelated lines intact; English fallback preserves the original wording.
ItemEvents.tooltip(event => {
  const replacements = {
  "§2Put a Card in a card inscriber and make §aunique §2cards": "niijima.translation.misc_tooltip.1",
  "§2Put a §acard §2in your §asecond hand §2and use the Magnifying Glass to §asee the scrip §2of a card": "niijima.translation.misc_tooltip.2",
  "§4Repair item in your §csecond hand §4or in your §carmors slots §4enchant with the §cmending§4 enchantement. The mending rune take xp from your §cxp bar§4 to repair items. The mending rune need to be in your main hand to work !": "niijima.translation.misc_tooltip.3",
  "§2Throwable §aTorch": "niijima.translation.misc_tooltip.4",
  "§2allows you to explore caves easily": "niijima.translation.misc_tooltip.5",
  "§5Right-click a §dSlime §5with this to make it §dgrow": "niijima.translation.misc_tooltip.6",
  "§5allows you to look at the §dentities §5around you": "niijima.translation.misc_tooltip.7",
  "§8content §7[§cchocolate§7]": "niijima.translation.misc_tooltip.8",
  "§8content §7[§ehoney§7]": "niijima.translation.misc_tooltip.9",
  "§8content §7[empty§7]": "niijima.translation.misc_tooltip.10",
  "§8content §7[§6lava§7]": "niijima.translation.misc_tooltip.11",
  "§8content §7[§aslime§7]": "niijima.translation.misc_tooltip.12",
  "§4Sneak + jump to §cjump high": "niijima.translation.misc_tooltip.13",
  "§8content §7[§3water§7]": "niijima.translation.misc_tooltip.14"
};
  event.addAdvanced(/create_things_and_misc:.*/, (stack, advanced, lines) => {
    for (let i = 0; i < lines.size(); i++) {
      const line = lines.get(i);
      if (line == null || typeof line.getString !== "function") continue;
      const key = replacements[String(line.getString())];
      if (key) lines.set(i, Text.translate(key));
    }
  });
});
