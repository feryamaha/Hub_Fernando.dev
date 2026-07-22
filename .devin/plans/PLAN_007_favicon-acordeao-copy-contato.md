# PLAN_007 — Favicon, acordeão, copy das skills e pastas no Contato

> Spec: `.devin/specs/SPEC_007_favicon-acordeao-copy-contato.md`
> Verificação por tarefa: `bunx tsc --noEmit`
> Suite final: `bun run lint` + `bunx tsc --noEmit` + `bun run build`

## Global Constraints

- TypeScript strict; nenhuma dependência nova; nenhum HEX solto em componente (tokens
  `--finder-*` via classes). HEX dentro do asset `.svg` é permitido.
- Identidade Finder/macOS preservada.
- Preservar edições não commitadas do Fernando: `about.tsx`, `home.tsx`, `spotlight.tsx`
  (remoção de "19") e o bloco Quick Look em `skills.tsx` (~linha 907). Nenhuma tarefa toca
  esses pontos.
- Nenhuma tarefa executa git de escrita.
- Copy nova não pode citar versão de framework (o Fernando acabou de removê-las).

## Mapa de arquivos

```
MODIFY: public/favicon-fm.svg                                  (TASK 1)
MODIFY: src/components/main-content/sections/skills.tsx         (TASK 2 e TASK 4)
MODIFY: src/components/main-content/sections/contact.tsx        (TASK 3)
```

## Waves

```
WAVE 1 (arquivos disjuntos): TASK 1, TASK 2, TASK 3
WAVE 2 (mesmo arquivo da TASK 2): TASK 4
```

TASK 2 e TASK 4 tocam o mesmo arquivo e por isso são sequenciais, mesmo sem dependência de
dados (dois implementadores no mesmo arquivo corrompem o trabalho um do outro).

---

## TASK 1 — Favicon sem fundo, letras pretas

**FILE:** `public/favicon-fm.svg` (MODIFY)
**DEPENDE_DE:** nenhuma
**VERIFICACAO:** inspeção do arquivo (asset estático)

Substituir o conteúdo inteiro por:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="FM">
  <path d="M10 18 h16 v5 h-11 v6 h9 v5 h-9 v12 h-5 z" fill="#000000"/>
  <path d="M30 46 v-28 h6 l6 11 l6-11 h6 v28 h-5 v-19 l-7 13 l-7-13 v19 z" fill="#000000"/>
</svg>
```

Mudanças: o `<rect>` de fundo é removido (fundo transparente) e o `fill` das duas letras
passa de `#73D7FF` para `#000000`. O desenho FM e o viewBox não mudam.

**Critério de aceite:** sem `<rect>`, dois `fill="#000000"`, abaixo de 2 KB, sem `<image>`,
`xlink` ou `base64`.

---

## TASK 2 — Corrigir a distorção do acordeão em Skills

**FILE:** `src/components/main-content/sections/skills.tsx` (MODIFY)
**DEPENDE_DE:** nenhuma
**VERIFICACAO:** `bunx tsc --noEmit`

**Causa:** `Reorder.Item` do framer-motion aplica animação de layout por padrão. Quando o
acordeão troca a categoria aberta, o bounding box de duas categorias muda de altura no mesmo
render, e a animação interpola o TAMANHO da caixa, distorcendo o conteúdo (efeito de
"esticar").

**Correção:** restringir a animação de layout à posição, em vez de posição e tamanho. O
framer-motion aceita `layout="position"` para isso, e essa é a forma recomendada para listas
cujo conteúdo muda de altura: a reordenação por arrasto continua funcionando porque ela
depende da animação de POSIÇÃO.

Duas mudanças, ambas acrescentando uma prop:

1. No `Reorder.Item` das CATEGORIAS (linha ~582):
```tsx
<Reorder.Item
  key={category.name}
  value={category}
  layout="position"
  className="cursor-grab active:cursor-grabbing"
>
```

2. No `Reorder.Item` dos ARQUIVOS (linha ~635):
```tsx
<Reorder.Item
  key={id}
  value={file}
  layout="position"
  className="cursor-grab active:cursor-grabbing"
>
```

**O QUE NÃO FAZER:** não remover os `Reorder.Group`/`Reorder.Item` (a reordenação por
arrasto é funcionalidade anunciada no README); não introduzir `AnimatePresence` nem
animação de altura; não alterar `toggleFolder`, `expandedFolders`, a UI da árvore (ícones,
`pl-7`, `h-[26px]`, chevrons) nem o bloco Quick Look (~linha 907).

**Limitação declarada:** não é possível observar a animação nesta sessão (Browser pane sem
`requestAnimationFrame`). A verificação automatizada cobre tipos e build; a confirmação
visual da suavidade é do Fernando.

