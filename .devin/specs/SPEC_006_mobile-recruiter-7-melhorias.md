# SPEC_006 — Sete melhorias de UI/UX mobile (conversão de recrutador)

> Origem: auditoria de UI/UX mobile executada em 2026-07-22 (viewport 375x812, modo mobile
> confirmado). Fernando aprovou a auditoria e ordenou a implementação dos sete itens abaixo.

## REQUEST

Implementar sete ajustes de UI/UX voltados à leitura do portfólio por recrutador técnico em
dispositivo móvel, preservando integralmente a identidade Finder/macOS (invariante 7 do
`AGENTS.md`).

## CATEGORY

Feature + Refactor (UI), com um item de Infra (metadata/SEO, área sensível).

## PROBLEM

Sintomas observáveis medidos na auditoria, em viewport 375x812:

1. `public/favicon.svg` pesa 1,6 MB (SVG com raster embutido em `<pattern>`), baixado por
   todo visitante. Referenciado em `src/app/layout.tsx:30`.
2. Na seção Projetos, 33 de 44 elementos `<img>` não declaram `loading`. Medição por
   arquivo: os 33 são os três semáforos SVG repetidos nos 11 cards
   (`icon-mac-close_button.svg`, `icon-mac-minimize_button.svg`,
   `icon-mac-maximize-button.svg`). As 11 imagens de projeto usam `next/image` e já
   carregam com `loading="lazy"`.
3. A seção Skills inicia com duas categorias expandidas (`skills.tsx:465-467`:
   `Set(["Linguagens", "Frameworks & Bibliotecas"])`) e a expansão é acumulativa: abrir uma
   categoria não fecha as demais.
4. A seção Projetos renderiza os 11 cards no estado `full`, somando 8213 px de altura
   (12,6 telas em 654 px úteis). `MacCard` já possui a máquina de estados
   `full | compact | collapsed` (`mac-card.tsx:33`), mas o estado inicial é fixo em `full`.
5. A navegação em mobile custa dois toques com deslocamento ergonômico completo: o gatilho
   (menu) fica em y=684 (base) e os itens de destino em y=50 a y=212 (topo).
6. Os seis controles do topo têm área de toque de 24x24 px com folga de 8 px entre alvos
   (`top-bar.tsx`, classes `p-1 md:p-2` com ícone `w-4 h-4`).
7. `layout.tsx:39-46` declara a imagem OpenGraph como 100x100, enquanto o arquivo real
   (`public/icons/img_profile.webp`) tem 1404x1395; `twitter.card` está como `summary`.

## CONTEXT

**Módulos afetados:** `src/app/layout.tsx`, `src/components/top-bar/top-bar.tsx`,
`src/components/ui/mac-card.tsx`, `src/components/main-content/sections/projects.tsx`,
`src/components/main-content/sections/skills.tsx`,
`src/components/main-content/main-content.tsx`, `public/`.

**Comportamento esperado:** os sete ajustes aplicados sem alteração da metáfora Finder
(janelas, semáforos, sidebar, pastas e arquivos), sem carrossel e sem navegação por gesto.

**Assumpções declaradas (não puderam ser resolvidas sem decisão do Fernando):**

- **A1 (item 2, ganho marginal):** os 33 elementos sem `loading` são três arquivos SVG
  únicos de 0,3 a 0,7 KB, servidos uma vez e reaproveitados do cache do browser. Aplicar
  `loading="lazy"` neles é inofensivo, porém o ganho de banda é próximo de zero, e nos
  cards acima da dobra o atributo adia cromo já visível. A auditoria original citou "33
  imagens sem lazy" sem discriminar quais eram; esta spec corrige o dado. O item é
  implementado conforme ordenado e a medição real fica registrada.
- **A2 (item 7, asset ausente):** não existe no repositório imagem OpenGraph 1200x630. A
  invariante 6 do `AGENTS.md` proíbe o agente de fabricar ou baixar asset. Esta spec entrega
  a configuração (`summary_large_image` e dimensões declaradas coerentes com o arquivo real)
  e registra a pendência do asset 1200x630 para o Fernando.
- **A3 (item 1, remoção do arquivo):** deletar asset é ação classe C pela lei F4. O favicon
  antigo permanece no disco; apenas a referência em `layout.tsx` deixa de apontar para ele.
  A remoção física fica como decisão do Fernando.
- **A4 (item 5, coexistência dock e menu):** a sidebar mobile também hospeda o seletor de
  temas. O dock assume a navegação entre seções; o botão de menu permanece como acesso à
  sidebar (temas), reposicionado para não colidir com o dock.
