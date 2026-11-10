# MVP — critérios

> Fonte única do estado. Tabela atual de 10/11/2026 (ciclo da faixa de 90%; decisões D1 a D7 em `engenharia/decisoes/2026-11-10-ciclo-faixa-90.md`). As anteriores estão em "Histórico". Este repositório é a página de perfil do GitHub, não uma aplicação.

**Nível:** Estudo (N1). É uma página de perfil servida pelo GitHub, sem hospedagem própria nem usuário de produto; por isso os critérios 5 e 7 ficam "Não se aplica (N1)" e saem do denominador.

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

## Hipótese e escopo

**Hipótese (meta decidida pelo coordenador em 10/11/2026, decisão D1, revisável):** se o perfil levar a um portfólio com projetos no ar em 1 clique, quem avalia abre ao menos 1 projeto.

**Fora do MVP:** cartão de estatísticas, contribuição externa e organizações, registrados em `docs/`; teste com uma pessoa de fora, que é validação de produto (#44).

## Histórico

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
