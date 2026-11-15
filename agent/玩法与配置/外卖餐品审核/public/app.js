const byId = id => document.getElementById(id);
const grid = byId("grid"), details = byId("details"), receipt = byId("receipt");
function el(tag, text, cls) {
  const node = document.createElement(tag);
  if (text != null) node.textContent = text;
  if (cls) node.className = cls;
  return node;
}
const loadLabel=byId("load-label"), loadBar=byId("load-progress"), saveStatus=byId("save-status");
const catalog = await new Promise((resolve,reject)=>{
  const request=new XMLHttpRequest();
  request.open("GET","catalog.json");
  request.responseType="json";
  request.onprogress=event=>{
    if(!event.lengthComputable || !event.total)return;
    loadBar.value=Math.floor(100*event.loaded/event.total);
    loadLabel.textContent=`正在加载餐品 ${loadBar.value}%`;
  };
  request.onload=()=>request.status===200 && request.response ? resolve(request) : reject(Error("catalog.json: "+request.status));
  request.onerror=()=>reject(Error("catalog.json: network error"));
  request.send();
});
loadLabel.textContent="正在读取审核进度…";
loadBar.removeAttribute("value");
const {foods, recipes, icons, labels, tagIcons, fluidIcons = {}, ingredientRoutes = {}, ingredientTags = {}} = catalog.response;
const all = Object.keys(foods), fields = ["enabled","price","tasteMultiplier","qty","bonuses","reviewNote","needsDiscussion","sideDish","preferred"];
for (const food of Object.values(foods)) {
  food.tasteMultiplier ??= 1;
  food.preferred ??= false;
}
const baseline = Object.fromEntries(all.map(id => [id,Object.fromEntries(fields.map(k=>[k,foods[id][k]]))]));
const revision = catalog.getResponseHeader("ETag");
const progress = await fetch("progress", {cache:"no-store"});
if (!progress.ok) throw Error("progress: " + progress.status);
const edits = await progress.json();
const storageKey = "niijima-food-review/pending/" + revision;
const pending = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
let selection = new Set([all[0]]), anchor = all[0], visible = [], inspect = all[0], recipeIndex = 0;
const tiles = new Map(), state = (id,k) => Object.hasOwn(edits[id] || {},k) ? edits[id][k] : baseline[id][k];
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
function setValue(id,k,value) {
  putValue(id,k,value);
  if (value === true && (k === "sideDish" || k === "preferred")) putValue(id,"enabled",true);
  if (k === "enabled" && !value) {
    putValue(id,"sideDish",false);
    putValue(id,"preferred",false);
  }
}
function putValue(id,k,value) {
  (pending[id] ||= {})[k]=value;
  const change = edits[id] ||= {};
  if (same(value,baseline[id][k])) delete change[k]; else change[k]=value;
  if (!Object.keys(change).length) delete edits[id];
}
for (const [id,patch] of Object.entries(pending))
  for (const [k,value] of Object.entries(patch)) putValue(id,k,value);