- **A5 (item 6, efeito na altura):** a classe `h-topbar` não existe no CSS gerado
  (verificado: `.h-topbar` ausente na folha servida); a altura atual de 35 px vem do
  conteúdo. Elevar a área de toque para 44 px eleva a barra para aproximadamente 44 px, e
  reduz a largura disponível do título, que já é truncado hoje.

## REQUIREMENTS

1. **Favicon leve:** criar SVG novo com path simples das iniciais FM e apontar
   `metadata.icons` para ele. Sem raster embutido. Alvo abaixo de 2 KB.
2. **Lazy nos semáforos:** declarar `loading="lazy"` nos três `<img>` de semáforo do
   `MacCard`, que serve os 11 cards da seção Projetos.
3. **Skills em acordeão:** estado inicial com apenas a primeira categoria (`Linguagens`)
   expandida; abrir uma categoria fecha a anteriormente aberta. Comportamento de árvore de
   pastas do Finder preservado (mesma UI, mesmos ícones, mesma indentação).
4. **Projetos com um card aberto:** apenas `NEMESIS DEFENDER v0` inicia em `full`; os
   demais dez iniciam em `compact` (estado já existente, acionado hoje pelo semáforo
   amarelo). Nenhuma mudança na aparência dos estados.
5. **Dock inferior:** componente novo de navegação, visível somente em mobile, com os cinco
   destinos (Home, About, Skills, Projects, Contact), no fluxo do layout acima do rodapé,
   com estado ativo coerente com `useNavigation`.
6. **Área de toque de 44 px no topo:** os seis controles do `top-bar` passam a ter área
   mínima de 44x44 px, mantendo o tamanho visual do ícone.
7. **OpenGraph:** `twitter.card` para `summary_large_image` e dimensões declaradas
   coerentes com o arquivo real referenciado.

## FILES INVOLVED

- `public/favicon-fm.svg` (create)
- `src/app/layout.tsx` (modify) — **sensitive_area**: metadata/SEO
- `src/components/ui/mac-card.tsx` (modify)
- `src/components/ui/project-card.tsx` (modify) — repassa o estado inicial ao `MacCard`
- `src/components/main-content/sections/projects.tsx` (modify)
- `src/components/main-content/sections/skills.tsx` (modify)
- `src/components/dock/dock.tsx` (create) — o dock não pertence à sidebar; diretório próprio
- `src/app/page.tsx` (modify) — monta o dock no fluxo, entre `MainContent` e `Footer`
- `src/components/main-content/main-content.tsx` (modify) — reposiciona o botão de menu
  flutuante para não colidir com o dock
- `src/components/top-bar/top-bar.tsx` (modify)

## RESTRICTIONS

- Regras 1 a 6 do perfil do repo (`nemesis-repo-profile.md`): TypeScript strict, toolchain
  Bun/Biome/Next, área sensível declarada, escopo da spec, git exclusivo do Fernando, sem
  artefato de build no diff.
- Invariante 7 do `AGENTS.md`: a metáfora Finder/macOS não se descaracteriza. Sem carrossel,
  sem navegação por gesto, sem alterar a estrutura visual das seções.
- Rubrica de UI do perfil: tokens `--finder-*` em vez de valores soltos; estados hover,
  active, focus-visible e disabled; contraste WCAG AA em todos os temas de accent;
  sem overflow horizontal de 360 a 1440 px.
- Nenhuma dependência nova.
- Não deletar `public/favicon.svg` (lei F4, classe C).
- A mudança pré-existente do Fernando em `skills.tsx` (semáforos do Quick Look, linhas
  ~914-920) é preservada intacta.

## EXPECTED DELIVERY

- Favicon novo abaixo de 2 KB referenciado no metadata; `public/favicon.svg` intocado no disco.
- Semáforos do `MacCard` com `loading="lazy"`.
- Skills abrindo com uma categoria expandida e comportamento de acordeão exclusivo.
- Projetos abrindo com apenas o card do Nemesis Defender em `full`.
- Dock inferior operante em mobile, com os cinco destinos e estado ativo.
- Controles do topo com área de toque de 44x44 px.
- `twitter.card` como `summary_large_image` e dimensões OpenGraph coerentes.
- Pendência declarada: asset OpenGraph 1200x630.

## VERIFICATION

```bash
bun run lint       # Biome: PASS
bunx tsc --noEmit  # tipos: PASS
bun run build      # export estático: PASS
```

Verificação visual no browser da IDE em 375x812 e em 1280x800 (o dock não aparece em
desktop; a sidebar segue como navegação).
