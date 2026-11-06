// Testes do verificador do README (node --test, sem dependências).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { verificar, links, PORTFOLIO } from "./verificar-readme.mjs";

const sempre = () => true;
const base = `# Olá\n\n**Portfólio:** [site](${PORTFOLIO})\n`;

test("o README atual passa", () => {
  assert.deepEqual(verificar(fs.readFileSync("README.md", "utf8")), []);
});

test("recusa imagem sem alt e alt genérico", () => {
  const e = verificar(base + '<img src="a.svg" />\n<img src="b.svg" alt="Medium post 1" />', sempre);
  assert.equal(e.length, 2);
  assert.match(e[0], /sem alt/);
  assert.match(e[1], /genérico/);
});

test("recusa link em nova aba sem noopener", () => {
  const e = verificar(base + '<a href="https://x.com" target="_blank">x</a>', sempre);
  assert.match(e.join(), /noopener/);
});

test("exige o portfólio no começo do perfil", () => {
  const e = verificar("# Olá\n" + "\n".repeat(12) + `[site](${PORTFOLIO})`, sempre);
  assert.match(e.join(), /portfólio/);
});

test("exige os documentos do perfil", () => {
  const e = verificar(base, () => false);
  assert.match(e.join(), /docs\/MVP\.md/);
});

test("lista os links https sem repetir", () => {
  assert.deepEqual(links(base + `<a href="${PORTFOLIO}">x</a> [y](https://a.b)`), [PORTFOLIO, "https://a.b"]);
});
