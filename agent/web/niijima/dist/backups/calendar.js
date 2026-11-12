"use strict";
const sourceLinks = [...document.querySelectorAll(".sources a")];
const sourceBar = document.querySelector(".sources");
const archive = sourceBar.closest(".archive");
const barItems = [...sourceBar.children];
const rowBreaks = barItems.slice(1).map(item => {
  const br = document.createElement("span");
  br.className = "row-break";
  br.hidden = true;
  br.setAttribute("aria-hidden","true");
  item.before(br);
  return br;
});

// Use actual plaque and button widths, including changes from fonts and zoom.
function balanceSourceRows() {
  const archiveStyle = getComputedStyle(archive);
  const panelStyle = getComputedStyle(sourceBar.parentElement);
  const available = archive.clientWidth - parseFloat(archiveStyle.paddingLeft) - parseFloat(archiveStyle.paddingRight)
    - parseFloat(panelStyle.paddingLeft) - parseFloat(panelStyle.paddingRight)
    - parseFloat(panelStyle.borderLeftWidth) - parseFloat(panelStyle.borderRightWidth);
  const gap = parseFloat(getComputedStyle(sourceBar).columnGap);
  const widths = barItems.map(item => item.getBoundingClientRect().width);
  for (let rows = 1; rows <= widths.length; rows++) {
    const starts = [];
    let longest = 0;
    let index = 0;
    for (let row = 0; row < rows; row++) {
      const count = Math.floor(widths.length / rows) + Number(row < widths.length % rows);
      const width = widths.slice(index,index+count).reduce((sum,w) => sum+w, gap*(count-1));
      if (count > 1 && width > available) break;
      longest = Math.max(longest,width);
      starts.push(index);
      index += count;
    }
    if (index === widths.length) {
      sourceBar.style.width = longest + "px";
      rowBreaks.forEach((br,i) => { br.hidden = !starts.includes(i+1); });
      return;
    }
  }
}
const barObserver = new ResizeObserver(balanceSourceRows);
for (const element of [archive,...barItems]) barObserver.observe(element);

const listings = new Map(Object.entries(initialDirectories));
const byteCache = new Map(Object.values(initialDirectories).flat());
const publicOrigin = "https://mc1.ashbill.com:25572";
const offline = location.protocol === "file:";
const dlOrigin = offline ? publicOrigin : location.origin;

function capacity(bytes) {
  const gb = bytes >= 1e9;
  const amount = bytes / (gb ? 1e9 : 1e6);
  if (!gb) return Math.round(amount) + " MB";
  return new Intl.NumberFormat("zh-CN", {maximumFractionDigits:amount < 10 ? 2 : 1}).format(amount) + " GB";
}

function beijingDay(timestamp) {
  return new Date(timestamp + 8*3600000).toISOString().slice(0,10);
}

function backupDay(filename) {
  const match = /_world_(\d{4}-\d\d-\d\d)_(\d\d)-(\d\d)-(\d\d)\.zip$/.exec(filename);
  const utc = Date.parse(match[1] + "T" + match.slice(2).join(":") + "Z");
  return beijingDay(utc);
}

function entries(server) {
  const files = new Map();
  for (const [group,date,path,bytes] of historicalBackups) {
    const playerData = group === "playerdata";
    if (group === server || (server === "main-cn" && playerData)) {
      files.set(path.split("/").pop(), {date,path,bytes,playerData});
    }
  }
  for (const suffix of ["simple-backups","archive"]) {
    const dir = server + "-" + suffix;
    for (const [name,bytes] of listings.get(dir) || []) {
      files.set(name, {date:backupDay(name),path:"/"+dir+"/"+name,bytes});
    }
  }
  const records = [...files.values()];
  const downloadableDays = new Set(records.map(row=>row.date));
  for (const date of evidencedWorldDays[server] || []) {
    if (!downloadableDays.has(date)) records.push({date, removed:true});
  }
  return records.sort((a,b)=>a.date.localeCompare(b.date));
}

function fileCell(record, day) {
  const link = document.createElement(record.removed ? "span" : "a");
  link.className = "day day-file";
  const label = document.createElement("small");
  if (record.removed) {
    link.className += " removed";
    label.textContent = "已移除";
  } else {
    link.className += record.playerData ? " day-link player-data" : " day-link";
    link.href = new URL(record.path, dlOrigin).href;
    link.download = record.path.split("/").pop();
    link.title = link.download;
    link.setAttribute("aria-label", record.date + " " + link.download);
    label.textContent = record.playerData ? "玩家信息" : capacity(record.bytes);
  }
  if (day !== undefined) link.append(String(day));
  link.append(label);
  return link;
}