---

## TASK 3 — Contato com pastas macOS e ícone sobreposto

**FILE:** `src/components/main-content/sections/contact.tsx` (MODIFY)
**DEPENDE_DE:** nenhuma
**VERIFICACAO:** `bunx tsc --noEmit`

Substituir APENAS o bloco do grid de links sociais (linhas ~131-154). O restante do arquivo
(título, e-mail com cópia, CTA de CV, telefone, Crosshair) não muda.

O componente já tem `const [theme] = useTheme();` (linha 46). Derivar o caminho do ícone do
tema ativo, exatamente como `about.tsx:101` e `skills.tsx:476` já fazem:

```tsx
const folderIconPath = `/icons/icon-macos-folder-${theme}.webp`;
```

Novo bloco do grid:

```tsx
<div className="mt-12 grid grid-cols-3 gap-5">
  {socialLinks.map((link, index) => {
    const Icon = link.icon;
    return (
      <a
        key={link.name}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.name}
        title={link.name}
        className="group flex items-center justify-center rounded-xl p-2 transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
        style={{ "--hover-color": link.color } as CSSProperties}
        data-aos="fade-right"
        data-aos-delay={`${index * 200 + 200}`}
      >
        <span className="relative inline-flex items-center justify-center w-24 h-24">
          <img
            src={folderIconPath}
            alt=""
            aria-hidden="true"
            width={96}
            height={82}
            className="w-full h-auto drop-shadow-lg"
          />
          <Icon className="absolute left-1/2 top-[58%] w-7 h-7 -translate-x-1/2 -translate-y-1/2 text-finder-text drop-shadow group-hover:text-[var(--hover-color)] transition-colors duration-300" />
        </span>
      </a>
    );
  })}
</div>
```

Pontos obrigatórios:

- **Sem rótulo de texto.** O `<span>` com `{link.name}` é removido.
- **`aria-label={link.name}` e `title={link.name}` no `<a>`**: com o texto removido, é o
  único nome acessível do link. Sem isso o link fica sem nome para leitor de tela.
- **`alt=""` e `aria-hidden` na imagem da pasta**: ela é decorativa, quem nomeia é o `<a>`.
- **`top-[58%]`**: o ícone fica no corpo da pasta, não no centro geométrico, porque o
  desenho da pasta macOS tem a aba na parte superior.
- Os seis destinos e a ordem de `socialLinks` não mudam.

**O QUE NÃO FAZER:** não alterar `SOCIAL_LINKS`, `constants.ts`, o bloco de e-mail, o CTA de
CV, o bloco de telefone, o `Crosshair` ou os `data-aos` existentes. Não trocar o grid de 3
colunas. Não adicionar dependência.

---

## TASK 4 — Reescrever as 43 descrições de skills

**FILE:** `src/components/main-content/sections/skills.tsx` (MODIFY)
**DEPENDE_DE:** TASK 2 (mesmo arquivo)
**VERIFICACAO:** `bunx tsc --noEmit`

Substituir o valor do campo `description` de cada um dos 43 objetos `SkillFile` do array
`skillCategories` (linhas ~29 a ~460). **Somente o campo `description` muda.** `name`,
`extension`, `size`, `modDate` e `kind` permanecem idênticos.

A redação é fornecida integralmente no anexo abaixo e deve ser aplicada LITERALMENTE, sem
reescrever, resumir ou "melhorar". Ela foi ancorada em fatos já publicados pelo Fernando em
`about.tsx`, `projects.tsx` e `README.md` (invariante 5 do AGENTS.md).

**O QUE NÃO FAZER:** não alterar a estrutura do array, os nomes de arquivo, as categorias, a
contagem de itens, nem qualquer outro campo. Não tocar em `toggleFolder`, nos `Reorder`, na
UI da árvore ou no Quick Look.

### ANEXO: copy final (aplicar literalmente)

**Linguagens**

- TypeScript.ts → `"Uso TypeScript em strict mode como contrato entre camadas: modelo domínio com generics, tipo os limites de UI, hooks, services e types, e trato o compilador como primeiro revisor. Foi assim que mantive centenas de componentes tipados no portal multi-perfil da Auclan sem perder rastreabilidade."`
- JavaScript.js → `"Recorro a JavaScript puro quando o contexto não comporta build: scripts de browser, manipulação direta de DOM e o script de pré-pintura de tema deste portfólio, que evita o flash de tema errado antes do React hidratar."`
- Rust.rs → `"Escrevi o Nemesis Defender inteiro em Rust: scanner com deny-list de 36 categorias, 14 visitors de AST e design fail-closed onde qualquer panic vira bloqueio. Uso Rust quando errar em silêncio não é aceitável."`
- HTML5.html → `"Estruturo HTML semântico pensando em quem lê depois: leitor de tela, crawler e preview de link. Neste portfólio todas as seções ficam no HTML mesmo ocultas, para o export estático carregar conteúdo real e não uma casca vazia."`
- CSS3.css → `"Trabalho CSS por token, não por valor solto. Reduzi o globals.css deste projeto de 484 para 4 linhas movendo cor, tema e utilitário para uma fonte única, com os 9 temas gerados a partir dela."`

