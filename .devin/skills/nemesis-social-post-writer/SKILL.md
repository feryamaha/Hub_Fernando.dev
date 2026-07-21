---
name: nemesis-social-post-writer
description: >
  Transforma uma ideia, projeto, aprendizado ou conceito do trabalho do Fernando (portfolio,
  Nemesis Defender, MapHunter, carreira) em posts NATIVOS por rede (X/Twitter em thread com
  gancho, LinkedIn em narrativa profissional, Threads em tom curto). Minera os dados REAIS
  dos repos e do portfolio para ter sempre assunto novo, na voz autoral do Fernando, sem
  bullet genérico, sem hype de marketing, sem numero inventado. Adapta a MESMA ideia para
  redes distintas sem parecer repetida nem robótica. Use quando o Fernando pedir "cria um
  post", "divulga isso", "transforma em thread", "post pra X/LinkedIn".
---

# Social Post Writer (portfolio e projetos do Fernando)

> Adaptada do ecossistema Nemesis para o contexto do portfolio. As fontes de dado sao este
> repo, o site publicado e os repos publicos do Fernando (Nemesis Defender, MapHunter,
> Harvestin, Cifra-Tom); fatos do Nemesis vem de `.devin/skills/SKILL-nemesis-defender.md`
> e das fontes canonicas citadas la.

**Anuncio de inicio**: "Estou usando a skill nemesis-social-post-writer para gerar o post."

**Objetivo:** dar ao Fernando material de divulgação técnico e honesto, com fôlego para não
repetir copy, extraído dos fatos reais do Nemesis. Isto é ESCRITA, não deploy: a skill entrega
o texto pronto; publicar é decisão e ação do Fernando (ou agendamento, ver Passo 6).

**Modelo-agnóstica:** é um procedimento em markdown. Qualquer modelo/IDE executa. Não depende
de ferramenta específica de um vendor.

---

## Regra dura de veracidade (herdada da disciplina do Nemesis)

O Nemesis é um projeto sobre **determinismo e honestidade**. O marketing dele obedece à mesma
regra: **nenhum número, capacidade ou alegação entra num post sem vir de uma fonte real do
projeto** (ler o arquivo/log, não a memória). Se um dado não pôde ser verificado, ele não é
publicado. Alegação de superioridade só por categoria e por fato verificável (ver `nemesis-*`
research), nunca "somos os melhores" solto. Superlativo sem base = cortar.

---

## Voz autoral (obrigatória)

Escrever como o Fernando escreve, não como um gerador de conteúdo:

- **Primeira pessoa do singular ("eu"), tom narrativo e dissertativo, declarativo, direto e
  técnico.** Ele fala do que construiu, por que construiu, e o que aprendeu.
- **Sem travessão em nenhum idioma** (usar vírgula, dois-pontos ou parênteses). Regra de estilo
  canônica do repo (`.devin/rules/nemesis-documentation-style.md`).
- **Sem hype de marketing**: nada de "revolucionário", "game-changer", "o futuro é", "🚀 x10".
- **Sem lista de bullet genérica** como corpo do post: parágrafo com raciocínio, não checklist.
  Bullet só quando a própria informação é uma enumeração curta e inevitável.
- **Sem emoji-spam**: no máximo 1 emoji funcional, e frequentemente zero.
- **Frase curta carrega o peso.** Abre com afirmação, sustenta com fato, fecha com consequência.
- **Honestidade como diferencial**: declarar limite quando existir (é o tom do próprio projeto).