function monthCard(year,month,days,today) {
  const section = document.createElement("section");
  section.className = "month";
  // Independent, repeatable choices keep each sheet steady across directory refreshes.
  const seed = (year * 31 + month * 17) * 137;
  section.style.setProperty("--paper", `url("materials/paper-${seed % 3}.webp")`);
  section.style.setProperty("--tilt", ((seed % 9) - 4) * 0.07 + "deg");
  section.style.setProperty("--shift", ((Math.floor(seed / 5) % 5) - 2) + "px");
  const sheet = document.createElement("div");
  sheet.className = "sheet";
  // Each complete year has eight clean sheets, two faint marks, one nick and one small fold.
  const wear = (month * 5 + year) % 12;
  if (wear === 0) {
    sheet.classList.add("folded");
    sheet.style.setProperty("--corner", `url("materials/edge-${Math.floor(seed / 7) % 3}.webp")`);
  } else if (wear === 1) {
    sheet.classList.add("nicked");
  } else if (wear === 2 || wear === 7) {
    sheet.classList.add("marked");
    sheet.style.setProperty("--mark-x", 16 + seed % 67 + "%");
  }
  const title = document.createElement("h3");
  const number = document.createElement("b");
  number.textContent = month;
  title.append(number, "月");
  const grid = document.createElement("div");
  grid.className = "grid";
  for (const name of "一二三四五六日") {
    const cell = document.createElement("span");
    cell.className = "weekday"; cell.textContent = name; grid.append(cell);
  }
  const offset = (new Date(Date.UTC(year,month-1,1)).getUTCDay()+6)%7;
  const end = new Date(Date.UTC(year,month,0)).getUTCDate();
  for (let day=1;day<=end;day++) {
    const key = [year,String(month).padStart(2,"0"),String(day).padStart(2,"0")].join("-");
    const records = days.get(key) || [];
    let cell;
    if (records.length === 1) cell = fileCell(records[0],day);
    else if (records.length === 2 && records.some(r=>r.playerData) && records.some(r=>!r.playerData)) {
      cell = document.createElement("div");
      cell.className = "day split-day";
      cell.append(fileCell(records.find(r=>!r.playerData),day), fileCell(records.find(r=>r.playerData)));
    } else if (records.length) {
      cell = document.createElement("div"); cell.className="multi";
      cell.append(...records.map(r=>fileCell(r,day)));
    } else {
      cell = document.createElement("span"); cell.className = "day"; cell.textContent = day;
    }
    if (key === today) {
      cell.classList.add("today");
      cell.setAttribute("aria-current","date");
    }
    if (day === 1) cell.style.gridColumnStart = offset+1;
    grid.append(cell);
  }
  sheet.append(title, grid);
  section.append(sheet);
  return section;
}

let midnightTimer;
function render() {
  const today = beijingDay(Date.now());
  clearTimeout(midnightTimer);
  midnightTimer = setTimeout(render, Date.parse(today+"T00:00:00+08:00") + 86400000 - Date.now());
  const selected = sourceLinks.some(link=>link.hash===location.hash) ? location.hash : "#create-cn";
  for (const link of sourceLinks) {
    if (link.hash === selected) link.setAttribute("aria-current","page");
    else link.removeAttribute("aria-current");
  }
  const data = entries(selected.slice(1));
  const days = new Map();
  for (const row of data) {
    if (row.date === today && row.removed) continue;
    if (!days.has(row.date)) days.set(row.date,[]);
    days.get(row.date).push(row);
  }
  const content = document.createDocumentFragment();
  if (data.length) {
    const start = data[0].date.slice(0,7);
    const latest = data.at(-1).date;
    const active = listings.has(selected.slice(1)+"-archive");
    const end = (active && today > latest ? today : latest).slice(0,7);
    let grid;
    for (let year=Number(end.slice(0,4)); year>=Number(start.slice(0,4));year--) {
      const group = document.createElement("section"); group.className = "year";
      const heading = document.createElement("h2");
      const plate = document.createElement("span");
      plate.textContent = year+"年";
      heading.append(plate);
      grid = document.createElement("div"); grid.className = "months";
      for (let month=12;month>=1;month--) {
        const key = year+"-"+String(month).padStart(2,"0");
        if (key>=start && key<=end) grid.append(monthCard(year,month,days,today));
      }
      group.append(heading,grid);content.append(group);
    }
  }
  document.getElementById("years").replaceChildren(content);
}

async function reloadDirectory(dir) {
  const response = await fetch("/"+dir+"/",{cache:"no-cache"});
  if (!response.ok) throw Error(dir);
  const doc = new DOMParser().parseFromString(await response.text(),"text/html");
  const list = doc.querySelector("pre");
  if (!list || !doc.title.includes("/"+dir+"/")) throw Error(dir);
  const server = dir.startsWith("create-cn-") ? "create-cn" : "train-cn";
  const names = [...list.querySelectorAll("a[href]")].map(a=>a.getAttribute("href"))
    .filter(name=>name.startsWith(server+"_world_") && /^(?:create|train)-cn_world_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}\.zip$/.test(name));
  const rows = [];
  for (const name of names) {
    if (!byteCache.has(name)) {
      const head = await fetch("/"+dir+"/"+name,{method:"HEAD"});
      const length = head.headers.get("content-length");
      if (!head.ok || !length || !/^\d+$/.test(length)) throw Error(name);
      byteCache.set(name,Number(length));
    }
    rows.push([name,byteCache.get(name)]);
  }
  listings.set(dir,rows);
}
addEventListener("hashchange",render);
render();
if (!offline) Promise.allSettled([...listings.keys()].map(reloadDirectory)).then(render);