**Frameworks & Bibliotecas**

- React.tsx → `"Componho interfaces com Server Components e hooks, separando estado de apresentação. Construí um design system de mais de 160 componentes reutilizáveis e tipados, usado para acelerar entrega de features sem duplicar padrão."`
- Next.js.ts → `"Uso App Router com RSC e Route Handlers como BFF, escolhendo por rota entre SSR, SSG e ISR. Aplico em produção na Auclan e neste portfólio, que é export estático com deploy contínuo."`
- React Hook Form.ts → `"Monto formulários com React Hook Form ligado a schema, evitando re-render desnecessário e mantendo mensagem de erro derivada do mesmo contrato que valida no servidor."`
- Zod.ts → `"Uso Zod como fronteira de runtime: valido o que entra de API externa e de formulário, e derivo o tipo do schema para não manter validação e tipo desalinhados. É a checagem que o TypeScript sozinho não faz depois do build."`
- Tailwind CSS.css → `"Faço 100% da estilização em Tailwind com tokens semânticos. Neste projeto os HEX vivem só no config e o resto do app fala por token, então trocar um tema não exige tocar em componente."`

**Arquitetura**

- Clean Architecture.md → `"Organizo em UI → Hooks → Services → Types com contrato explícito em cada fronteira. Baixa tolerância a ambiguidade: cada limite é declarado, não presumido, o que vem de 17 anos medindo tolerância em metrologia antes de programar."`
- Design Systems.fig → `"Construo design system com token semântico e componente tipado, não com coleção de classes. O UIKit que mantenho passou de 160 componentes e sustenta entrega de features sem retrabalho de estilo."`
- BFF.ts → `"Implemento BFF em Route Handlers para manter credencial e regra sensível fora do cliente. O browser recebe resultado, nunca a chave que o produziu."`
- Contracts.d.ts → `"Trato interface TypeScript como documentação executável: se o contrato muda, o build quebra antes do usuário perceber. É o que permite refatorar camada sem auditar o app inteiro na mão."`

**Dados & APIs**

- Integração de APIs.ts → `"No MapHunter agrego OpenStreetMap/Nominatim, ViaCEP, BrasilAPI e dados abertos da Receita Federal com geocoding e fallback entre provedores, para gerar lead qualificado sem depender de API paga."`
- Cache & Rate limit.ts → `"Implemento cache local e rate limiting para respeitar limite de API gratuita: no MapHunter a consulta de CNPJ só acontece depois da qualificação, então a cota vai para lead que interessa e o custo fica previsível."`
- Pipelines de dados.ts → `"Desenho pipeline em etapas com descarte cedo: filtro órgão público e nicho fora do perfil antes de gastar enriquecimento, e entrego o resultado em CSV e XLSX. Filtrar antes de enriquecer é o que segura o custo."`

**Segurança**

- OWASP Top 10.md → `"Trato o OWASP Top 10 como checagem contínua do design ao deploy, não como auditoria no fim. Segurança entra como padrão de projeto, com o sistema falhando fechado."`
- OWASP for LLM.md → `"Sou certificado pela OWASP Foundation em Top 10 for LLM. Prompt injection, exfiltração de credencial e abuso de agente são exatamente as ameaças que o Nemesis Defender intercepta antes da execução."`
- CSP Level 3.conf → `"Aplico CSP Level 3 com nonce dinâmico, HSTS, X-Frame-Options e Permissions-Policy como configuração padrão de projeto, não como ajuste posterior."`
- Threat Modeling.md → `"Modelo ameaça declarando escopo e limite: digo o que o sistema protege e o que ele não protege. No Nemesis isso está escrito, porque garantia vaga em segurança é pior que ausência de garantia."`
- Supply-chain.md → `"Defendo supply-chain com enforcement em runtime: o Nemesis bloqueia malware em pacote antes de ele executar, e move para quarentena em vez de deletar, mantendo a ação reversível."`

**Sistemas & Baixo Nível**

