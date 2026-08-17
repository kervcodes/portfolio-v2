// Post-build step: renders every known route to static HTML so crawlers and
// tools that only fetch raw HTML (no JS execution) see real content instead
// of the empty `<div id="root">` shell. Runs after both the client build
// (dist/) and the SSR build (dist-ssr/) — see package.json's "build" script.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "../dist-ssr/entry-server.js";
import { POSTS } from "../src/data/posts.js";
import { PROJECTS } from "../src/data/projects.js";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

const routes = [
  "/",
  "/sprint",
  "/twin",
  ...POSTS.map((p) => `/posts/${p.slug}`),
  ...PROJECTS.map((p) => `/projects/${p.slug}`),
];

// React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree to the
// front of the SSR string (see entry-server.jsx) rather than into a real
// <head> — renderToString only ever sees the App fragment, not a document.
// Peel those leading tags off here and use them to replace the template's
// default <title>+<meta description> pair.
function splitHead(html) {
  const leadingTagRe = /^\s*(?:<title>.*?<\/title>|<meta[^>]*\/?>|<link[^>]*\/?>)/s;
  let head = "";
  let body = html;
  let match;
  while ((match = body.match(leadingTagRe))) {
    head += match[0].trim();
    body = body.slice(match[0].length);
  }
  return { head, body };
}

function renderPage(url) {
  const { html } = render(url);
  const { head, body } = splitHead(html);

  let page = template;
  if (head) {
    page = page.replace(
      /<title>.*?<\/title>\s*<meta\s+name="description"[^>]*\/?>/s,
      head
    );
  }

  return page.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

for (const url of routes) {
  const page = renderPage(url);
  const outPath =
    url === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, url.slice(1), "index.html");

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, page);
  console.log(`prerendered ${url} -> ${path.relative(root, outPath)}`);
}

// Static-host convention: Vercel serves dist/404.html for unmatched paths
// when no rewrite intercepts first. Rendered from the app's own catch-all
// route so it carries the same NotFound markup as client-side 404s.
fs.writeFileSync(
  path.join(distDir, "404.html"),
  renderPage("/__prerender_404__")
);
console.log("prerendered 404 -> dist/404.html");

fs.rmSync(ssrDir, { recursive: true, force: true });
