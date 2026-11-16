# Plano de ação — perfil do GitHub

> Este arquivo guarda os ciclos datados a partir de 03/11/2026. O estado do MVP fica só em [`MVP.md`](MVP.md).

## Ciclo de 16/11/2026

> Branch `feature/2026-11-16` → `developer/sprint-2026-11-19` → `master` (o PR para a `master` fica com o responsável). A sprint de 12/11 entrou na `master` em 16/11/2026 (PR #54).

### Produto

**Problema e público.** Sem mudança: quem avalia o responsável abre o perfil e precisa chegar ao portfólio em 1 clique, sem informação errada no caminho.

**Hipótese e meta.** Sem mudança (decisão D1 de 10/11/2026): se o perfil levar a um portfólio com projetos no ar em 1 clique, quem avalia abre ao menos 1 projeto. Saberemos quando uma pessoa de fora, sem ajuda, abrir o portfólio a partir do perfil e depois um projeto (#44).

**O que a análise mostrou.**
- O critério 8 estava "Atende" sem axe nem teste de teclado no navegador, que é a evidência da régua. Volta a "Atende" só com o axe dentro do teste Playwright.
- O critério 9 estava "Atende" só pelo `npm audit`. A API de alertas do Dependabot responde 403 (alertas desligados), e a regra para esse caso está em decisão (engenharia#33): o critério fica "Parcial".
- A animação falhou no push da `master` em 16/11/2026 com 403 (#56, do responsável). O perfil segue mostrando a última animação gerada.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Imagem por tema no Markdown | O GitHub aceita `<picture>` com `<source media="(prefers-color-scheme: dark)">`. A branch `output` já gera a animação escura, que o perfil não usava | [GitHub Docs: sintaxe básica de escrita e formatação](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) |
| Action de terceiros fixada por SHA | O guia de segurança do Actions recomenda fixar actions de terceiros pelo SHA completo do commit. O `main.yml` usava `@main` com permissão de escrita (#49) | [GitHub Docs: segurança no GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions) |
| Dependabot para actions | Com `package-ecosystem: "github-actions"`, o Dependabot abre PR quando uma action fixada ganha versão nova; o SHA não envelhece sem aviso | [GitHub Docs: manter as actions atualizadas com o Dependabot](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/keeping-your-actions-up-to-date-with-dependabot) |
| axe no Playwright | O Playwright indica o `@axe-core/playwright` para rodar o axe dentro do teste de navegador | [Playwright: testes de acessibilidade](https://playwright.dev/docs/accessibility-testing) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | axe e teclado dentro do teste Playwright do perfil | Alto | Baixo | Este ciclo |
| 2 | Critério 9 em "Parcial" e issue para ligar os alertas do Dependabot | Alto | Baixo | Este ciclo e responsável |
| 3 | Fixar as actions da animação por SHA e Dependabot para actions e npm (#49) | Médio | Baixo | Este ciclo |
| 4 | Ordem dos títulos, com regra no verificador (#48) | Médio | Baixo | Este ciclo |
| 5 | Animação escura com `<picture>` | Baixo | Baixo | Este ciclo |
| 6 | `docs/DEPLOY.md` com como o perfil é publicado | Médio | Baixo | Este ciclo |
| 7 | Conferência semanal dos links (#50) | Médio | Baixo | Issue |

**Fora do escopo.** Mudar o texto do perfil, cargo, marcos e selos (#46); trocar a animação; mexer em Settings, rulesets ou permissões do Actions (#56).

### Engenharia

**Arquitetura.** Sem mudança: o `README.md` é a página; o GitHub publica a `master` sozinho. O `main.yml` gera a animação e grava na branch `output`. O `ci.yml` roda o verificador, os testes e o Playwright, que renderiza o README pela API de Markdown do GitHub.

**Riscos.**
- O teste depende da rede (API do GitHub, Vercel e serviços de selos). Tem uma nova tentativa no CI.
- O axe roda sobre o HTML que a API devolve, sem o CSS do GitHub. Contraste e tema da página são do GitHub; o teste não diz nada sobre eles.
- O SHA novo da animação só roda depois do merge na `master`, e o push da animação está negado (#56).

**Qualidade.**
- Testes: verificador com regra nova de títulos; Playwright com axe (WCAG A e AA), Tab até o portfólio e a troca da animação no tema escuro.
- Acessibilidade: o perfil não tem CSS próprio nem tema escuro próprio; só a imagem da animação muda com o tema. O axe roda no claro.
- Segurança: `npm audit --omit=dev`; nenhuma action de terceiros em branch móvel.

**Definição de pronto.** `npm test`, `node scripts/verificar-readme.mjs --rede` e `npm run test:e2e` passam; CI verde no PR; revisão independente feita; `docs/MVP.md`, README e `docs/DEPLOY.md` atualizados.

### Plano de ação

**Este ciclo executa.** Itens 1 a 6 do backlog.

**Vira issue.** Ligar os alertas do Dependabot (responsável); conferência semanal dos links (#50); trocar a `ghaction-github-pages` por versão que roda em Node 24; print do perfil no tema escuro depois do merge; demais pendências do responsável (#44, #46, #47, #56).

## Ciclo de 10/11/2026 (faixa de 90%)

> Branch `feature/2026-11-10-b` → `developer/sprint-2026-11-12` → `master` (o PR para a `master` fica com o responsável). Decisões D1 a D7 em `engenharia/decisoes/2026-11-10-ciclo-faixa-90.md`.

**Produto.** Sem mudança de problema e público. A meta da hipótese passa a ser a do ciclo (D1). O teste com uma pessoa de fora vira validação (#44).

**Engenharia.** O CI conferia o link do portfólio no texto. Agora um teste Playwright abre o README renderizado pela API de Markdown do GitHub, a mesma do perfil, e clica até o portfólio. Risco: o teste depende da rede (API do GitHub e Vercel); tem uma nova tentativa no CI.

| Item | Destino |
|---|---|
| Teste de ponta a ponta do perfil ao portfólio | Este ciclo |
| Critérios 2, 3 e 10 pelas decisões D1 a D3 | Este ciclo |
| Confirmar cargo, marcos e selos | Responsável (#46) |
| Validar com uma pessoa de fora | Responsável (#44) |

## Ciclo de 03/11/2026

> Branch `feature/2026-11-06` → `developer/sprint-2026-11-12` → `master`. Nível: Estudo (N1), porque é a página de perfil do GitHub, sem hospedagem própria nem usuário de produto. Critérios 5 e 7 = "Não se aplica (N1)"; ficam 10.

### Produto

**Problema e público.** Quem avalia o responsável (recrutadores, clientes e comunidade) abre o perfil do GitHub e precisa chegar ao portfólio em 1 clique, sem informação errada no caminho.

**Hipótese e meta.** Se o perfil levar a um portfólio com projetos no ar em 1 clique, quem avalia abre ao menos 1 projeto. A meta é proposta; o teste com pessoa de fora é do responsável (#44).

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| O que o GitHub sugere para o README de perfil | A documentação sugere "sobre mim", contribuições de que a pessoa se orgulha e onde encontrá-la nas comunidades. O perfil já tem as três partes; o que falta é confirmar o que é dito (#46) e um link de comunidade quebrado (#47) | [GitHub Docs: gerenciar o README do perfil](https://docs.github.com/pt/enterprise-server@3.9/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme) |
| Texto alternativo que descreve | Guias de acessibilidade de Markdown recusam alt genérico (como "post" ou nome de arquivo) e pedem que o alt diga o que a imagem mostra. Os cartões do Medium tinham alt "Medium post 1"; agora dizem o que são, e o verificador recusa alt genérico | [Awesome Copilot: Markdown accessibility](https://awesome-copilot.github.com/instruction/markdown-accessibility/), [Microsoft: guia de acessibilidade](https://microsoft.github.io/physical-ai-toolchain/contributing/accessibility) |
| Títulos em ordem | Os mesmos guias pedem um único título principal e níveis sem salto, porque leitores de tela navegam por títulos. O perfil pula de `#` para `###`; virou a #48 | [Awesome Copilot: Markdown accessibility](https://awesome-copilot.github.com/instruction/markdown-accessibility/) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Verificador do README com testes (alt, `noopener`, portfólio no começo, documentos, links) | Alto | Baixo | Este ciclo (PR #51) |
| 2 | Alt descritivo nos cartões do Medium e link no selo do dev.to | Médio | Baixo | Este ciclo (PR #51) |
| 3 | CI também nos PRs e pushes para `developer/**` | Alto | Baixo | Este ciclo (PR #51) |
| 4 | Teste com pessoa de fora | Alto | Baixo | Responsável (#44) |
| 5 | Proteger a `master` | Alto | Baixo | Responsável (#45) |
| 6 | Confirmar cargo, marcos e selos | Alto | Baixo | Responsável (#46) |
| 7 | Link do Discord | Médio | Baixo | Responsável (#47) |
| 8 | Ordem dos títulos | Médio | Baixo | Issue (#48) |
| 9 | Fixar as actions da animação | Médio | Baixo | Issue (#49) |
| 10 | Conferência semanal dos links | Médio | Baixo | Issue (#50) |

**Fora do escopo.** Cartão de estatísticas (saiu porque o serviço caía), novas seções, medição de visitas (o GitHub não oferece para perfil).

### Engenharia

**Arquitetura.** Um `README.md` em Markdown e HTML que o GitHub mostra no perfil. Selos do shields.io, cartões do Medium por um serviço externo e a animação gerada a cada 12 horas pelo `main.yml`, que grava na branch `output`. O `scripts/verificar-readme.mjs` confere o README; o `ci.yml` roda o verificador e os testes.

**Riscos.**
- Serviços externos (selos, cartões, animação) podem cair. O GitHub mostra o texto alternativo no lugar, por isso o alt precisa dizer o que era.
- O `main.yml` usa uma action de terceiros em `@main`, com permissão de escrita (#49).
- Sem proteção, um push direto na `master` muda o perfil sem CI (#45).

**Qualidade.**
- Testes: 6 testes `node --test` do verificador, incluindo o README atual.
- CI: confere estrutura, alt, `noopener`, portfólio nas 10 primeiras linhas e documentos; com `--rede`, o portfólio precisa responder 200 e os outros links são listados.
- Acessibilidade: todas as imagens com alt descritivo, conferido no CI.
- Segurança: sem segredo no repositório; nenhum dado pessoal novo.

**Definição de pronto.** `node --test scripts/*.test.mjs` e `node scripts/verificar-readme.mjs --rede` passam; CI verde no PR; `docs/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.**
1. Verificador do README com testes e CI em `developer/**`.
2. Alt descritivo e `noopener` nos cartões do Medium; link no selo do dev.to.
3. `MVP.md` na régua N1, com resumo e "Finalizado"; README com o estado e os próximos passos.

**Vira issue.** #44, #45, #46, #47 (responsável); #48, #49, #50 (agente).
