export function attachmentsTooLarge(files, maxBytes) {
  return files.reduce((sum, file) => sum + file.size, 0) > maxBytes;
}

export function validateFeedback(values, files, limits) {
  const errors = {};
  for (const key of ['playerId', 'title', 'details']) if (!values[key]?.trim()) errors[key] = 'required';
  if (!['bug', 'suggestion'].includes(values.type)) errors.type = 'invalid';
  if (values.type === 'bug' && !files.length) errors.logs = 'required';
  if (attachmentsTooLarge(files, limits.maxAttachmentBytes)) errors.logs = 'size';
  return errors;
}

export function uploadEndpoint(value, baseURL) {
  if (!value || typeof value !== 'string') return null;
  const url = new URL(value, baseURL);
  const localHTTP = url.protocol === 'http:' && ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname);
  if ((url.protocol !== 'https:' && !localHTTP) || url.username || url.password) throw new Error('Invalid upload endpoint');
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  url.searchParams.set('j', '');
  url.hash = '';
  return url;
}

export async function packageFeedback(JSZip, values, files, limits, feedbackId, createdAt) {
  if (attachmentsTooLarge(files, limits.maxAttachmentBytes)) throw new Error('attachment-size');
  const zip = new JSZip();
  const attachments = files.map((file, index) => {
    const basename = file.name.split(/[\\/]/).pop().replace(/[<>:"|?*\u0000-\u001f]/g, '_') || 'attachment';
    const path = `attachments/${String(index + 1).padStart(2, '0')}-${basename}`;
    zip.file(path, file);
    return { name: file.name, path, bytes: file.size };
  });
  const report = { schemaVersion: 1, feedbackId, createdAt, type: values.type, playerId: values.playerId.trim(), title: values.title.trim(), details: values.details.trim(), event: values.event || null, attachments };
  zip.file('feedback.json', JSON.stringify(report, null, 2));
  const bytes = await zip.generateAsync({ type: 'uint8array', compression: 'STORE' });
  if (bytes.byteLength > limits.maxArchiveBytes) throw new Error('archive-size');
  return { bytes, report, filename: `feedback-${feedbackId}.zip` };
}

export function isUploadReceipt(receipt, size) {
  return receipt?.status === 'OK' && !receipt.error && receipt.files?.length === 1 && receipt.files[0].sz === size;
}

export async function uploadFeedback(url, bundle, fetcher = fetch) {
  const body = new FormData();
  body.append('act', 'bput');
  body.append('f', new Blob([bundle.bytes], { type: 'application/zip' }), bundle.filename);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120000);
  try {
    const response = await fetcher(url, { method: 'POST', body, credentials: 'omit', redirect: 'error', signal: controller.signal });
    if (!response.ok) throw new Error(`Upload HTTP ${response.status}`);
    const receipt = await response.json();
    if (!isUploadReceipt(receipt, bundle.bytes.byteLength)) throw new Error('Invalid upload receipt');
    return receipt;
  } finally { clearTimeout(timer); }
}
