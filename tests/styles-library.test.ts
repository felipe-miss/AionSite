import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import catalog from '../examples/aionsite/catalog.json';
import { styleDirections } from '../src/data/style-directions';
import { getStylePrompts } from '../src/lib/style-prompts';
import { managedRoute, resolvePageHref, validateSitePages, sitePages } from '../src/lib/site-pages';

test('style URLs retain old redirects and use the most specific nested route', () => {
  validateSitePages(sitePages, sitePages);
  for (const item of styleDirections) {
    const slug = item.route.split('/').filter(Boolean).at(-1)!;
    assert.equal(resolvePageHref(`/${slug}/?ref=lab#inicio`), `${item.route}?ref=lab#inicio`);
    assert.deepEqual(managedRoute(`/${slug}/`), { action: 'redirect', path: item.route });
    assert.deepEqual(managedRoute(item.route), { action: 'rewrite', path: `/${slug}/` });
    assert.ok(existsSync(path.join('public/style-examples/style-thumbnails', `${slug}.png`)));
  }
  assert.equal(resolvePageHref('/estilos/arkkhe-extra/'), '/estilos/arkkhe-extra/');
});

test('all proposals retain editable originals and public preview assets', () => {
  assert.ok(catalog.proposals.length >= 9);
  for (const item of catalog.proposals) {
    assert.ok(existsSync(path.join('examples/aionsite', item.entry)));
    assert.ok(existsSync(path.join('public/style-examples', item.id, 'proposal.html')));
    assert.equal(resolvePageHref(item.viewPath), item.viewPath);
  }
});

test('each direction has a distinct internal prompt and a safe workflow', () => {
  const prompts = getStylePrompts();
  assert.equal(prompts.length, styleDirections.length + catalog.proposals.length);
  assert.equal(new Set(prompts.map((item) => item.id)).size, styleDirections.length + catalog.proposals.length);
  assert.equal(new Set(prompts.map((item) => item.prompt)).size, styleDirections.length + catalog.proposals.length);
  for (const item of prompts) {
    assert.ok(item.prompt.startsWith('$aionsite-demo'));
    assert.ok(!item.prompt.includes('undefined'));
    assert.match(item.prompt, /No publiques ni envíes mensajes/);
  }
});