- eBPF.c → `"Escrevi a camada de kernel do Nemesis em eBPF com BPF LSM, cobrindo bprm_check_security e egress por socket_connect. É o backstop para o caso de a checagem em user space ser contornada."`
- AST.ts → `"Faço análise estática com tree-sitter percorrendo AST para detectar padrão malicioso antes da execução. São 14 visitors despachados no scanner do Nemesis, porque regex sozinho não entende estrutura de código."`
- Fail-closed.rs → `"Projeto para falhar fechado: no Nemesis qualquer panic vira exit 2, ou seja, bloqueio. A quarentena exige corroboração de sinais antes de agir, o que segura falso positivo sem abrir a porta."`
- Linux.sh → `"Uso Linux como ambiente de desenvolvimento e de enforcement, trabalhando com syscall, permissão e processo. É onde o Nemesis roda e onde depuro o que acontece abaixo da aplicação."`

**Performance & Qualidade**

- RSC / SSR / SSG / ISR.ts → `"Escolho estratégia de renderização por rota para reduzir bundle e melhorar carregamento: no UIKit isso rendeu Lighthouse na faixa de 90+ e queda de 20 a 30% no bundle."`
- Lighthouse.json → `"Meço LCP e TTI e versiono o resultado, tratando performance como contrato verificável. Número medido, não impressão de que 'está rápido'."`
- Playwright.ts → `"Escrevo E2E em Playwright cobrindo os fluxos que não podem quebrar. No portal multi-perfil da Auclan são 5 perfis de usuário, então o teste precisa provar o comportamento de cada um."`
- Quality Gates.ts → `"Coloco o gate antes do merge, não depois: lint com regra custom, tipo estrito, validação de runtime e checagem de segurança e arquitetura em pre-commit. O que não passa no gate não entra."`

**IA & Agentic Coding**

- Devin.ts → `"Integrei o Nemesis ao Devin para que a execução autônoma passe pelo mesmo enforcement dos demais fluxos. Autonomia maior exige contenção maior, não confiança maior."`
- VSCode.ts → `"Mantenho o hook de pre-tool do Nemesis funcionando no VS Code e no Copilot, para que a proteção acompanhe o editor em vez de depender de qual ferramenta abri no dia."`
- Cursor.ts → `"Uso Cursor para feature e refactor com contrato de atuação declarado, e com o mesmo hook de pre-tool interceptando write e exec antes da ação."`
- Antigravity.ts → `"Uso a plataforma agent-first do Google com Gemini para distribuir trabalho entre agentes. O harness continua sendo meu, a plataforma é intercambiável."`
- Claude.ts → `"Conduzo o Claude Code pelo meu SDD Pipeline: 7 skills em sequência com HARD-GATE antes de gravar spec, de executar e de liberar release. O agente executa, eu decido."`
- OpenCode.ts → `"Uso agente open-source quando quero controle total do fluxo e da execução local, sem depender de decisão de produto de terceiro sobre o que o agente pode fazer."`
- Codex.ts → `"Integrei o Codex ao meu fluxo com o enforcement do Nemesis por cima, para que a sugestão do agente passe pela mesma checagem de comando destrutivo que aplico nas outras IDEs."`
- Grok.ts → `"Uso para raciocínio sobre código e leitura rápida de trecho desconhecido, sempre com o resultado passando pela mesma revisão que aplico a qualquer saída de agente."`
- Harness.md → `"Construí um harness de processo próprio: regras, skills e workflows que governam o que o agente pode fazer. É o que transforma 'usar IA' em processo auditável em vez de tentativa e erro."`
- Skills.md → `"Escrevo skill em markdown com contrato de handoff completo, porque subagente nasce sem memória da conversa: objetivo, arquivos, invariantes, o que não fazer e formato do resultado."`
- Rules.md → `"Escrevo regra canônica com verificador mecânico junto. Lei sem verificador é intenção, não lei, então cada regra do meu harness diz como provar que está sendo cumprida."`
- Workflows.md → `"Encadeio as skills em workflow sequencial e determinístico, com gate automático entre fases e uma única parada para decisão humana. O caminho é auditável do pedido até a entrega."`
- Hooks Pretool/Posttool Use.md → `"Implementei hooks que interceptam a tool call antes da execução, com controle de path em três níveis e exit 2 como bloqueio determinístico. O agente é contido pela máquina, não pela boa vontade dele."`

---

## Verificação final

```bash
bun run lint       # esperado: apenas o erro pré-existente layout.tsx:72
bunx tsc --noEmit
bun run build
```

## Medições a coletar

- Peso e conteúdo do favicon (ausência de `<rect>`, fill `#000000`).
- Contagem de `layout="position"` em skills.tsx (esperado: 2).
- Contagem de descrições alteradas (esperado: 43) e confirmação de que `name`, `extension`,
  `size`, `modDate` e `kind` não mudaram.
- Ausência de texto nos cards de contato e presença de `aria-label` nos 6 links.
