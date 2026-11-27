"use strict";
const $ = id => document.getElementById(id);
const byId = new Map(catalog.map(b => [b.id,b]));
const states = {on:"已选",off:"排除",pending:"待审",native:"原生座椅"};
const mods = {yuushya:"方块小镇",kaleidoscope_cookery:"森罗物语·厨房",kaleidoscope_tavern:"森罗物语·酒馆",touhou_little_maid:"东方女仆",farmersdelight:"农夫乐事",minecraft:"原版",create:"机械动力",interiors:"机械动力：内饰"};
const order = Object.keys(mods);
const key="niijima.seats.v1";
let edits={}, hasDraft=false;
try {const raw=localStorage.getItem(key);hasDraft=raw!==null;edits=JSON.parse(raw||"{}") || {}; }
catch { $("receipt").textContent="未能读取本机草稿"; }
const state=b=>b.status==="native" ? "native" : edits[b.id]?.status || b.status;
const note=b=>edits[b.id]?.note || "";
let selected=new Set(), visible=[], anchor=null, buttons=new Map(), drag=null, suppressClick=false;
const element=(tag,text,cls)=>{
  const node=document.createElement(tag);
  if(text!==undefined) node.textContent=text;
  if(cls) node.className=cls;
  return node;
};
function save() {
  try { localStorage.setItem(key,JSON.stringify(edits)); $("receipt").textContent=""; }
  catch { $("receipt").textContent="草稿保存失败，请导出"; }
}
function patch(b,field,value) {
  const row={...edits[b.id],[field]:value};
  if (row.status===b.status) delete row.status;
  if (!row.note) delete row.note;
  if (Object.keys(row).length) edits[b.id]=row;
  else delete edits[b.id];
}
function card(b) {
  const btn=element("button",undefined,"tile");
  btn.type="button";btn.dataset.id=b.id;btn.dataset.state=state(b);
  btn.setAttribute("role","option");btn.setAttribute("aria-selected",String(selected.has(b.id)));
  btn.title=b.name+"\n"+b.id;
  btn.append(picture(b,true),element("span",b.name,"label"));
  if(state(b)!=="pending")btn.append(element("span",states[state(b)],"flag"));
  buttons.set(b.id,btn);
  return btn;
}
function picture(b,lazy) {
  if (!b.image) return element("span","缺模型");
  const img=document.createElement("img"); img.alt=b.name; img.src=b.image;
  img.decoding="async"; if(lazy)img.loading="lazy"; return img;
}
function describe() {
  const rows=[...selected].map(id=>byId.get(id));
  $("details").hidden=!rows.length;
  if (!rows.length)return;
  const one=rows.length===1, first=rows[0];
  $("preview").replaceChildren(one?picture(first,false):element("span",rows.length+" 项"));
  $("name").textContent=one?first.name:rows.length+" 个方块";
  $("ids").textContent=rows.map(r=>r.id).join(" · ");
  document.querySelectorAll("[data-set]").forEach(btn=>{
    btn.disabled=rows.every(r=>state(r)==="native");
    btn.classList.toggle("active",rows.every(r=>state(r)===btn.dataset.set));
  });
  $("reasons").replaceChildren(...[...new Set(rows.flatMap(b=>b.reasons))].map(s=>element("p",s)));
  const tags=[...new Set(rows.flatMap(b=>b.tags))].sort();
  $("tags").replaceChildren(...tags.map(t=>{
    const btn=element("button","#"+t,"tag");
    const light=on=>{for(const [id,c] of buttons)c.classList.toggle("related",on && byId.get(id).tags.includes(t));};
    btn.onmouseenter=btn.onfocus=()=>light(true);btn.onmouseleave=btn.onblur=()=>light(false);
    btn.onclick=()=>{$("search").value="#"+t;filterChanged();};
    return btn;
  }));
  const same=rows.every(r=>note(r)===note(first));
  $("note").value=same?note(first):"";
  $("note").placeholder=same?"":"多个值";
}
function draw() {
  const q=$("search").value.trim().toLowerCase(), mod=$("mod").value, filter=$("filter").value;
  visible=catalog.filter(b=>(!mod||mod===b.mod)&&(!filter||state(b)===filter)&&
    (!q||(q.startsWith("#")?b.tags.includes(q.slice(1)):[b.id,b.name,...b.tags,...b.reasons].join(" ").toLowerCase().includes(q))));
  const groups=new Map();
  for(const b of visible){if(!groups.has(b.mod))groups.set(b.mod,[]);groups.get(b.mod).push(b);}
  const groupsSorted=[...groups].sort(([a],[b])=>order.indexOf(a)-order.indexOf(b));
  visible=groupsSorted.flatMap(([,rows])=>rows);
  const shown=new Set(visible.map(b=>b.id));
  selected=new Set([...selected].filter(id=>shown.has(id)));
  if(!selected.size && visible.length) selected.add(visible[0].id);
  if(!shown.has(anchor))anchor=selected.values().next().value ?? null;
  buttons=new Map();
  const frag=document.createDocumentFragment();
  for(const [mod,rows] of groupsSorted){
    const group=element("section",undefined,"group");
    const title=element("h2",mods[mod]||mod);title.append(element("small",String(rows.length)));
    const tiles=element("div",undefined,"tiles");tiles.append(...rows.map(card));group.append(title,tiles);frag.append(group);
  }
  $("grid").replaceChildren(frag);
  $("count").textContent=visible.length+" / "+catalog.length;
  $("stats").textContent="已选 "+catalog.filter(r=>state(r)==="on").length;
  describe();
}
function filterChanged(){selected.clear();anchor=null;$("grid").scrollTop=0;draw();}
function apply(status){
  for(const id of selected){const b=byId.get(id);if(b.status!=="native")patch(b,"status",status);}
  save();draw();
}
for(const mod of order.filter(m=>catalog.some(b=>b.mod===m))) $("mod").append(new Option(mods[mod],mod));
$("grid").onclick=e=>{
  if(suppressClick){suppressClick=false;return;}
  const btn=e.target.closest(".tile");if(!btn)return;
  const id=btn.dataset.id, additive=e.ctrlKey||e.metaKey;
  if(e.altKey){
    const b=byId.get(id);
    if(b.status!=="native"){patch(b,"status",state(b)==="on"?"off":"on");save();draw();}
    return;
  }
  if(e.shiftKey && anchor){
    const a=visible.findIndex(r=>r.id===anchor), b=visible.findIndex(r=>r.id===id);
    if(!additive)selected.clear();
    for(const r of visible.slice(Math.min(a,b),Math.max(a,b)+1))selected.add(r.id);
  }else { if(!additive)selected.clear(); if(additive && selected.has(id))selected.delete(id);else selected.add(id);anchor=id; }
  for(const [k,c] of buttons)c.setAttribute("aria-selected",String(selected.has(k)));
  describe();
};
const grid=$("grid");
grid.ondragstart=e=>e.preventDefault();
grid.onpointerdown=e=>{
  if(e.button!==0||e.pointerType==="touch"||e.altKey||e.shiftKey)return;
  const tile=e.target.closest(".tile");
  if(!tile)return;
  drag={x:e.clientX,y:e.clientY,id:tile.dataset.id,old:e.ctrlKey||e.metaKey?new Set(selected):new Set(),moved:false};
};
window.addEventListener("pointermove",e=>{
  if(!drag || !e.buttons)return;
  if(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<6)return;
  drag.moved=true;
  const [x,X]=[Math.min(drag.x,e.clientX),Math.max(drag.x,e.clientX)];
  const [y,Y]=[Math.min(drag.y,e.clientY),Math.max(drag.y,e.clientY)];
  selected=new Set(drag.old);
  for(const [id,c] of buttons){
    const r=c.getBoundingClientRect();
    if(r.right>=x && r.left<=X && r.bottom>=y && r.top<=Y)selected.add(id);
    c.setAttribute("aria-selected",String(selected.has(id)));
  }
});
window.addEventListener("pointerup",()=>{
  if(drag?.moved){anchor=drag.id;suppressClick=true;setTimeout(()=>{suppressClick=false;},0);describe();}
  drag=null;
});
window.addEventListener("pointercancel",()=>{drag=null;describe();});
for(const btn of document.querySelectorAll("[data-set]"))btn.onclick=()=>apply(btn.dataset.set);
$("note").oninput=e=>{for(const id of selected)patch(byId.get(id),"note",e.target.value);save();};
$("search").oninput=$("mod").onchange=$("filter").onchange=filterChanged;
$("grid").onkeydown=e=>{
  if(e.key.toLowerCase()==="a"&&(e.ctrlKey||e.metaKey)){e.preventDefault();selected=new Set(visible.map(b=>b.id));for(const c of buttons.values())c.setAttribute("aria-selected","true");describe();}
};
$("export").onclick=async()=>{
  const snapshot={schema:1,pack:"1.6.test0119",rows:catalog.map(b=>({id:b.id,status:state(b),note:note(b)}))};
  const body=JSON.stringify(snapshot,null,2);
  try {
    if(location.protocol==="file:"){
      const url=URL.createObjectURL(new Blob([body],{type:"application/json"}));
      const link=element("a");link.href=url;link.download="列车座位审核.json";link.click();setTimeout(()=>URL.revokeObjectURL(url),3000);
      $("receipt").textContent=link.download;
    }else{
      const response=await fetch("./export",{method:"POST",headers:{"Content-Type":"application/json"},body});
      if(!response.ok)throw Error(String(response.status));
      $("receipt").textContent=(await response.json()).file;
    }
  }catch(error){$("receipt").textContent="导出失败 · "+error.message;}
};
async function start(){
  if(location.protocol!=="file:" && !hasDraft){
    try{
      const snapshot=await (await fetch("./state")).json();
      if(snapshot?.pack==="1.6.test0119"){
        for(const r of snapshot.rows){const b=byId.get(r.id);if(b){patch(b,"status",r.status);patch(b,"note",r.note);}}
      }
    }catch{ /* Static hosts still support browser-local drafts. */ }
  }
  draw();
}
start();

