# MVP — critérios

> Avaliação de 02/11/2026 com os mesmos 12 critérios usados no `movies`. Este repositório é a página de perfil do GitHub, não uma aplicação, por isso vários critérios valem de forma limitada.

| # | Critério | Como verificar | Situação |
|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: apresentar quem é o responsável a quem avalia o perfil |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: proposta abaixo |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: o link do portfólio existe; pessoa de fora não testou |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: lista abaixo |
| 5 | Medição de uso | A métrica principal é coletada | Não atende: o GitHub não dá essa medida em um perfil |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Parcial: o cartão de estatísticas saiu porque o serviço caía; os selos dependem de serviço externo |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica: quem serve a página é o GitHub |
| 8 | Acessibilidade básica | Lighthouse e teclado | Parcial: selos com texto alternativo; não medido |
| 9 | Segurança e conformidade | Riscos decididos; termos cumpridos | Atende: sem segredo no repositório, conferido em `README.md` e no workflow |
| 10 | Entrega confiável | Publicação só depois de CI verde | Parcial: o GitHub publica ao mesclar; a `master` não é protegida |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Parcial: o CI confere estrutura e links |
| 12 | Documentação honesta | Qualquer pessoa roda o projeto, e os números estão certos | Parcial: o cargo de CTO e os marcos dependem de confirmação do responsável |

## Revisão de 02/11/2026

**Hipótese (proposta, sem validação):** se o perfil levar a um portfólio com projetos no ar em 1 clique, quem avalia abre ao menos 1 projeto.

**Fora do MVP (proposta):** cartão de estatísticas, contribuição externa e organizações, registrados em `docs/`.