const priceFields = ["price","qty","tasteMultiplier","bonuses"];
let saving, retry;
async function post(path, data) {
  const res=await fetch(path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({revision,...data})});
  const result=await res.json();
  if(!res.ok)throw Error(result.error || res.statusText);
  return result;
}
function rememberPending() {
  if(Object.keys(pending).length)sessionStorage.setItem(storageKey,JSON.stringify(pending));
  else sessionStorage.removeItem(storageKey);
}
async function drain() {
  saveStatus.textContent="保存中…";
  while(Object.keys(pending).length) {
    const batch=JSON.parse(JSON.stringify(pending));
    await post("progress",{edits:batch});
    for(const [id,patch] of Object.entries(batch)) {
      for(const [k,value] of Object.entries(patch))
        if(same(pending[id][k],value))delete pending[id][k];
      if(!Object.keys(pending[id]).length)delete pending[id];
    }
    rememberPending();
  }
  saveStatus.textContent="已保存";
}
function flush() {
  clearTimeout(retry);
  if (!saving && Object.keys(pending).length)
    saving=drain().catch(err=>{
      saveStatus.textContent="保存失败，正在重试";
      retry=setTimeout(save,3000);
      throw err;
    }).finally(()=>{saving=null;});
  return saving;
}
function save() {
  rememberPending();
  receipt.textContent="";
  flush()?.catch(()=>{}); // drain reports the failure and schedules a retry.
}
if(Object.keys(pending).length)save();
function icon(id) {
  if (!icons[id]) return el("span", "◇","icon");
  const i=el("img",null,id.startsWith("fluid/")?"icon fluid-icon":"icon");i.src=icons[id];i.alt="";i.draggable=false;return i;
}
const tilePrice = new Intl.NumberFormat("zh-CN", {maximumFractionDigits: 2, useGrouping: false});
function paint(id) {
  const tile=tiles.get(id); if (!tile) return;
  const on=state(id,"enabled");
  tile.classList.toggle("on",on);tile.classList.toggle("off",!on);
  tile.classList.toggle("side-dish",state(id,"sideDish"));
  tile.classList.toggle("preferred",state(id,"preferred"));
  tile.classList.toggle("discussion-marked",state(id,"needsDiscussion"));
  tile.classList.toggle("review-edited",priceFields.some(k=>Object.hasOwn(edits[id] || {},k)));
  tile.setAttribute("aria-selected",selection.has(id));
  const price = state(id,"price"), qty = state(id,"qty");
  const taste = state(id,"tasteMultiplier");
  const adjusted = price == null ? null : Number((price * taste).toPrecision(15));
  tile.classList.toggle("taste-adjusted", adjusted != null && taste !== 1);
  const display = adjusted == null ? "—" : tilePrice.format(adjusted);
  tile.lastChild.textContent = price != null && qty !== 1
    ? display + "・" + tilePrice.format(Number((price * taste * qty).toPrecision(15)))
    : display;
  tile.title=foods[id].name+" · "+id+(foods[id].note?" · "+foods[id].note:"");
}
function updateEnabledCount() {
  const count = all.reduce((sum,id) => sum + Number(state(id,"enabled")), 0);
  byId("total").textContent = "已启用 " + count + " 种";
}
const groupOf = food => food.category === "搞怪（整蛊）" ? food.category : food.mod;
function renderGrid() {
  const q=byId("search").value.trim().toLowerCase(), mod=byId("mod").value, filter=byId("rotation").value;
  visible=all.filter(id=>(!mod || groupOf(foods[id])===mod) && (!filter || state(id,"enabled")===(filter==="on")) &&
    (!q || [id,foods[id].name,foods[id].mod,...foods[id].tags].some(s=>s.toLowerCase().includes(q))));
  const groups=new Map(), fragment=document.createDocumentFragment();tiles.clear();
  for (const id of visible) {
    const food=foods[id];
    const name=groupOf(food);
    if (!groups.has(name)) {
      const count=el("small"),heading=el("div",name,"group-title"),group=el("div",null,"tiles");
      heading.append(count);fragment.append(heading,group);groups.set(name,{group,count});
    }
    const {group}=groups.get(name), tile=el("div",null,"tile");
    const count=food.usages?.length??0, usageCount=el("span",count,"usage-count");
    usageCount.title="后续合成："+count;
    tile.dataset.id=id;tile.setAttribute("role","option");tile.append(usageCount,el("span","好","preferred-mark"),icon(id),el("span",food.name,"name"),el("span",null,"price"));
    tiles.set(id,tile);group.append(tile);paint(id);
  }
  for (const {group,count} of groups.values()) count.textContent=group.childElementCount;
  grid.replaceChildren(fragment);
  byId("visible-count").textContent = "可见 " + visible.length + " / " + all.length;
  updateEnabledCount();
}
for (const group of new Set(all.map(id=>groupOf(foods[id])))) byId("mod").add(new Option(group,group));
for(const id of ["search","mod","rotation"]) byId(id).oninput=()=>{renderGrid();select(new Set([...selection].filter(id=>tiles.has(id))));};
function select(next,active) {
  const old=selection;selection=next;
  if (!selection.has(inspect) || active) {inspect=active && selection.has(active)?active:[...next][0];recipeIndex=0;}
  for (const id of new Set([...old,...next])) if(old.has(id)!==next.has(id)) paint(id);
  renderDetails();
}
function clicked(id,e) {
  if(!id) return new Set();
  const toggle=e.ctrlKey||e.metaKey, next=toggle?new Set(selection):new Set();
  if (e.shiftKey && visible.includes(anchor)) {
    const a=visible.indexOf(anchor),b=visible.indexOf(id);
    for (const key of visible.slice(Math.min(a,b),Math.max(a,b)+1)) next.add(key);
  } else {if(toggle && next.has(id)) next.delete(id);else next.add(id);anchor=id;}
  return next;
}
let drag=null, autoFrame;
function flip(id) {
  if (!id || drag.seen.has(id)) return;
  drag.seen.add(id);setValue(id,"enabled",!state(id,"enabled"));paint(id);
  updateEnabledCount();
}
function updateDrag() {
  if(!drag) return;
  const {x,y,startX,startY}=drag, bounds=grid.getBoundingClientRect();
  if(!drag.moved && Math.hypot(x-startX,y-startY)<4) return;
  drag.moved=true;
  if(y<bounds.top+30) grid.scrollTop-=12; else if(y>bounds.bottom-30) grid.scrollTop+=12;
  if(drag.alt) {
    flip(document.elementFromPoint(x,y)?.closest(".tile")?.dataset.id);
  } else {
    const top=startY+drag.scroll-grid.scrollTop, a=Math.min(startX,x),b=Math.max(startX,x),c=Math.min(top,y),d=Math.max(top,y);
    const box=byId("marquee");box.hidden=false;
    Object.assign(box.style,{left:a+"px",top:Math.max(bounds.top,c)+"px",width:(b-a)+"px",height:Math.max(0,Math.min(d,bounds.bottom)-Math.max(c,bounds.top))+"px"});
    const next=new Set(drag.ctrl||drag.shift?drag.before:[]);
    for(const [id,tile] of tiles) {
      const r=tile.getBoundingClientRect();
      if(r.right<a || r.left>b || r.bottom<c || r.top>d)continue;
      if(drag.ctrl && drag.before.has(id))next.delete(id);else next.add(id);
    }
    if(next.size!==selection.size || [...next].some(id=>!selection.has(id))) select(next);
  }
}
function scrollDrag(){if(!drag)return; const r=grid.getBoundingClientRect();if(drag.moved && (drag.y<r.top+30 || drag.y>r.bottom-30)) updateDrag(); autoFrame=requestAnimationFrame(scrollDrag);}
grid.onpointerdown=e=>{
  if(e.button!==0 || e.pointerType==="touch")return;
  e.preventDefault();grid.focus({preventScroll:true});const id=e.target.closest(".tile")?.dataset.id;
  drag={id,startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,scroll:grid.scrollTop,ctrl:e.ctrlKey||e.metaKey,shift:e.shiftKey,alt:e.altKey,before:new Set(selection),seen:new Set()};
  grid.setPointerCapture(e.pointerId);if(drag.alt)flip(id);autoFrame=requestAnimationFrame(scrollDrag);
};
grid.onpointermove=e=>{if(drag){drag.x=e.clientX;drag.y=e.clientY;updateDrag();}};
function end(e,cancelled){
  if(!drag)return;
  if(drag.alt){changed();}
  else if(!drag.moved && !cancelled)select(clicked(drag.id,e),drag.id);
  else if(drag.id && !drag.shift)anchor=drag.id;
  byId("marquee").hidden=true;cancelAnimationFrame(autoFrame);drag=null;
  if(grid.hasPointerCapture(e.pointerId))grid.releasePointerCapture(e.pointerId);
}
grid.onpointerup=e=>end(e,false);grid.onpointercancel=e=>end(e,true);
grid.onclick=e=>{if(e.pointerType==="touch"){const id=e.target.closest(".tile")?.dataset.id;select(clicked(id,e),id);}};
document.addEventListener("keydown",e=>{
  const key=({a:"enabled",s:"sideDish",d:"preferred"})[e.key.toLowerCase()];
  if(!key || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || e.isComposing || e.repeat)return;
  if(e.target.closest("input,textarea,select,[contenteditable=true]"))return;
  const hovered=grid.querySelector(".tile:hover")?.dataset.id;
  if(hovered){e.preventDefault();setValue(hovered,key,!state(hovered,key));changed();}
  else if(e.target===grid && selection.size){e.preventDefault();bulk(key,common(key)!==true);}
});
grid.onkeydown=e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="a"){e.preventDefault();select(new Set(visible));}
  if(e.key===" " && selection.size){e.preventDefault();for(const id of selection)setValue(id,"enabled",!state(id,"enabled"));changed();}
};
function changed() {save();renderGrid();select(new Set([...selection].filter(id=>tiles.has(id))));}
function common(k) {const values=[...selection].map(id=>state(id,k));return values.every(v=>same(v,values[0]))?values[0]:undefined;}
function panel(title) {const p=el("section",null,"panel");if(title)p.append(el("h3",title));details.append(p);return p;}
function field(p,name,input){const row=el("label",null,"field");row.append(el("span",name),input);p.append(row);}
function bulk(k,v){for(const id of selection)setValue(id,k,v);changed();}
function withRestore(control,key) {
  if (![...selection].some(id=>Object.hasOwn(edits[id] || {},key))) return control;
  const row=el("div",null,"edited-field"), reset=el("button","恢复");
  reset.type="button";
  reset.onclick=()=>{
    for (const id of selection) setValue(id,key,baseline[id][key]);
    changed();
  };
  row.append(control,reset);
  return row;
}
function numberField(p,k,name,min,max,step) {
  const input=el("input");input.type="number";input.min=min;input.max=max;input.step=step;
  const v=common(k);input.value=v??"";input.placeholder=v===undefined?"多个值":"—";
  input.onchange=()=>{
    if(input.value && input.reportValidity())bulk(k,input.valueAsNumber);
    else if(!input.value && k==="price")bulk(k,null);
    else if(!input.value && k==="tasteMultiplier")bulk(k,1);
  };
  const label=el("label",null,"field");
  label.append(el("span",name),input);
  p.append(withRestore(label,k));
}
function bonuses(p){
  p.append(withRestore(el("h3","加成"),"bonuses"));
  const keys=new Set([...selection].flatMap(id=>Object.keys(state(id,"bonuses"))));
  function apply(name,value){for(const id of selection){const map={...state(id,"bonuses")};if(value==null)delete map[name];else map[name]=value;setValue(id,"bonuses",map);}changed();}
  for(const key of keys){
    const row=el("div",null,"bonus-row"),input=el("input"),del=el("button","−");
    const vals=[...selection].map(id=>state(id,"bonuses")[key]);
    input.type="number";input.min="0";input.max="1000000";input.step="any";input.placeholder="多个值";input.value=vals.every(v=>v===vals[0])?vals[0]:"";
    input.onchange=()=>{if(input.valueAsNumber>0 && input.reportValidity())apply(key,input.valueAsNumber);};
    del.title="移除 "+key;del.onclick=()=>apply(key,null);row.append(el("span",key),input,del);p.append(row);
  }
  const row=el("form",null,"bonus-row"),name=el("input"),val=el("input"),add=el("button","+");
  name.placeholder="加成";name.required=true;val.type="number";val.step="any";val.min="0";val.max="1000000";val.required=true;val.value=1;
  row.onsubmit=e=>{e.preventDefault();if(name.value.trim() && val.valueAsNumber>0)apply(name.value.trim(),val.valueAsNumber);};row.append(name,val,add);p.append(row);
}
const types={crafting_shaped:"有序合成",crafting_shapeless:"无序合成",jelly_craft_shapeless:"无序合成",mechanical_crafting:"动力合成",campfire_cooking:"营火",smoking:"烟熏炉",smelting:"熔炉",cooking:"厨锅",cutting:"砧板",pot:"炒锅",flex_pot:"炒锅",stockpot:"汤锅",flex_stockpot:"汤锅",filling:"注液",compacting:"压缩",sequenced_assembly:"序列装配",combine:"组合",grilling:"烤架",barrel:"酿造桶",shaker:"雪克杯",steamer:"蒸笼",teapot:"茶壶",rice_bowl:"盖饭",bamboo_tray:"竹盘",chopping_board:"砧板",stonecutting:"切石机"};
function kind(d){const k=d.type.split(":").pop();return d.station||types[k]||k;}
function ingredient(v){
  if(Array.isArray(v)) return {text:v.map(x=>ingredient(x).text).join(" / "),id:ingredient(v[0]||{}).id};
  if(typeof v==="string")v={item:v};
  if(v.type==="minecraft:item" && v.nbt?.Item)v={item:v.nbt.Item.id,count:v.nbt.Item.Count};
  const id=v.item||(v.fluidTag?fluidIcons["#"+v.fluidTag]:fluidIcons[v.fluid]||v.fluid)||tagIcons[v.tag];
  const name=v.name||(v.tag?"#"+v.tag:v.fluidTag?"#"+v.fluidTag:labels[v.item||v.fluid]||v.item||v.fluid||v.action||JSON.stringify(v));
  return {id,text:name+(v.amount?" · "+v.amount+" mB":""),count:v.count||1};
}
function slot(v){const box=el("span",null,"slot"+(v?"":" empty"));if(v){const a=ingredient(v);box.title=a.text+(a.count>1?" ×"+a.count:"");box.setAttribute("aria-label",box.title);box.append(icon(a.id));if(a.count>1)box.append(el("b","×"+a.count));}return box;}
function recipeCard(id,rid,drill=true){
  const d=recipes[rid],card=el("div",null,"recipe"),inputs=d.ingredients||[d.ingredient].filter(Boolean);
  const result=d.result??d.results??d.output;
  const preview=el("div");
  function linkInput(node,value){
    if(!drill || !value)return node;
    const targets=new Set([value].flat().flatMap(v=>v.tag ? ingredientTags[v.tag]||[] : [v.item||v]).filter(key=>ingredientRoutes[key]));
    if(!targets.size)return node;
    const links=[...targets].flatMap(key=>ingredientRoutes[key].map(route=>({key,route})));
    function show(index){
      const {key,route}=links[index],nav=el("div",null,"recipe-nav"),menu=el("select");
      links.forEach((l,i)=>menu.add(new Option((labels[l.key]||l.key)+" · "+kind(recipes[l.route])+" · "+(i+1)+"/"+links.length,i)));
      menu.value=index;menu.onchange=()=>show(+menu.value);
      const close=el("button","×");close.ariaLabel="关闭材料配方";close.onclick=()=>{preview.replaceChildren();node.focus();};
      nav.append(menu,close);preview.replaceChildren(nav,recipeCard(key,route,false));
      preview.scrollIntoView({block:"nearest"});menu.focus({preventScroll:true});
    }
    node.className+=" recipe-link";node.tabIndex=0;node.setAttribute("role","button");
    node.onclick=()=>show(0);
    node.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();show(0);}};
    return node;
  }
  if(d.slots){
    for(const s of d.slots){const a=ingredient(s.values), row=el("div",null,"ingredient");row.append(icon(a.id),el("span",(s.role==="OUTPUT"?"→ ":"")+s.values.map(v=>ingredient(v).text+(v.count>1?" ×"+v.count:"")).join(" / ")));card.append(s.role==="INPUT"?linkInput(row,s.values):row);}
  }else if(d.pattern || /crafting_shapeless|jelly_craft_shapeless/.test(d.type)){
    const width=Math.max(3,...(d.pattern||[]).map(s=>s.length)),g=el("div",null,"matrix");g.style.setProperty("--cols",width);
    for(let j=0;j<Math.max(3,d.pattern?.length||Math.ceil(inputs.length/width))*width;j++){
      const v=d.pattern?d.key[d.pattern[Math.floor(j/width)]?.[j%width]]:inputs[j];g.append(linkInput(slot(v),v));
    }
    const wrap=el("div",null,"craft");wrap.append(g,el("span","→","arrow"),slot(result));card.append(wrap);
  }else{
    function line(v,prefix=""){if(!v)return;const a=ingredient(v),row=el("div",null,"ingredient");row.append(icon(a.id),el("span",prefix+a.text+(a.count>1?" ×"+a.count:"")));card.append(prefix==="→ "?row:linkInput(row,v));}
    for(const v of inputs)line(v);
    for(const [key,label] of Object.entries({carrier:"容器",container:"容器",tool:"工具",fluid:"流体",soup_base:"汤底",tea_fluid:"茶汤"})) if(d[key])line(d[key],label+" · ");
    if(d.sequence)for(const step of d.sequence)card.append(el("p",kind(step)+" · "+(step.ingredients||[]).map(x=>ingredient(x).text).join(" + "),"caption"));
    for(const [key,unit] of Object.entries({time:"tick",duration:"tick",cookingtime:"tick",barbecuingTime:"tick",cook_tick:"tick",unit_time:"tick",stir_fry_count:"次翻炒",cut_count:"次切割",loops:"轮",ingredient_count:"份原料"}))if(d[key])card.append(el("span",d[key]+" "+unit+"  ","caption"));
    for(const v of Array.isArray(result)?result:[result])line(typeof v==="string"?{item:v,count:d.count}:v,"→ ");
  }
  card.append(el("div",d.slots?(d.id||d.type):rid,"caption"),preview);return card;
}
function renderUsages(id){
  const ids=foods[id].usages||[], p=panel("后续合成 · "+ids.length);
  if(!ids.length)return;
  const picker=el("select",null,"browse-item"),preview=el("div");
  picker.ariaLabel="后续合成";
  ids.forEach((rid,i)=>{
    const d=recipes[rid],out=d.result??d.results??d.output;
    const label=(Array.isArray(out)?out:[out]).filter(Boolean).map(v=>ingredient(v).text).join(" + ");
    picker.add(new Option((label||rid)+" · "+kind(d),i));
  });
  picker.onchange=()=>preview.replaceChildren(recipeCard(id,ids[Number(picker.value)]));
  picker.value=0;picker.onchange();p.append(picker,preview);
}
function renderDetails(){
  details.replaceChildren();if(!selection.size)return;
  const food=foods[inspect],top=el("div",null,"top"),titles=el("div");
  titles.append(el("h2",selection.size===1?food.name:selection.size+" 款餐品"),el("p",selection.size===1?inspect:"多个值","id"));
  top.append(icon(inspect),titles);details.append(top);
  const edit=panel();
  function checkbox(key,label,shortcut) {
    const box=el("input"), value=common(key);
    box.type="checkbox";box.checked=value===true;box.indeterminate=value===undefined;
    if(shortcut)box.title=label+"（"+shortcut+"）";
    box.onchange=()=>bulk(key,box.checked);field(edit,label,box);
  }
  checkbox("enabled","已加入轮换","A");
  const references=new Set([...selection].map(id=>baseline[id].price));
  const reference=references.values().next().value;
  field(edit,"基础参考价",el("span",references.size>1?"多个值":reference==null?"—":String(reference)));
  numberField(edit,"price","价值",0,1000000,"any");
  numberField(edit,"tasteMultiplier","个人口味乘数",Number.MIN_VALUE,1000000,"any");
  numberField(edit,"qty","数量乘数",1,64,1);
  checkbox("needsDiscussion","待讨论");
  checkbox("sideDish","副餐品","S");
  checkbox("preferred","好","D");
  const note=el("textarea"), label=el("label",null,"review-note"), sharedNote=common("reviewNote");
  note.rows=3;note.value=sharedNote??"";note.placeholder=sharedNote===undefined?"多个值":"";
  note.oninput=()=>{for(const id of selection){setValue(id,"reviewNote",note.value);paint(id);}note.placeholder="";save();};
  label.append(el("span","备注"),note);edit.append(label);
  bonuses(panel());
  const p=panel("合成途径");
  if(selection.size>1){
    const choose=el("select",null,"browse-item");choose.ariaLabel="查看餐品配方";
    for(const id of selection)choose.add(new Option(foods[id].name,id));choose.value=inspect;
    choose.onchange=()=>{inspect=choose.value;recipeIndex=0;renderDetails();};p.append(choose);
  }
  if(food.note)p.append(el("p",food.note,"caption"));
  const ids=food.recipes,nav=el("div",null,"recipe-nav"),tabs=el("select");
  const options=[...ids.map(rid=>kind(recipes[rid])),"材料／合成方式"];
  const prev=el("button","‹"),next=el("button","›");prev.ariaLabel="上一配方";next.ariaLabel="下一配方";
  options.forEach((name,i)=>tabs.add(new Option(name+" · "+(i+1)+"/"+options.length,i)));
  tabs.value=recipeIndex;tabs.ariaLabel="合成途径";tabs.onchange=()=>{recipeIndex=+tabs.value;renderDetails();};
  prev.disabled=recipeIndex===0;next.disabled=recipeIndex===ids.length;
  prev.onclick=()=>{recipeIndex--;renderDetails();};next.onclick=()=>{recipeIndex++;renderDetails();};
  nav.append(prev,tabs,next);p.append(nav);
  p.append(recipeIndex<ids.length?recipeCard(inspect,ids[recipeIndex]):el("p",food.method||"未找到配方","method"));
  renderUsages(inspect);
  const t=panel("标签"),list=el("div",null,"tag-list");
  const tags=new Map();for(const id of selection)for(const tag of foods[id].tags)tags.set(tag,(tags.get(tag)||0)+1);
  function highlight(tag){for(const [id,tile] of tiles)tile.classList.toggle("tag-match",!!tag&&foods[id].tags.includes(tag));}
  for(const [tag,count] of [...tags].sort()){const b=el("button",tag+(selection.size>1?" · "+count:""));b.onpointerenter=b.onfocus=()=>highlight(tag);b.onpointerleave=b.onblur=()=>highlight(null);list.append(b);}
  t.append(list);
}
byId("export").onclick=async e=>{
  const btn=e.currentTarget;btn.disabled=true;
  try{
    await flush();
    receipt.textContent=(await post("export",{})).file;
  }catch(err){receipt.textContent=err.message;}finally{btn.disabled=false;}
};
renderGrid();renderDetails();
byId("loading").remove();
byId("export").disabled=false;
