// Confere o README do perfil: estrutura, texto alternativo, link do portfólio e links externos.
// Uso: node scripts/verificar-readme.mjs [--rede]
// Sem --rede, só confere o arquivo. Com --rede, o portfólio precisa responder 200
// e os outros links são listados com o status, sem bloquear (serviços de terceiros oscilam).
import fs from "node:fs";

export const PORTFOLIO = "https://douglasabnovato-dev.vercel.app";
const GENERICO = /^(badge|imagem|image|foto|screenshot|post|medium post \d+|img[\w-]*\.\w+)$/i;

export function verificar(s, existe = fs.existsSync) {
  const erros = [];
  const n = (r) => (s.match(r) || []).length;
  if (n(/<div\b/g) !== n(/<\/div>/g)) erros.push("div desbalanceada");
  if (n(/<table>/g) !== n(/<\/table>/g)) erros.push("tabela desbalanceada");
  for (const m of s.matchAll(/<img\b[^>]*>/g)) {
    const alt = m[0].match(/alt="([^"]*)"/);
    if (!alt) erros.push("imagem sem alt: " + m[0]);
    else if (GENERICO.test(alt[1].trim()) || alt[1].trim() === "") erros.push("alt genérico: " + alt[1]);
  }
  for (const m of s.matchAll(/!\[([^\]]*)\]\(/g)) {
    if (!m[1].trim() || GENERICO.test(m[1].trim())) erros.push("alt genérico em Markdown: " + m[1]);
  }
  for (const m of s.matchAll(/<a\b[^>]*>/g)) {
    if (/target="_blank"/.test(m[0]) && !/rel="[^"]*noopener/.test(m[0])) erros.push("link sem rel=noopener: " + m[0]);
  }
  // Fluxo principal: o portfólio a 1 clique, logo no começo do perfil
  const inicio = s.split("\n").slice(0, 10).join("\n");
  if (!inicio.includes(`](${PORTFOLIO}`)) erros.push("link do portfólio fora das 10 primeiras linhas");
  for (const f of ["docs/contribuicao-externa.md", "docs/organizacoes.md", "docs/MVP.md", "docs/PLANO-DE-ACAO.md"]) {
    if (!existe(f)) erros.push("arquivo ausente: " + f);
  }
  return erros;
}

export function links(s) {
  const urls = new Set();
  for (const m of s.matchAll(/href="(https:[^"]+)"/g)) urls.add(m[1]);
  for (const m of s.matchAll(/\]\((https:[^)\s]+)\)/g)) urls.add(m[1]);
  return [...urls];
}

async function status(url) {
  try {
    const r = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000) });
    return r.status;
  } catch (e) {
    return "falha: " + e.message;
  }
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}` || process.argv[1]?.endsWith("verificar-readme.mjs")) {
  const s = fs.readFileSync("README.md", "utf8");
  const erros = verificar(s);
  if (process.argv.includes("--rede")) {
    const p = await status(PORTFOLIO);
    if (p !== 200) erros.push(`portfólio respondeu ${p}`);
    for (const u of links(s)) console.log(`${await status(u)}\t${u}`);
  }
  if (erros.length) {
    console.error(erros.join("\n"));
    process.exit(1);
  }
  console.log("README conferido.");
}
