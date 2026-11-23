## O que muda
<!-- Uma ou duas frases: o que este PR entrega e para quem. -->

Fecha #

**KPI que move:** <!-- ex.: CI verde, Lighthouse, % do MVP; ou "nenhum" -->

**Tipo:** <!-- página/tela · API/serviço · CLI/script · só documentação · infraestrutura/CI -->

## Como conferir
<!-- Comandos e passos para quem revisa reproduzir. -->
1.

## Checklist de UX, UI e QA
Marque o que foi conferido. Se um item não se aplica (API, CLI, só documentação), troque a caixa por **N/A** e diga o motivo na mesma linha.

### UX: a tarefa funciona para quem usa?
- [ ] A tarefa principal da tela é feita em até 3 passos
- [ ] Os textos são claros, sem jargão, e os botões dizem o que fazem
- [ ] Erro, vazio e carregando têm resposta clara na tela
- [ ] As heurísticas de Nielsen foram revistas no que mudou (visibilidade do estado, prevenção de erro, consistência)

### UI: a tela está consistente e acessível?
- [ ] Usa os tokens de design do projeto (cor, tipografia, espaço), sem valor solto
- [ ] Responsivo de 360 px a 1440 px, sem rolagem horizontal
- [ ] Contraste WCAG AA
- [ ] Estados de hover, foco visível e carregando

### QA: está garantido?
- [ ] Testes passando no CI (sem teste pulado)
- [ ] Lighthouse ≥ 90 em desempenho, acessibilidade e SEO nas páginas tocadas
- [ ] axe sem violação grave (critical ou serious)
- [ ] Links funcionando
- [ ] Nada quebrou nas outras páginas ou rotas

## Evidências
<!-- Prints em 360 px e 1440 px quando há tela; a saída dos testes, do Lighthouse e do axe, com a data. -->

| Tamanho | Antes | Depois |
|---|---|---|
| 360 px | | |
| 1440 px | | |

## Revisão
- [ ] Quem revisa deixou um comentário dizendo o que conferiu antes do merge
