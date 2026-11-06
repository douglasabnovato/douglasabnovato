# MVP — critérios

> Avaliação de 02/11/2026 com os mesmos 12 critérios usados no `movies`. Revista em 06/11/2026 (ciclo de 03/11/2026, PR #51). Este repositório é a página de perfil do GitHub, não uma aplicação.

**Nível:** Estudo (N1). É uma página de perfil servida pelo GitHub, sem hospedagem própria nem usuário de produto; por isso os critérios 5 e 7 ficam "Não se aplica (N1)" e saem do denominador.

**Resultado:** 7 de 10 critérios aplicáveis atendidos (1, 2, 4, 6, 8, 9 e 11) e 3 parciais (3, 10 e 12). **Finalizado: sim** — os 3 parciais dependem do responsável, e cada um tem issue com o rótulo `depende-do-responsavel`: #44 (3), #45 (10) e #46 (12).

| # | Critério | Como verificar | Situação em 06/11/2026 (evidência) |
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
| 10 | Entrega confiável | Publicação só depois de CI verde | Parcial: CI nos PRs para a `master` e `developer/**`; a `master` não é protegida, conferido pela API em 06/11/2026 (#45) |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 6 testes do verificador e conferência do README e do portfólio no CI (PR #51) |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Parcial: o cargo, os marcos e os selos "Escrevendo código" dependem de confirmação do responsável (#46) |

## Revisão de 02/11/2026

**Hipótese (proposta, sem validação):** se o perfil levar a um portfólio com projetos no ar em 1 clique, quem avalia abre ao menos 1 projeto.

**Fora do MVP (proposta):** cartão de estatísticas, contribuição externa e organizações, registrados em `docs/`.
