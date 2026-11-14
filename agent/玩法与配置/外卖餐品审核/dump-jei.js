// Optional local test-instance client script. Consume the request once, after entering a world.
// Input and result are relative to the instance's minecraft directory.
let foodReviewTask = null;
let foodReviewChecked = false;
ClientEvents.tick(event => {
  if (!Client.level || foodReviewChecked && !foodReviewTask) return;
  try {
    if (!foodReviewTask) {
      const request = JsonIO.readString("kubejs/food-review-request.json");
      if (!request) { foodReviewChecked = true; return; }
      const runtime = Java.loadClass("mezz.jei.common.Internal").getOptionalJeiRuntime();
      if (!runtime.isPresent()) return;
      const ids = JSON.parse(String(request)).ids;
      foodReviewTask = { ids: ids, index: 0, foods: {}, runtime: runtime.get() };
      foodReviewChecked = true;
    }
    const task = foodReviewTask;
    const id = task.ids[task.index++];
    const stack = Item.of(id);
    const manager = task.runtime.getRecipeManager();
    const factory = task.runtime.getJeiHelpers().getFocusFactory();
    const roles = Java.loadClass("mezz.jei.api.recipe.RecipeIngredientRole");
    const types = Java.loadClass("mezz.jei.api.constants.VanillaTypes");
    const fluids = Java.loadClass("mezz.jei.api.forge.ForgeTypes");
    const regs = Java.loadClass("net.minecraftforge.registries.ForgeRegistries");
    const focus = Java.loadClass("java.util.Collections").singletonList(factory.createFocus(roles.OUTPUT,types.ITEM_STACK,stack));
    const categories = manager.createRecipeCategoryLookup().limitFocus(focus).get().iterator();
    const entry = {tags:[],routes:[]};
    stack.getTags().forEach(tag => entry.tags.push(String(tag.location())));
    while(categories.hasNext()) {
      const cat=categories.next(), type=cat.getRecipeType();
      const routes=manager.createRecipeLookup(type).limitFocus(focus).get().iterator();
      while(routes.hasNext()) {
        const recipe=routes.next(), layout=manager.createRecipeLayoutDrawable(cat,recipe,factory.createFocusGroup(focus));
        if (!layout.isPresent()) throw Error("JEI layout: "+id+" / "+type.getUid());
        const key=cat.getRegistryName(recipe);
        const route={id:key?String(key):null,type:String(type.getUid()),station:String(cat.getTitle().getString()),slots:[]};
        layout.get().getRecipeSlotsView().getSlotViews().forEach(view=>{
          const slot={role:String(view.getRole().name()),values:[]};
          view.getAllIngredients().forEach(typed=>{
            const item=typed.getItemStack(),fluid=typed.getIngredient(fluids.FLUID_STACK);
            if(item.isPresent()){
              const s=item.get();slot.values.push({item:String(regs.ITEMS.getKey(s.getItem())),count:s.getCount(),name:String(s.getHoverName().getString())});
            }else if(fluid.isPresent()){
              const f=fluid.get();slot.values.push({fluid:String(regs.FLUIDS.getKey(f.getFluid())),amount:f.getAmount()});
            }else slot.values.push({name:String(typed.getIngredient())});
          });
          if(slot.values.length)route.slots.push(slot);
        });
        entry.routes.push(route);
      }
    }
    task.foods[id]=entry;
    if(task.index===task.ids.length){
      JsonIO.write("kubejs/food-review-jei.json",{schema:1,foods:task.foods});foodReviewTask=null;
    }
  }catch(error){foodReviewChecked=true;foodReviewTask=null;console.error("Food review JEI export: "+error);}
});