Anti-padrões a rejeitar (se o rascunho tiver, reescrever): "Neste post vou te mostrar…";
"3 coisas que você precisa saber"; "E o melhor: …"; call-to-action mecânico ("Curtiu? Comenta
aí!"); thread que é a mesma frase picada; parágrafo que não diz nada e só prepara o próximo.

---

## Fontes de dado do projeto (minerar daqui, nunca inventar)

Antes de escrever, escolher 1 a 3 fatos concretos destas fontes:

**Este repo (`Hub_Fernando.dev/`):**
- `src/components/main-content/sections/*.tsx`: conteudo real do portfolio (trajetoria de
  17 anos em metrologia, transicao autodidata, atuacao na Auclan Design, especialidades).
- `README.md` e o site publicado (https://hub-fernando-dev.vercel.app): decisoes de design
  da interface Finder, stack, arquitetura.
- Historia de construcao do proprio portfolio (SDD pipeline, agentes, governanca): material
  honesto de bastidores de engenharia.

**Nemesis Defender (projeto bandeira):**
- `.devin/skills/SKILL-nemesis-defender.md`: fatos oficiais e links canonicos (arquitetura
  em 3 camadas, tese determinismo vs probabilismo, incidentes reais que ancoram a tese).
- Repo e site: https://github.com/feryamaha/Nemesis_Defender_v0 e
  https://dashboard-nemesis-defender.vercel.app (numero novo = conferir la, nunca de memoria).

**Demais projetos (GitHub feryamaha):**
- MapHunter (agregacao de APIs publicas, pipeline de leads), Harvestin (job search pessoal),
  Cifra-Tom (cifras de violao): o que cada um resolve, decisao tecnica interessante,
  aprendizado. Fatos conferidos no repo/site antes de publicar.

Regra: se o post cita um número, o rascunho anota a fonte entre colchetes para o Fernando
conferir antes de publicar (ex.: `[fonte: run-pentest.sh]`), e a versão final limpa a anotação.

---

## Banco de ângulos (para nunca repetir copy)

Cada post nasce de UM ângulo. Rotacionar. Manter um registro dos já usados no fim deste
arquivo (seção "Ângulos já publicados") ou num arquivo do Fernando, para não repetir.

Pilares de mensagem (cada um rende dezenas de posts):

1. **Determinismo vs probabilismo.** Instrução em texto ("não rode comando destrutivo") é
   probabilística: o modelo pode ignorá-la, não por má vontade, mas porque é inerente à
   arquitetura de previsão. Enforcement por exit code é categórico. (Fonte: projeto.json.)
2. **Runtime enforcement, não detecção reativa.** Linter/SAST/CI pegam depois; o Nemesis
   bloqueia antes de executar.
3. **O alvo é o agente, não o dev.** Conter a autonomia do modelo, não vigiar o humano.
4. **Comando + conteúdo.** A maioria dos guardas olha a linha de comando; o Nemesis escaneia o
   conteúdo do arquivo (malware, supply-chain, reverse shell, prompt injection).
5. **Auto-proteção.** Um guarda que embarca env-var de bypass é desligável por um AGENTS.md
   envenenado; o Nemesis torna isso um vetor de pentest bloqueado.
6. **Camadas independentes (defesa em profundidade).** hook + scanner + eBPF no kernel.
7. **Honestidade como postura de segurança.** Declarar o que NÃO cobre; ciclo gap→fix público.
8. **Incidentes reais.** Replit deletando banco em code freeze, Gemini CLI apagando arquivos,
   destruição de infra acidental por agente: a dor que originou o projeto.
9. **Prova, não promessa.** Pentest como gate de CI + bloqueios reais medidos.
10. **Bastidores de engenharia.** Uma decisão de design (ex.: regras embutidas no binário,
    sem kill-switch) e o porquê.

Gatilhos de assunto novo: um changelog/release note, uma issue fechada, um conceito do
onboarding, um número novo do log, uma notícia de incidente de IA na semana.

---

## Método artigo-primeiro (o ativo é o artigo; o post é distribuição)

Padrão dos criadores técnicos que crescem sem audiência pronta (observado no método do Boris
Cherny, criador do Claude Code): **primeiro o conteúdo longo, depois o post curto que aponta
para ele.** O artigo é o ativo permanente (SEO, referência, credibilidade, indexável na
dashboard/blog); o post no X e no LinkedIn é a **distribuição**, uma sintetização amarrada do
artigo com gancho forte e link.

Ordem obrigatória por padrão:
1. **Escrever o ARTIGO primeiro** (o ativo): a peça densa, com raciocínio completo, dados,
   incidentes, a tese, a prova (red-team/pentest/log) e o limite honesto.
2. **Sintetizar o artigo** em thread de X e em post de LinkedIn. Os dois NÃO são resumos
   genéricos: são recortes fiéis do artigo, cada um nativo da rede, terminando em link para o
   artigo. A sinergia é essa: o post existe para levar ao artigo.

O artigo pode virar arquivo em `Feature-Documentation/` (fonte), página de blog, X Article ou
doc na dashboard (indexável, o que também resolve SEO). Onde publica é decisão do Fernando.

---

## Playbooks por rede

### Artigo (o ativo, escrito PRIMEIRO)
- **Título:** afirmação de tese, não clickbait (ex.: "Por que negar execução, e não isolar,
  contém um agente de IA").
- **Abertura:** pergunta ou observação concreta que fisga o leitor técnico (ex.: "Como você
  tem rodado agentes no seu ambiente? Docker, sandbox, hook, ou nada?").
- **Corpo:** problema (as frentes reais, com incidentes) → por que o óbvio falha (instrução
  advisory, isolamento como corrida armamentista, analogias) → a tese (aresta dominante =
  execução) → como o Nemesis faz → a prova (red-team/pentest/log, número com fonte) → limite
  honesto. Subtítulos por seção, sem bullet genérico como corpo.
- **Tamanho:** 800 a 1.600 palavras, denso mas legível. **Fecho:** consequência + link ao repo/doc.

### X / Twitter (thread, sintetização do artigo)
- **Gancho (post 1):** uma afirmação forte, concreta e verificável, ou uma tensão. Sem
  "🧵👇", sem "abre a thread". O gancho já entrega valor e cria a lacuna que puxa o próximo.
  Fórmulas que funcionam: fato contraintuitivo ("Instrução de texto não contém um agente. E
  isso não é opinião, é arquitetura."); incidente ("Um agente deletou um banco de produção
  durante um code freeze. As instruções estavam lá. Não foram ignoradas por vontade."); número
  ("Em 35 dias, 47 mil bloqueios reais. Nenhum era hipótese.").
- **Corpo (2 a 6 posts):** um passo de raciocínio por post, cada um sustentado por um fato.
  Encadear: problema → por que o óbvio falha → o que o Nemesis faz diferente → prova → limite
  honesto.
- **Fechamento:** consequência ou convite ao repo/doc (link), sem CTA mecânico.
- **Limite:** 280 caracteres por post. Contar. Se estourar, cortar adjetivo, não fato.

### LinkedIn (post único, narrativo)
- **Abertura:** 1 a 2 linhas que prendem antes do "ver mais" (o corte fica ~210 caracteres).
- **Corpo:** 3 a 6 parágrafos curtos, primeira pessoa, tom de quem construiu e está compartilhando
  o raciocínio técnico. Aqui cabe mais contexto e a narrativa de decisão.
- **Fecho:** uma reflexão ou uma pergunta técnica genuína (não "concorda? comenta"), link no
  primeiro comentário (convenção do LinkedIn) ou no fim.
- **Limite útil:** ~1.300 a 1.800 caracteres. Sem thread. Sem hashtag-spam (0 a 3 hashtags
  técnicas no máximo, ex.: #RuntimeSecurity #AIagents).

### Threads (Meta)
- Tom mais leve e conversacional que o X, mas mesmo rigor factual. 1 post ou mini-thread de 2
  a 3. 500 caracteres por post. Bom para a versão mais humana/opinativa do mesmo ângulo.

---

## Diferenciação entre redes (regra anti-robô)

A MESMA ideia, três textos DIFERENTES, não a mesma frase reformatada:
- **X** entra pelo fato/tensão e desenrola em passos.
- **LinkedIn** entra pela narrativa ("eu construí isto porque…") e explica a decisão.
- **Threads** entra pela opinião/provocação técnica curta.
Se der para trocar só o número de quebras de linha entre as três versões, está errado:
reescrever do zero cada uma a partir do mesmo ângulo.

---

## Processo

1. **Escolher o ângulo** (banco acima) e checar o registro de já-publicados para não repetir.
2. **Minerar os fatos** das fontes reais (anotar a fonte de cada número).
3. **Escrever o ARTIGO primeiro** (o ativo): tese, problema com incidentes, por que o óbvio
   falha, como o Nemesis faz, a prova com número + fonte, limite honesto. É a peça densa.
4. **Sintetizar em thread de X e post de LinkedIn**, cada um nativo, na voz autoral,
   terminando em link para o artigo. Não são resumos genéricos: recortes fiéis do artigo.
5. **Auto-revisão (checklist):** sem travessão? sem "mau"/"maligno"? sem hype/bullet genérico?
   todo número tem fonte? o post fisga e leva ao artigo (não o repete)? cada post do X cabe em
   280? o gancho prende sozinho?
6. **(Opcional) Agendar:** se o ambiente tiver capacidade de agendamento (cron/scheduler),
   oferecer; senão, entregar o texto e a sugestão de horário. Publicar é sempre ação humana
   explícita do Fernando (nada é postado sem ordem dele).
7. **Entregar** o artigo + a thread + o post de LinkedIn, com contagem de caracteres nos posts
   e as fontes anotadas, e perguntar se aprova ou ajusta.

---

## Formato de saída

Para cada pedido, entregar (o artigo primeiro, os posts como sintetização dele):

```
ÂNGULO: <pilar + recorte>
FATOS USADOS: <fato [fonte], fato [fonte]>

— ARTIGO (o ativo) —
# <título de tese>
<800 a 1.600 palavras, subtítulos por seção, denso e honesto>

— X (thread, sintetiza o artigo, termina em link) —
1/ <gancho>            (<n> chars)
2/ ...
N/ ... link do artigo   (<n> chars)

— LinkedIn (sintetiza o artigo, termina em link) —
<post narrativo>       (<n> chars)
```

Threads é opcional (mesma regra: sintetização curta que leva ao artigo).
Terminar perguntando ao Fernando: aprova, ou ajusta tom/tamanho/ângulo?

---

## Ângulos já publicados (registro anti-repetição)

Anexar aqui (data + ângulo + rede) cada post aprovado, para o próximo ciclo não repetir.

- (vazio: o primeiro post ainda não foi registrado)

---

## Integração

Fontes de fato: este repo, o site publicado, SKILL-nemesis-defender.md e os repos publicos
do Fernando. Estilo: `.devin/rules/nemesis-documentation-style.md` (sem travessão) e a
voz autoral do Fernando. Veracidade: disciplina epistêmica (número só com fonte).
Responder SEMPRE em PT-BR (salvo se o Fernando pedir o post em inglês).
