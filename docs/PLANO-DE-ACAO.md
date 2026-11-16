# Plano de ação — perfil do GitHub

> Este arquivo guarda os ciclos datados a partir de 03/11/2026. O estado do MVP fica só em [`MVP.md`](MVP.md).

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
