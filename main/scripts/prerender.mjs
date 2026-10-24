import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const templatePath = path.join(root, "dist/index.html");
const bundlePath = path.join(root, "dist-ssr/entry-server.js");

const template = await readFile(templatePath, "utf8");
const { render } = await import(pathToFileURL(bundlePath).href);
const appHtml = render();
const marker = '<div id="root" style="width: 100vw;"></div>';

if (!template.includes(marker)) {
  throw new Error("Could not find the root marker in dist/index.html");
}

await writeFile(templatePath, template.replace(marker, `<div id="root" style="width: 100vw;">${appHtml}</div>`));
console.log("Prerendered dist/index.html");
