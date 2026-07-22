# SPEC_007 — Favicon, defeito do acordeão, copy das skills e pastas na seção Contato

> Origem: quatro pedidos do Fernando em 2026-07-22, após o ciclo SPEC_006.

## REQUEST

Quatro ajustes: (1) favicon com fundo transparente e letras pretas; (2) corrigir o efeito de
distorção ao recolher/expandir pastas no modo lista de Skills; (3) reescrever as 43
descrições de skills para falarem do que o Fernando faz, não do conceito da tecnologia;
(4) na seção Contato, trocar o card em `div` por ícone de pasta macOS com o ícone social
sobreposto, sem rótulo de texto.

## CATEGORY

Bugfix (item 2) + Refactor de UI (itens 1 e 4) + Conteúdo (item 3).

## PROBLEM

Sintomas observáveis:

1. `public/favicon-fm.svg` desenha um retângulo de fundo `#1E1E1E` com as letras em
   `#73D7FF`. O Fernando avalia o resultado como visualmente ruim.
2. No modo lista de Skills, ao expandir uma categoria, a categoria que se recolhe apresenta
   distorção visual de escala, descrita como "estica o conteúdo" e "impressão de bug".
3. As 43 descrições de skills descrevem a tecnologia em abstrato. Exemplo literal
   (`skills.tsx`, `HTML5.html`): "HTML5 semântico, acessível e otimizado para SEO. Estrutura
   sólida como fundação de qualquer interface." Não há sujeito, não há o que o Fernando
   entregou com aquilo.
4. Em `contact.tsx:131-154`, os seis links sociais usam um card `div` com
   `rounded-2xl bg-finder-accent/5` e rótulo de texto abaixo do ícone, destoando da
   linguagem de pastas usada em About e Skills.

## CONTEXT

**Causa do item 2 (verificada por leitura de código, não por observação visual):** em
`skills.tsx:573` as categorias são um `Reorder.Group` e cada categoria é um `Reorder.Item`
(linha 582); dentro dela, `{isExpanded && <Reorder.Group>}` (linha 625) monta os arquivos.
`Reorder.Item` do framer-motion aplica animação de layout por padrão (`layout` implícito, que
o drag-reorder exige). Quando o acordeão troca de categoria, o bounding box de duas
categorias muda de altura no mesmo commit de render, e a animação de layout interpola o
tamanho da caixa, produzindo a distorção de escala do conteúdo interno.

**Assumpções declaradas:**

- **A1 (item 2, não observado visualmente):** o Browser pane desta sessão está com a aba em
  `visibilityState: hidden` e sem `requestAnimationFrame` (verificado: `document.timeline.
  currentTime` fixo em 0), portanto animações não avançam e não foi possível OBSERVAR o
  defeito nem a correção. O diagnóstico vem da leitura do código e do comportamento
  documentado do framer-motion. **A confirmação visual é do Fernando.**
- **A2 (item 2, origem):** o defeito é do desenho original (`Reorder.Item` com layout
  animation), mas o acordeão exclusivo introduzido pela SPEC_006 passou a mudar duas
  categorias por vez, ampliando a visibilidade do defeito. Registro de honestidade, não
  desculpa.
- **A3 (item 1, legibilidade):** letras pretas sobre fundo transparente ficam com contraste
  muito baixo na aba do navegador em tema escuro, que é o padrão de boa parte dos usuários.
  O pedido é executado como especificado e o risco fica declarado para decisão do Fernando.
- **A4 (item 3, veracidade):** a copy nova é ancorada apenas em fatos já publicados pelo
  Fernando no próprio repositório (`about.tsx`, `projects.tsx`, `README.md`), respeitando a
  invariante 5 do `AGENTS.md` (nenhuma alegação não verificável). As skills sem respaldo
  documental no repo (`Grok.ts`, `Antigravity.ts`, `OpenCode.ts`) recebem redação restrita ao
  papel da ferramenta dentro do harness dele, e ficam sinalizadas para revisão.
- **A5 (item 4, custo zero de rede):** o ícone de pasta do tema ativo
  (`/icons/icon-macos-folder-<tema>.webp`) já é baixado pela sidebar, então reutilizá-lo em
  Contato não adiciona requisição. Segue valendo o achado estacionado de que esses arquivos
  têm 3138x2669 px para exibição pequena.

## REQUIREMENTS

1. **Favicon:** remover o `<rect>` de fundo; letras em `#000000`; manter o desenho FM em
   paths geométricos e o peso abaixo de 2 KB.
2. **Acordeão sem distorção:** eliminar a interpolação de tamanho na troca de categoria,
   preservando o drag-and-drop de reordenação e a UI da árvore.
3. **Copy das skills:** reescrever as 43 descrições em primeira pessoa, dizendo o que o
   Fernando faz e onde aplicou, sem inventar fato e sem citar versão de framework (segue a
   edição recente do Fernando, que trocou "React 19" por "React").
4. **Contato com pastas:** os seis links sociais passam a exibir o ícone de pasta macOS do
   tema ativo com o ícone da rede sobreposto e centralizado, sem texto visível, mantendo o
   destino do link, o alvo de toque e a acessibilidade por `aria-label`.

## FILES INVOLVED

- `public/favicon-fm.svg` (modify)
- `src/components/main-content/sections/skills.tsx` (modify) — itens 2 e 3
- `src/components/main-content/sections/contact.tsx` (modify) — item 4

## RESTRICTIONS

- Regras 1 a 6 do perfil do repo. Nenhuma dependência nova.
- Invariante 5 do `AGENTS.md`: nenhuma alegação não verificável na copy.
- Invariante 7: identidade Finder/macOS preservada. A árvore de pastas de Skills mantém
  ícones, indentação `pl-7` e alturas `h-[26px]`.
- Preservar as edições não commitadas do Fernando: remoção de "19" em `about.tsx`,
  `home.tsx` e `spotlight.tsx` (fora do escopo, não tocar), e os semáforos do Quick Look em
  `skills.tsx` (~linha 907).
- Sem rótulo de texto nos cards de contato, mas `aria-label` obrigatório em cada link, já
  que o ícone passa a ser o único indicador visual.
- Não alterar `SOCIAL_LINKS`, `EMAIL`, `PHONE_DISPLAY` nem `constants.ts`.

## EXPECTED DELIVERY

- Favicon sem fundo, letras pretas, abaixo de 2 KB.
- Troca de categoria em Skills sem interpolação de altura; reordenação por arrasto intacta.
- 43 descrições reescritas em primeira pessoa e ancoradas em fato publicado.
- Seis pastas macOS com ícone social sobreposto, sem texto, links preservados.

## VERIFICATION

```bash
bun run lint       # Biome: 1 erro pré-existente conhecido (layout.tsx:72), nenhum novo
bunx tsc --noEmit  # PASS
bun run build      # PASS
```

Verificação visual em 375x812 e 1280x800. **Pendência declarada: a confirmação da suavidade
da animação (item 2) depende do Fernando**, pelo motivo em A1.
