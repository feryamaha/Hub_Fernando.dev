---
trigger: always_on
status: active
scope: canonical
last_updated: 2026-07-20
---

# Estilo de Documentacao — Hub_Fernando.dev

> Regra canonica e transversal para todo conteudo textual deste repo, adaptada do
> ecossistema Nemesis. Distingue duas superficies com vozes DIFERENTES:
> (a) **conteudo do portfolio** (textos das secoes do site, README voltado a visitante);
> (b) **documentos de processo** (specs, planos, PRs, regras, skills, relatorios).

## Regra 1: Sem travessao (ambas as superficies)

Nao usar em dash nem en dash em nenhum texto, em qualquer idioma.
Usar virgula, dois-pontos ou parenteses no lugar.
Para intervalos numericos, usar "1 a 3".

## Regra 2: Voz por superficie

- **Conteudo do portfolio:** primeira pessoa do singular, na voz do Fernando ("Sou
  desenvolvedor...", "Projetei e implementei..."). E um portfolio pessoal: a primeira
  pessoa e a voz correta do produto. Tom narrativo, declarativo, direto e tecnico, sem
  hype de marketing.
- **Documentos de processo:** voz impessoal, terceira pessoa ou estrutura passiva.
  Exemplos: "Eu escolhi esse numero" vira "A escolha desse numero"; "minha correcao"
  vira "a correcao aplicada".

## Regra 3: Texto minimo, entendimento maximo

Condensar paragrafos longos em frases diretas quando possivel. No site, preferir
hierarquia visual (headings, chips, cards) a blocos de texto dissertativo. Manter
rastreabilidade tecnica (arquivo:linha em relatorios) de forma concisa.

## Regra 4: Veracidade de conteudo do portfolio

Nenhum numero, metrica ou alegacao entra no site sem fonte real (codigo, repositorio,
resultado medido). Dado nao verificavel nao e publicado. Superlativo sem base = cortar.

## Integracao

Aplicar junto com: as invariantes do AGENTS.md, a disciplina epistemica
(.devin/rules/nemesis-epistemic-safety.md) e o SDD pipeline.
