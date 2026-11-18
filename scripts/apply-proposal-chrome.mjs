// Applies each proposal's own header/footer ("chrome") from scripts/proposal-chrome/<id>/
// to both copies: examples/aionsite/<entry dir> and public/style-examples/<id>.
// Each folder holds header.html, footer.html, chrome.css and chrome.js. Safe to re-run.
// Usage: node scripts/apply-proposal-chrome.mjs [propuesta-1 propuesta-2 ...]
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalog = JSON.parse(fs.readFileSync(path.join(root, "examples/aionsite/catalog.json"), "utf8"));
const srcRoot = path.join(root, "scripts/proposal-chrome");
const wanted = process.argv.slice(2);
const ids = wanted.length ? wanted : fs.readdirSync(srcRoot).filter((name) => fs.statSync(path.join(srcRoot, name)).isDirectory());

// `target` (optional, from config.json) names the original element to replace when it is
// not the first <header>/<footer>, e.g. { "open": "<nav class=\"main\">", "tag": "nav" }.
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const swap = (html, slot, replacement, target) => {
  const marked = new RegExp(`<!--chrome:${slot}-->[\\s\\S]*?<!--/chrome:${slot}-->`);
  const block = `<!--chrome:${slot}-->${replacement}<!--/chrome:${slot}-->`;
  if (marked.test(html)) return html.replace(marked, () => block);
  const original = target
    ? new RegExp(`${escape(target.open)}[\\s\\S]*?</${target.tag}>`)
    : new RegExp(`<${slot}[\\s>][\\s\\S]*?</${slot}>`);
  if (!original.test(html)) throw new Error(`No ${target ? target.open : `<${slot}>`} found`);
  return html.replace(original, () => block);
};

for (const id of ids) {
  const item = catalog.proposals.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown proposal ${id}`);
  const src = path.join(srcRoot, id);
  const header = fs.readFileSync(path.join(src, "header.html"), "utf8").trim();
  const footer = fs.readFileSync(path.join(src, "footer.html"), "utf8").trim();
  const configFile = path.join(src, "config.json");
  const config = fs.existsSync(configFile) ? JSON.parse(fs.readFileSync(configFile, "utf8")) : {};
  const dirs = [path.join(root, "public/style-examples", id), path.dirname(path.join(root, "examples/aionsite", item.entry))];

  for (const dir of dirs) {
    const file = path.join(dir, "proposal.html");
    let html = fs.readFileSync(file, "utf8");
    html = swap(html, "header", header, config.header);
    html = swap(html, "footer", footer, config.footer);
    if (!html.includes('href="chrome.css"')) html = html.replace("</head>", '<link rel="stylesheet" href="chrome.css"></head>');
    if (!html.includes('src="chrome.js"')) html = html.replace("</body>", '<script src="chrome.js" defer></script></body>');
    fs.writeFileSync(file, html);
    fs.copyFileSync(path.join(src, "chrome.css"), path.join(dir, "chrome.css"));
    fs.copyFileSync(path.join(src, "chrome.js"), path.join(dir, "chrome.js"));
    console.log(`${id}: ${path.relative(root, dir)}`);
  }
}
