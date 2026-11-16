# Publicação do perfil

Este repositório não tem servidor, Pages, Render, Vercel nem Netlify. Ele é a página de perfil do GitHub.

## Como o perfil chega ao ar

1. O GitHub mostra em https://github.com/douglasabnovato o `README.md` da branch padrão (`master`) do repositório que tem o mesmo nome da conta.
2. Toda mudança entra por PR: `feature/AAAA-MM-DD` → `developer/sprint-<quinta>` → `master`. O ruleset `principal-protegida` exige PR e o job `verificar` do CI verde.
3. Quando o responsável mescla o PR da sprint na `master`, o perfil muda na hora. Não há passo manual nem segredo.

## Animação do Pac-Man

1. O workflow `Generate pacman animation` (`.github/workflows/main.yml`) roda a cada 12 horas, a cada push na `master` e pelo botão **Run workflow**.
2. Ele gera `pacman-contribution-graph.svg` (claro) e `pacman-contribution-graph-dark.svg` (escuro) e grava os dois na branch `output`, com o `GITHUB_TOKEN` do próprio Actions.
3. O README mostra a versão do tema de quem visita, com `<picture>` e `prefers-color-scheme`.
4. As actions estão fixadas por SHA. O Dependabot (`.github/dependabot.yml`) abre PR quando sai versão nova.

Se o workflow falhar, o perfil continua no ar com a última animação gravada na `output`.

## Como conferir

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://github.com/douglasabnovato
curl -s -o /dev/null -w "%{http_code}\n" https://raw.githubusercontent.com/douglasabnovato/douglasabnovato/output/pacman-contribution-graph.svg
curl -s -o /dev/null -w "%{http_code}\n" https://raw.githubusercontent.com/douglasabnovato/douglasabnovato/output/pacman-contribution-graph-dark.svg
gh run list --repo douglasabnovato/douglasabnovato --workflow main.yml --limit 3
```

As três URLs devem responder 200, e o último run do workflow deve estar verde.

## O que é do responsável

| Passo | Onde | Issue |
|---|---|---|
| Mesclar o PR da sprint na `master` | PR com o rótulo `revisao-responsavel` | — |
| Fazer o push da animação voltar a passar (403 em 16/11/2026) | Settings → Actions → General → **Workflow permissions** | #56 |
| Ligar os alertas do Dependabot | Settings → Advanced Security → **Dependabot alerts** → **Enable** | #57 |
| Mesclar os PRs de versão do Dependabot | Eles vão direto para a `master` (`target-branch`), e o merge é do responsável, com CI verde | — |
