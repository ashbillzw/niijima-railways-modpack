const $ = selector => document.querySelector(selector);
const nav = $("#groups"), dialog = $("#edit");
let cards = $("#cards");
const palette = ["#aa512d", "#976519", "#397656", "#2f7880", "#645ba3", "#a05273",
  "#426daa", "#82702f", "#886287", "#277979", "#705395", "#8c6549", "#4b686f"];
let board, selected, editing, dragging, busy = false;
const key = group => group.path.join(" / ");
const color = group => palette[board.groups.indexOf(group) % palette.length];
function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function clearDrop() {
  document.querySelectorAll(".target").forEach(node => node.classList.remove("target"));
}
function dropZone(node, group, before = null) {
  node.addEventListener("dragover", event => {
    if (dragging == null || busy) return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    clearDrop();
    node.classList.add("target");
  });
  node.addEventListener("dragleave", event => {
    if (!node.contains(event.relatedTarget)) node.classList.remove("target");
  });
  node.addEventListener("drop", event => {
    if (dragging == null) return;
    event.preventDefault();
    event.stopPropagation();
    const id = dragging;
    dragging = null;
    clearDrop();
    if (id !== before) persist({action: "move", id, group: group.id, before}, key(group));
  });
}
function openEditor(card) {
  editing = card;
  $("#wording").value = card.text;
  $("#destination").replaceChildren(...board.groups.map(group => {
    const option = el("option", key(group));
    option.value = group.id;
    option.selected = group.id === card.group;
    return option;
  }));
  dialog.querySelector(".error").textContent = "";
  dialog.showModal();
}
function heading(text) {
  const first = text.split("\n")[0];
  if (first.startsWith("**")) return first.split("**")[1];
  return first.split(/[。：]/)[0];
}
function render() {
  nav.replaceChildren();
  let stage = "";
  const active = board.groups.find(group => key(group) === selected) || board.groups[0];
  selected = key(active);
  for (const group of board.groups) {
    if (stage !== group.path[0]) {
      stage = group.path[0];
      if (group.path.length > 1) nav.append(el("h3", stage));
    }
    const button = el("button", group.path.at(-1), "category-link");
    button.style.setProperty("--accent", color(group));
    if (group.id === active.id) button.setAttribute("aria-current", "true");
    button.onclick = () => { selected = key(group); render(); };
    dropZone(button, group);
    nav.append(button);
  }
  $("#pane").style.setProperty("--accent", color(active));
  $("#category").textContent = active.path.at(-1);
  const list = cards.cloneNode(false);
  for (const card of board.cards.filter(c => c.group === active.id)) {
    const li = el("li", undefined, "card");
    const grip = el("span", "⠿", "grip");
    grip.setAttribute("aria-hidden", "true");
    const check = el("input");
    check.type = "checkbox";
    check.checked = card.done;
    const title = heading(card.text);
    check.setAttribute("aria-label", "标记完成：" + title);
    check.title = "完成待归档";
    check.onchange = async () => {
      check.checked = card.done;
      if (await persist({action: "check", id: card.id, done: !card.done}, selected))
        cards.querySelector('[data-id="' + card.id + '"] input')?.focus({preventScroll: true});
    };
    const edit = el("button", title, "task");
    edit.title = card.text;
    edit.setAttribute("aria-label", "编辑：" + title);
    edit.onclick = () => openEditor(card);
    li.draggable = true;
    li.dataset.id = card.id;
    li.classList.toggle("done", card.done);
    li.ondragstart = event => {
      dragging = card.id;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(card.id));
      li.classList.add("moving");
    };
    li.ondragend = () => { dragging = null; clearDrop(); li.classList.remove("moving"); };
    dropZone(li, active, card.id);
    li.append(grip, check, edit);
    list.append(li);
  }
  // The list includes its empty space so dropping after the final card also works.
  dropZone(list, active);
  cards.replaceWith(list);
  cards = list;
}
async function persist(change, category) {
  if (busy) return false;
  busy = true;
  const error = dialog.open ? dialog.querySelector(".error") : $("#error");
  error.textContent = "";
  try {
    const response = await fetch("/api/board", {method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...change, revision: board.revision})});
    if (!response.ok) throw response;
    board = await response.json();
    selected = category;
    render();
    return true;
  } catch (failure) {
    error.textContent = failure.status === 409 ? "清单已更新，请刷新后重试" : "保存失败，请重试";
    return false;
  } finally { busy = false; }
}
$("#cancel").onclick = () => dialog.close();
dialog.querySelector("form").onsubmit = async event => {
  event.preventDefault();
  const target = board.groups.find(group => group.id === Number($("#destination").value));
  if (await persist({action: "edit", id: editing.id, text: $("#wording").value, group: target.id}, key(target))) dialog.close();
};
fetch("/api/board").then(async response => {
  if (!response.ok) throw response;
  board = await response.json();
  render();
}).catch(error => { $("#error").textContent = error.statusText || error.message; });
