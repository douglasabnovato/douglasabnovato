# MVP — critérios

> Fonte única do estado. Tabela atual de 16/11/2026 (ciclo de 16/11/2026). As anteriores estão em "Histórico". Este repositório é a página de perfil do GitHub, não uma aplicação.

**Nível:** Estudo (N1). É uma página de perfil servida pelo GitHub, sem hospedagem própria nem usuário de produto; por isso os critérios 5 e 7 ficam "Não se aplica (N1)" e saem do denominador.

**Resumo:** 8 de 10 aplicáveis atendidos

**Finalizado:** sim — os 2 parciais dependem do responsável, e cada um tem issue com `depende-do-responsavel`: ligar os alertas do Dependabot (#57, critério 9) e confirmar cargo, marcos e selos (#46, critério 12).

Em 10/11/2026 a tabela dizia 9 de 10. Dois "Atende" não tinham a evidência da régua: o 8 não tinha axe nem teste de teclado no navegador (agora tem), e o 9 se apoiava só no `npm audit`, com os alertas do Dependabot desligados (segue "Parcial").

| # | Critério | Como verificar | Situação em 16/11/2026 (evidência) |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: apresentar quem é o responsável a quem avalia o perfil e levar ao portfólio |
| 2 | Hipótese a validar | Aposta escrita, com meta | Atende: aposta, meta e "saberemos quando" em "Hipótese e escopo" abaixo (meta da decisão D1, 10/11/2026, revisável pelo responsável) |
| 3 | Fluxo principal completo | Teste de ponta a ponta no navegador, no CI | Atende: `npm run test:e2e`, 16/11/2026: 5 testes passam. O README é renderizado pela API de Markdown do GitHub; o primeiro link do conteúdo é o portfólio, e o clique e o Enter abrem https://douglasabnovato-dev.vercel.app com 200. Roda no job `verificar` do CI |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: "Hipótese e escopo" abaixo |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1): o GitHub não dá essa medida em um perfil |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta | Atende: `npm run test:e2e`, 16/11/2026: com toda imagem bloqueada (selos, cartões do Medium, animação e proxy do GitHub), cada imagem mostra um alt não vazio (os 29 selos começam por "Badge: " e o nome), e o portfólio segue o primeiro link. Tirar um alt faz o teste falhar (conferido em 16/11/2026). Vazio e carregamento não se aplicam: o README é estático, e quem carrega a página é o GitHub |
| 7 | Desempenho aceitável | LCP até 2,5 s no celular | Não se aplica (N1): quem serve a página é o GitHub |
| 8 | Acessibilidade básica | axe e teclado | Atende: `npm run test:e2e`, 16/11/2026: axe (WCAG A e AA) sem violações no README renderizado, largura de desktop, conteúdo real; no README renderizado, o primeiro Tab foca o portfólio, com `:focus-visible` e contorno (o padrão do navegador; no perfil publicado, o foco é do GitHub e vem depois da navegação dele), e o Enter abre. Esc não se aplica: o perfil não tem diálogo nem menu. `npm test`, 16/11/2026: 9 passam, com títulos em ordem (h1, h2, h3), alt descritivo e `noopener` (#48). O perfil não tem CSS nem tema escuro próprios: o axe roda no claro; só a animação tem versão escura, e o teste confere que a imagem do tema carrega. Tirar um alt faz o axe acusar `image-alt` (conferido em 16/11/2026) |
| 9 | Segurança e conformidade | `npm audit --omit=dev` e alertas do Dependabot pela API | Parcial: `npm audit --omit=dev`, 16/11/2026: 0 vulnerabilidades (só há dependências de teste). `gh api "repos/douglasabnovato/douglasabnovato/dependabot/alerts?state=open&per_page=100"`, 16/11/2026: 403, alertas desligados; ligar é do responsável (#57), e a regra para esse caso está em decisão (engenharia#33). Sem segredo no repositório: o CI usa só o `GITHUB_TOKEN` do Actions. As actions da animação estão fixadas por SHA, com Dependabot de versões (#49) |
| 10 | Entrega confiável | CI nos PRs e principal protegida | Atende: `gh api repos/douglasabnovato/douglasabnovato/rules/branches/master`, 16/11/2026: `deletion`, `non_fast_forward`, `pull_request` e `required_status_checks` com o job `verificar`. O workflow `CI` roda nos PRs para a `master` e `developer/**` |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: no job `verificar`, 9 testes do verificador (`npm test`), a conferência do README e dos links e 5 testes Playwright, sem `skip`. Run do CI [43811017927](https://github.com/douglasabnovato/douglasabnovato/actions/runs/43811017927), 16/11/2026: `# skipped 0`, "README conferido." e `5 passed` (PR #61) |
| 12 | Documentação honesta | README com comandos conferidos; link publicado só se responder hoje | Parcial: o README não tem comandos; os comandos do `docs/DEPLOY.md` foram conferidos em 16/11/2026 (as três URLs responderam 200). O cargo, os marcos e os selos "Escrevendo código" dependem de confirmação do responsável (#46) |

## Hipótese e escopo

**Hipótese (meta da decisão D1, 10/11/2026, revisável pelo responsável):** acreditamos que um perfil que leva a um portfólio com projetos no ar em 1 clique faz quem avalia abrir ao menos 1 projeto. Saberemos quando uma pessoa de fora, sem ajuda, sair do perfil, abrir o portfólio e depois um projeto, no celular e no computador (#44).

**Fora do MVP:** cartão de estatísticas, contribuição externa e organizações, registrados em `docs/`; teste com uma pessoa de fora, que é validação de produto (#44); mudar o texto do perfil sem o responsável (#46).

## Histórico

### Tabela de 10/11/2026 (ciclo da faixa de 90%; decisões D1 a D7 em `engenharia/decisoes/2026-11-10-ciclo-faixa-90.md`)

**Resumo:** 9 de 10 aplicáveis atendidos

**Finalizado:** sim — o único parcial (12) depende do responsável e tem issue com `depende-do-responsavel`: confirmar cargo, marcos e selos (#46). O teste com uma pessoa de fora saiu do MVP pela decisão D2 e virou validação de produto (#44, rótulo `validacao`).

| # | Critério | Como verificar | Situação em 10/11/2026 (evidência) |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: apresentar quem é o responsável a quem avalia o perfil e levar ao portfólio |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: meta decidida pelo coordenador em 10/11/2026 (decisão D1), revisável pelo responsável; aposta em "Hipótese e escopo" abaixo |
| 3 | Fluxo principal completo | Teste de ponta a ponta no navegador, no CI | Atende (decisão D2): `npx playwright test`, 10/11/2026: 1 teste passa. O README é renderizado pela API de Markdown do GitHub, o primeiro link é o portfólio e o clique abre https://douglasabnovato-dev.vercel.app com 200. Roda no job `verificar` do CI (PR #55) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: "Hipótese e escopo" abaixo |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1): o GitHub não dá essa medida em um perfil |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: o cartão de estatísticas saiu porque o serviço caía; se um selo ou cartão externo cair, o GitHub mostra o alt, que diz o que era (PR #51) |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1): quem serve a página é o GitHub |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: `node --test scripts/*.test.mjs`, 10/11/2026: 6 passam; todas as imagens com alt descritivo e links em nova aba com `noopener`, conferidos no CI. A ordem dos títulos segue na #48 |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Atende: `npm audit --omit=dev`, 10/11/2026: 0 vulnerabilidades (só dependência de teste). Sem segredo no repositório: o CI usa só o `GITHUB_TOKEN` do próprio Actions. A action em `@main` tem issue (#49) |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende: `gh api repos/douglasabnovato/douglasabnovato/rules/branches/master`, 10/11/2026: `deletion`, `non_fast_forward`, `pull_request` e `required_status_checks` com o job `verificar` (decisão D3) (#45) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 6 testes do verificador, conferência do README e dos links e o teste Playwright do fluxo, no job `verificar` |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Parcial: o cargo, os marcos e os selos "Escrevendo código" dependem de confirmação do responsável (#46) |

### Tabela de 06/11/2026, critério 10 revisto em 10/11/2026 (ciclo de 03/11/2026)

**Resumo:** 8 de 10 aplicáveis atendidos (1, 2, 4, 6, 8, 9, 10 e 11) e 2 parciais (3 e 12).

**Finalizado:** sim — os 2 parciais dependem do responsável, e cada um tem issue com o rótulo `depende-do-responsavel`: #44 (3) e #46 (12).

| # | Critério | Como verificar | Situação em 06/11/2026, 10 em 10/11/2026 (evidência) |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: apresentar quem é o responsável a quem avalia o perfil e levar ao portfólio |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: proposta abaixo |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: o portfólio está a 1 clique, nas 10 primeiras linhas, e responde 200 (conferido no CI); pessoa de fora não testou (#44) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: lista abaixo |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1): o GitHub não dá essa medida em um perfil |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: o cartão de estatísticas saiu porque o serviço caía; se um selo ou cartão externo cair, o GitHub mostra o alt, que agora diz o que era (PR #51) |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1): quem serve a página é o GitHub |
| 8 | Acessibilidade básica | Lighthouse e teclado | Atende: todas as imagens com alt descritivo e links em nova aba com `noopener`, conferidos no CI (PR #51). A ordem dos títulos segue na #48 |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Atende: sem segredo no repositório, conferido em `README.md` e nos workflows; a action em `@main` tem issue (#49) |
| 10 | Entrega confiável | Publicação só depois de CI verde | Atende: o workflow `CI` (job `verificar`) roda nos PRs para a `master` e `developer/**`; `gh api repos/douglasabnovato/douglasabnovato/rulesets`, 10/11/2026: ruleset `principal-protegida` ativo (exige PR, bloqueia force push e exclusão) (#45) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 6 testes do verificador e conferência do README e do portfólio no CI (PR #51) |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Parcial: o cargo, os marcos e os selos "Escrevendo código" dependem de confirmação do responsável (#46) |

### Revisão de 02/11/2026

**Hipótese (proposta, sem validação):** se o perfil levar a um portfólio com projetos no ar em 1 clique, quem avalia abre ao menos 1 projeto.

**Fora do MVP (proposta):** cartão de estatísticas, contribuição externa e organizações, registrados em `docs/`.
