// Testes do verificador do README (node --test, sem dependências).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { verificar, links, titulos, PORTFOLIO } from "./verificar-readme.mjs";

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

test("lista as imagens do repositório em src e srcset", () => {
  const raw = "https://raw.githubusercontent.com/u/u/output";
  const s = `<source srcset="${raw}/a-dark.svg" /><img alt="Animação" src="${raw}/a.svg" /><img alt="Selo" src="https://img.shields.io/x" />`;
  assert.deepEqual(links(s), [`${raw}/a-dark.svg`, `${raw}/a.svg`]);
});

test("recusa título que pula nível", () => {
  assert.match(verificar(base + "\n### Seção\n", sempre).join(), /pula de h1 para h3/);
  assert.deepEqual(titulos("# A\n## B\n### C\n## D\n"), []);
  assert.deepEqual(titulos("# A\r\n  ## B\r\n"), []);
});

test("exige um único h1 e ignora # dentro de bloco de código", () => {
  assert.match(titulos("# A\n# B\n").join(), /1 título h1, achado 2/);
  assert.match(titulos("## A\n").join(), /primeiro título não é h1/);
  assert.deepEqual(titulos("# A\n```\n#### comentário\n```\n## B\n"), []);
});
