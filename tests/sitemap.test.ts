import assert from 'node:assert/strict';
import test from 'node:test';
import { GET as main } from '../app/sitemap.xml/route';
import { GET as pages } from '../app/sitemap_pages.xml/route';
import { GET as blogs } from '../app/sitemap_blogs.xml/route';

const entries = (xml: string) => [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1]);
const loc = (entry: string) => entry.match(/<loc>(.*?)<\/loc>/)?.[1];

test('static pages omit untracked modification dates and stay in the main sitemap', async () => {
  const primary = entries(await main().text());
  const staticPages = entries(await pages().text());
  assert.ok(staticPages.length > 0);
  for (const entry of staticPages) {
    assert.doesNotMatch(entry, /<lastmod>/);
    const matches = primary.filter(candidate => loc(candidate) === loc(entry));
    assert.equal(matches.length, 1);
    assert.doesNotMatch(matches[0], /<lastmod>/);
  }
});

test('dated blog entries retain their dates and repeated output is stable', async () => {
  const response = main();
  assert.match(response.headers.get('Content-Type') || '', /application\/xml/);
  const xml = await response.text();
  for (const entry of entries(await blogs().text())) {
    assert.match(entry, /<lastmod>[^<]+<\/lastmod>/);
    assert.ok(xml.includes(entry));
  }
  await new Promise(resolve => setTimeout(resolve, 15));
  assert.equal(await main().text(), xml);
  const staticXml = await pages().text();
  await new Promise(resolve => setTimeout(resolve, 15));
  assert.equal(await pages().text(), staticXml);
});
