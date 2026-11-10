// Fluxo principal (critério 3): quem abre o perfil chega ao portfólio em 1 clique.
// O README desta branch é renderizado pela API de Markdown do GitHub, a mesma da página de perfil.
import fs from 'node:fs';
import { expect, test } from '@playwright/test';

const PORTFOLIO = 'https://douglasabnovato-dev.vercel.app';

async function renderizarReadme() {
  const cabecalhos = { Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' };
  if (process.env.GITHUB_TOKEN) cabecalhos.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const resposta = await fetch('https://api.github.com/markdown', {
    method: 'POST',
    headers: cabecalhos,
    body: JSON.stringify({ text: fs.readFileSync('README.md', 'utf8'), mode: 'gfm', context: 'douglasabnovato/douglasabnovato' }),
  });
  expect(resposta.ok, `API de Markdown respondeu ${resposta.status}`).toBe(true);
  return resposta.text();
}

test('do perfil ao portfólio em 1 clique', async ({ page }) => {
  const html = await renderizarReadme();
  await page.setContent(`<!doctype html><html lang="pt-BR"><body><main>${html}</main></body></html>`);

  // O portfólio é o primeiro link do perfil
  const primeiro = page.locator('main a[href]').first();
  await expect(primeiro).toHaveAttribute('href', new RegExp(`^${PORTFOLIO}/?$`));
  await expect(primeiro).toBeVisible();

  const [resposta] = await Promise.all([page.waitForNavigation(), primeiro.click()]);
  expect(resposta?.status()).toBe(200);
  await expect(page).toHaveURL(new RegExp(`^${PORTFOLIO}`));
  await expect(page.locator('body')).not.toBeEmpty();
});
