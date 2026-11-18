import { attachmentsTooLarge, validateFeedback, uploadEndpoint, packageFeedback, uploadFeedback } from './feedback-core.js';

const query = new URLSearchParams(location.search);
const embedded = query.get('embed') === '1';

const form = document.getElementById('feedback-form');
const fields = document.getElementById('form-fields');
const submit = document.getElementById('submit');
const submitLabel = document.getElementById('submit-label');
const status = document.getElementById('submission-status');
const availability = document.getElementById('availability');
const logs = document.getElementById('logs');
const inputs = { playerId: document.getElementById('player-id'), title: document.getElementById('feedback-title'), details: document.getElementById('details'), logs };
const tabs = [...document.querySelectorAll('[role="tab"]')];
let type = 'bug';
let settings = { messages: {} };
let endpoint = null;
let busy = false;
let submitted = false;
let prepared = null;
const message = key => settings?.messages?.[key] || '';

function resizeParent() {
  if (embedded && window.parent !== window) window.parent.postMessage({ type: 'niijima-feedback-height', height: document.querySelector('.feedback-shell').getBoundingClientRect().height + 2 }, location.origin);
}
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resizeParent).observe(document.querySelector('.feedback-shell'));
window.addEventListener('resize', resizeParent);
window.addEventListener('load', resizeParent);
window.addEventListener('message', event => {
  if (event.source === window.parent && event.origin === location.origin && event.data?.type === 'niijima-feedback-measure') resizeParent();
});

function clearErrors() {
  Object.values(inputs).forEach(input => {
    input.removeAttribute('aria-invalid');
    document.getElementById(`${input.id}-error`).textContent = '';
  });
}
function dirty() {
  prepared = null;
  submitted = false;
  status.textContent = '';
  submit.disabled = !endpoint || busy;
  clearErrors();
}
function selectTab(index) {
  if (busy || type === tabs[index].dataset.kind) return;
  type = tabs[index].dataset.kind;
  tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  document.getElementById('feedback-panel').setAttribute('aria-labelledby', tabs[index].id);
  logs.required = type === 'bug';
  document.getElementById('attachment-section').hidden = type !== 'bug';
  document.getElementById('logs-optional').hidden = logs.required;
  inputs.details.placeholder = type === 'bug' ? '复现步骤、预期和实际情况' : '建议及用途';
  dirty();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(index));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index;
    selectTab(next);
    tabs[next].focus();
  });
});
form.addEventListener('input', dirty);
function updateIdWarning() {
  document.getElementById('player-id-warning').hidden = !/[^A-Za-z0-9_]/.test(inputs.playerId.value.trim());
}
inputs.playerId.addEventListener('input', updateIdWarning);
window.addEventListener('pageshow', updateIdWarning);
logs.addEventListener('change', () => {
  dirty();
  const list = document.getElementById('file-list');
  list.replaceChildren();
  list.hidden = true;
  if (attachmentsTooLarge([...logs.files], settings.limits?.maxAttachmentBytes)) {
    logs.value = '';
    logs.setAttribute('aria-invalid', 'true');
    document.getElementById('logs-error').textContent = message('tooLarge');
    return;
  }
  for (const file of logs.files) {
    const li = document.createElement('li');
    li.textContent = `${file.name} · ${(file.size / 1048576).toFixed(2)} MiB`;
    list.append(li);
  }
  list.hidden = !logs.files.length;
});

function setBusy(value) {
  busy = value;
  fields.disabled = value;
  tabs.forEach(tab => { tab.disabled = value; });
  submit.disabled = value || !endpoint || submitted;
  submitLabel.textContent = value ? message('uploading') : '提交反馈';
  form.setAttribute('aria-busy', String(value));
}

function showResult(success) {
  status.textContent = message(success ? 'success' : 'failure');
  const host = window.frameElement?.id === 'feedback-frame' ? window.parent.document : document;
  const dialog = host.importNode(document.getElementById('result-template').content.firstElementChild, true);
  dialog.querySelector('p').textContent = success ? message('successDialog') : status.textContent;
  host.body.append(dialog);
  dialog.addEventListener('close', () => dialog.remove(), { once: true });
  dialog.showModal();
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!endpoint || busy || submitted) return;
  const values = { type, playerId: inputs.playerId.value, title: inputs.title.value, details: inputs.details.value, event: (query.get('event') || '').slice(0, 80) };
  const files = type === 'bug' ? [...logs.files] : [];
  const errors = validateFeedback(values, files, settings.limits);
  clearErrors();
  for (const [key, problem] of Object.entries(errors)) {
    const input = inputs[key];
    if (!input) continue;
    input.setAttribute('aria-invalid', 'true');
    document.getElementById(`${input.id}-error`).textContent = message(problem === 'size' ? 'tooLarge' : `required_${key}`);
  }
  if (Object.keys(errors).length) { inputs[Object.keys(errors)[0]]?.focus(); return; }
  status.textContent = '';
  setBusy(true);
  try {
    if (!prepared) {
      const random = crypto.getRandomValues(new Uint32Array(4));
      const id = `${Date.now()}-${[...random].map(n => n.toString(16).padStart(8, '0')).join('')}`;
      prepared = await packageFeedback(window.JSZip, values, files, settings.limits, id, new Date().toISOString());
    }
    await uploadFeedback(endpoint, prepared);
    submitted = true;
  } catch {
    submitted = false;
  } finally { setBusy(false); }
  showResult(submitted);
});

const configURL = new URL('../config/site.json', import.meta.url);
const configController = new AbortController();
const configTimeout = setTimeout(() => configController.abort(), 8000);
try {
  const response = await fetch(configURL, { cache: 'no-store', signal: configController.signal });
  if (!response.ok) throw new Error('Site configuration unavailable');
  settings = await response.json();
  if (!settings.messages || ![settings.limits?.maxAttachmentBytes, settings.limits?.maxArchiveBytes].every(n => Number.isSafeInteger(n) && n > 0)) throw new Error('Invalid site configuration');
  logs.disabled = false;
  endpoint = uploadEndpoint(settings.uploadUrl, configURL);
  submit.disabled = !endpoint;
} catch {
  endpoint = null;
  submit.disabled = true;
} finally {
  clearTimeout(configTimeout);
  availability.textContent = endpoint ? '' : message('unavailable');
  resizeParent();
}
