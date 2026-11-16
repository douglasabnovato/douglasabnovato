// Fluxo principal (critério 3) e acessibilidade (critério 8) do perfil.
// O README desta branch é renderizado pela API de Markdown do GitHub, a mesma da página de perfil.
// O axe roda sobre esse HTML, sem o CSS do GitHub: contraste e tema da página são do GitHub.
import fs from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const PORTFOLIO = 'https://douglasabnovato-dev.vercel.app';
const ANIMACAO = 'https://raw.githubusercontent.com/douglasabnovato/douglasabnovato/output/pacman-contribution-graph';

let html;
async function renderizarReadme() {
  if (html) return html;
  const cabecalhos = { Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' };
  if (process.env.GITHUB_TOKEN) cabecalhos.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const resposta = await fetch('https://api.github.com/markdown', {
    method: 'POST',
    headers: cabecalhos,
    body: JSON.stringify({ text: fs.readFileSync('README.md', 'utf8'), mode: 'gfm', context: 'douglasabnovato/douglasabnovato' }),
  });
  expect(resposta.ok, `API de Markdown respondeu ${resposta.status}`).toBe(true);
  html = await resposta.text();
  return html;
}

async function abrirPerfil(page) {
  const corpo = await renderizarReadme();
  await page.setContent(
    `<!doctype html><html lang="pt-BR"><head><title>Perfil do GitHub (README renderizado)</title></head><body><main>${corpo}</main></body></html>`,
  );
}

// axe sem violações nas regras WCAG A e AA
async function semViolacoes(page) {
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
}

test('do perfil ao portfólio em 1 clique, com axe sem violações', async ({ page }) => {
  await abrirPerfil(page);
  await semViolacoes(page);

  // O portfólio é o primeiro link do perfil
  const primeiro = page.locator('main a[href]').first();
  await expect(primeiro).toHaveAttribute('href', new RegExp(`^${PORTFOLIO}/?$`));
  await expect(primeiro).toBeVisible();

  const [resposta] = await Promise.all([page.waitForNavigation(), primeiro.click()]);
  expect(resposta?.status()).toBe(200);
  await expect(page).toHaveURL(new RegExp(`^${PORTFOLIO}`));
  await expect(page.locator('body')).not.toBeEmpty();
});

test('só com o teclado: o primeiro Tab chega ao portfólio e o Enter abre', async ({ page }) => {
  await abrirPerfil(page);
  await page.keyboard.press('Tab');
  const focado = await page.evaluate(() => document.activeElement?.getAttribute('href'));
  expect(focado).toMatch(new RegExp(`^${PORTFOLIO}/?$`));

  const [resposta] = await Promise.all([page.waitForNavigation(), page.keyboard.press('Enter')]);
  expect(resposta?.status()).toBe(200);
  await expect(page).toHaveURL(new RegExp(`^${PORTFOLIO}`));
});

test('com os serviços de imagem fora do ar, o perfil segue legível e o portfólio a 1 clique', async ({ page }) => {
  // Simula a queda de selos, cartões do Medium e animação: toda imagem falha (inclusive pelo proxy camo do GitHub)
  await page.route('**/*', (rota) => (rota.request().resourceType() === 'image' ? rota.abort() : rota.continue()));
  await abrirPerfil(page);

  const imagens = page.locator('main img');
  expect(await imagens.count()).toBeGreaterThan(0);
  await expect.poll(() => imagens.evaluateAll((lista) => lista.every((img) => img.complete && img.naturalWidth === 0))).toBe(true);
  // Cada imagem quebrada mostra um texto que diz o que era
  const alts = await imagens.evaluateAll((lista) => lista.map((img) => img.alt.trim()));
  expect(alts.filter((alt) => alt === '')).toEqual([]);
  await expect(page.getByAltText('Badge: LinkedIn')).toBeVisible();

  const primeiro = page.locator('main a[href]').first();
  await expect(primeiro).toHaveAttribute('href', new RegExp(`^${PORTFOLIO}/?$`));
  await expect(primeiro).toBeVisible();
});

// A animação tem versão clara e escura (<picture> com prefers-color-scheme). É a única parte do perfil que muda com o tema.
for (const [tema, arquivo] of [['light', `${ANIMACAO}.svg`], ['dark', `${ANIMACAO}-dark.svg`]]) {
  test.describe(`tema ${tema}`, () => {
    test.use({ colorScheme: tema });
    test(`a animação usa a versão do tema ${tema}`, async ({ page }) => {
      await abrirPerfil(page);
      const animacao = page.getByAltText(/^Contribuição Pacman/);
      await expect(animacao).toBeVisible();
      await expect.poll(() => animacao.evaluate((img) => img.currentSrc)).toBe(arquivo);
    });
  });
}
