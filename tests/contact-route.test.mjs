import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { build } from 'esbuild';

// Run the real handler with isolated mail/storage replacements; no network or data writes.
const effects = { mail: [], leads: [] };
const compiled = await build({
  entryPoints: ['app/api/contact/route.ts'], bundle: true, write: false,
  platform: 'node', format: 'cjs', packages: 'external',
  plugins: [{ name: 'isolate-contact-effects', setup(builder) {
    builder.onResolve({ filter: /^(nodemailer|@\/src\/lib\/whatsapp\/store)$/ }, args => ({ path: args.path, namespace: 'contact-test' }));
    builder.onLoad({ filter: /.*/, namespace: 'contact-test' }, args => ({ contents: args.path === 'nodemailer'
      ? 'export default {createTransport:()=>({sendMail:async mail=>{if(effects.failMail)throw new Error("simulated-mail-failure");effects.mail.push(mail);}})};'
      : 'export const recordContactFormLead=async lead=>{if(effects.failStore)throw new Error("private-store-details");effects.leads.push(lead);};', loader: 'js' }));
  } }],
});
const compiledModule = { exports: {} };
new Function('require', 'module', 'exports', 'effects', compiled.outputFiles[0].text)(createRequire(import.meta.url), compiledModule, compiledModule.exports, effects);
const { POST } = compiledModule.exports;
let requestId = 0;
const valid = { name: 'Cliente local', email: 'cliente@example.invalid', message: 'Consulta local' };
const submit = body => POST(new Request('http://localhost/api/contact', {
  method: 'POST', headers: { 'Content-Type': 'application/json', 'x-real-ip': `local-test-${++requestId}` },
  body: JSON.stringify(body),
}));

test('enforces body byte limit without trusting Content-Length', async () => {
  effects.mail.length = effects.leads.length = 0;
  for (const length of [undefined, '1']) {
    const headers = { 'Content-Type': 'application/json', 'x-real-ip': `local-test-${++requestId}` };
    if (length) headers['Content-Length'] = length;
    const response = await POST(new Request('http://localhost/api/contact', {
      method: 'POST', headers, body: JSON.stringify({ ...valid, padding: 'x'.repeat(12000) }),
    }));
    assert.equal(response.status, 413);
  }
  assert.equal(effects.mail.length, 0);
  assert.equal(effects.leads.length, 0);
});

test('rejects blank names/messages before mail or storage', async () => {
  effects.mail.length = effects.leads.length = 0;
  for (const field of ['name', 'message']) {
    for (const value of ['', '   ', '\t\r\n', '\u00a0']) {
      assert.equal((await submit({ ...valid, [field]: value })).status, 400, `${field}: ${JSON.stringify(value)}`);
    }
  }
  assert.equal(effects.mail.length, 0);
  assert.equal(effects.leads.length, 0);
});

test('counts UTF-8 bytes and accepts a body exactly at the limit', async () => {
  const baseline = JSON.stringify({ ...valid, padding: '' });
  const paddingLength = 12000 - Buffer.byteLength(baseline);
  assert.equal((await submit({ ...valid, padding: 'x'.repeat(paddingLength) })).status, 200);
  assert.equal((await submit({ ...valid, padding: 'x'.repeat(paddingLength + 1) })).status, 413);
  assert.equal((await submit({ ...valid, padding: 'é'.repeat(paddingLength) })).status, 413);
});

test('cancels an oversized chunked stream and rejects malformed JSON', async () => {
  let cancelled = false;
  const stream = new ReadableStream({
    pull(controller) { controller.enqueue(new Uint8Array(7000).fill(32)); },
    cancel() { cancelled = true; },
  });
  const request = new Request('http://localhost/api/contact', {
    method: 'POST', body: stream, duplex: 'half',
    headers: { 'x-real-ip': `local-test-${++requestId}` },
  });
  assert.equal((await POST(request)).status, 413);
  assert.equal(cancelled, true);
  assert.equal((await POST(new Request('http://localhost/api/contact', {
    method: 'POST', body: '{', headers: { 'x-real-ip': `local-test-${++requestId}` },
  }))).status, 400);
});

test('preserves valid form submission and HTML escaping', async () => {
  effects.mail.length = effects.leads.length = 0;
  const body = { ...valid, name: '<Cliente>', message: 'Sitio & SEO\nSegunda linea' };
  assert.equal((await submit(body)).status, 200);
  assert.equal(effects.mail.length, 1);
  assert.equal(effects.leads.length, 1);
  assert.match(effects.mail[0].html, /&lt;Cliente&gt;/);
  assert.match(effects.mail[0].html, /Sitio &amp; SEO/);
  assert.deepEqual(effects.leads[0], body);
});

test('retains type, email and size validation without side effects', async () => {
  effects.mail.length = effects.leads.length = 0;
  for (const body of [
    { ...valid, name: 42 }, { ...valid, message: {} },
    { ...valid, email: 'invalid' }, { ...valid, name: 'x'.repeat(101) },
    { ...valid, message: 'x'.repeat(5001) },
  ]) assert.equal((await submit(body)).status, 400);
  assert.equal(effects.mail.length, 0);
  assert.equal(effects.leads.length, 0);
});

test('does not report mail failure when only the subsequent audit fails', async () => {
  effects.mail.length = effects.leads.length = 0;
  effects.failStore = true;
  const logs = [];
  const originalError = console.error;
  console.error = (...args) => logs.push(args.join(' '));
  try {
    const response = await submit(valid);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(effects.mail.length, 1);
    assert.equal(effects.leads.length, 0);
    assert.equal(logs.length, 1);
    assert.equal(logs[0].includes('private-store-details'), false);
    assert.equal(logs[0].includes(valid.email), false);
  } finally {
    effects.failStore = false;
    console.error = originalError;
  }
});

test('never claims success or records audit when mail itself fails', async () => {
  effects.mail.length = effects.leads.length = 0;
  effects.failMail = true;
  try {
    const response = await submit(valid);
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(typeof body.error, 'string');
    assert.equal(JSON.stringify(body).includes('simulated-mail-failure'), false);
    assert.equal(body.ok, undefined);
    assert.equal(effects.mail.length, 0);
    assert.equal(effects.leads.length, 0);
  } finally {
    effects.failMail = false;
  }
  assert.equal((await submit(valid)).status, 200);
  assert.equal(effects.mail.length, 1);
  assert.equal(effects.leads.length, 1);
});
