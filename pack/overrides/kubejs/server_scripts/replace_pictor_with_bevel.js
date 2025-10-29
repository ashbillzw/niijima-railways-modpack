ServerEvents.recipes(event => {
  event.replaceInput(
    { type: 'minecraft:stonecutting' },
    'yuushya:pictor',
    'numismatics:bevel'
  )
  event.remove({ id: 'yuushya:pictor' })
})
