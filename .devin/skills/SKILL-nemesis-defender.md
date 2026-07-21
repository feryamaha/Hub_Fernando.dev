---
name: Nemesis Defender, Contexto Tecnico e Conceitual
description: Carrega o contexto completo do Nemesis Defender, o framework de enforcement deterministico do usuario (Rust, AGPL-3.0). Use sempre que o usuario pedir qualquer coisa sobre o Nemesis: arquitetura, camadas, hook pretool, exit code 2, eBPF/BPF-LSM, scanner Defender, deny-list, visitors AST, quarentena, doctor, instalacao, modelo de ameaca, a tese de conter a autonomia de agentes LLM, engenharia de software ou seguranca do projeto, e tambem para escrever artigos, marketing, onboarding ou documentacao sobre ele. Traz os fatos oficiais e os links canonicos.
---

# Nemesis Defender, Contexto Tecnico e Conceitual

Fontes canonicas (consultar quando precisar de detalhe atual ou mudanca recente):
- README, tecnico e operacional: https://github.com/feryamaha/Nemesis_Defender_v0/blob/main/README.md
- Site, conceito e modelo de ameaca: https://dashboard-nemesis-defender.vercel.app
- Onboarding, material de estudo: https://dashboard-nemesis-defender.vercel.app/docs
- Codebase: https://github.com/feryamaha/Nemesis_Defender_v0

Autor e mantenedor: feryamaha. Nasceu nativamente no Devin.

## O que e
Enforcement deterministico escrito em Rust, licenca AGPL-3.0 com licenca comercial dual, versao 0.x (v0.1.0). Intercepta e bloqueia, antes da execucao, comandos destrutivos e padroes de malware de supply-chain em ambientes onde um agente LLM opera sobre o codigo. Acopla-se aos hooks de pre-tool que as IDEs e agentes ja expoem, e no Linux adiciona uma camada de kernel (eBPF) como rede de contencao independente. Nao e linter generico e nao substitui ESLint, Biome, SAST ou CI; e uma barreira de bloqueio em tempo de execucao, complementar a essas ferramentas.

## Tese central
O alvo e a autonomia do agente LLM, nao o usuario. O comando em si nao e o inimigo; a invocacao autonoma pelo modelo e. Instrucao em texto ("nao rode comandos destrutivos") e probabilistica, e o modelo pode ignora-la; enforcement deterministico via exit code e categorico, nao importa se o modelo foi enganado ou apenas errou. Frases-guia do projeto: "Inteligencia nao implica autoridade" e "o problema nao e malicia, e probabilidade". Cadeia de autoridade que o Nemesis preserva: Humano, depois Nemesis, depois IA, depois Sistema. A hipotese de fundo (chamada de hipotese Ultron no material): um agente capaz e autonomo nao precisa ser hostil para causar dano, basta estar confiante e errado.

Incidentes reais que ancoram a tese (citados no site): o agente do Replit apagou um banco de producao durante um code freeze, apesar de instrucoes repetidas, e o pos-incidente foi direto, nada tecnicamente impedia a acao (AI Incident Database #1152); o Gemini CLI apagou arquivos por interpretar mal um comando; o Claude Code disparou um terraform destroy acidental. Nenhum exigiu malicia ou jailbreak, apenas um agente com autoridade delegada e nada entre o palpite e o filesystem.

## Arquitetura em 3 camadas
1. Pretool/Posttool Hook: deny-list JSON e exit code 2. Recebe o tool call como JSON via stdin antes da execucao, valida e retorna exit 2 para bloquear. Exit 2 bloqueia; exit 1 e erro nao-bloqueante. Plataformas: Linux, macOS, Windows best-effort.
2. Nemesis Defender, o scanner "Iron Dome": escaneia conteudo em file-write e em comandos com 6 layers (AST via tree-sitter, byte, regex, denylist, entropia, decoder). Plataformas: Linux, macOS, Windows best-effort.
3. eBPF Kernel LSM: opera no kernel via BPF LSM, bprm_check_security (exec) e socket_connect (egress allowlist CIDR:porta, retorna -EPERM), com escopo pelo cgroup do agente (nao afeta IDE, terminal nem sistema). Linux apenas, opt-in.

A defesa principal sao as camadas 1 e 2, completas e validadas em Linux e macOS. O eBPF e reforco de kernel exclusivo do Linux, um backstop para o caso de o pretool ser desligado ou contornado, nao um requisito. macOS com 2 camadas e o design, nao uma lacuna. Windows roda em principio mas nao e validado, suporte best-effort.

## Modelo de deteccao e severidade
O Defender so age quando a hostilidade e confirmada, e nao deleta: move para quarentena (`.nemesis/quarantine/<id>/` com `meta.json` do motivo), bloqueia a sessao (exit 2) e espera revisao humana via list, show, restore, purge. Reversivel.
- Sinais de alta confianca (confirmatorios) bloqueiam sozinhos: deny-list curada, decode para exec, cadeia de exfiltracao (fonte sensivel mais sink de rede), reverse shell, tentativa de bypass do proprio Nemesis, injecao em config de IDE.
- Sinais heuristicos exigem corroboracao, 2 metodos de deteccao independentes concordando, antes de quarentenar; sozinhos ficam em "Suspicious". A corroboracao existe para nao mover codigo legitimo por engano.
- Propriedades: fail-closed (qualquer panic vira exit 2); regex de tempo linear, sem ReDoS. Cobertura de execucao multi-runtime (JS, Python, Bash, Ruby, PHP, Go, Perl, Java, Lua). Protecao de paths endurecida contra ofuscacao (glob, cd/pushd, indirecao por variavel).

## Cobertura como coeficiente (regra canonica)
A protecao e a SOMA de camadas independentes, nao a contagem de uma feature isolada. Um visitor e um metodo de deteccao (analise semantica AST), nao a unidade de cobertura: visitor e feature, nao produto. Nao tratar "18 visitors" nem "37 categorias" como "os N vetores". A deny-list embutida do Defender tem 37 categorias e centenas de patterns; os visitors AST sao cerca de 18 exemplos. A prova empirica e a suite de pentest. Vetores fora do que foi antecipado podem nao ser detectados, e isso e declarado abertamente.

## Invariantes
- Regras de bloqueio embutidas no binario (tamper-proof): o agente nao as enfraquece editando arquivos.
- Unica superficie editavel por humano e a allowlist (`.nemesis/denylist-customers/allowlist-customers.jsonc`); a camada eBPF tem allowlist propria e separada (`allowlist-ebpf.toml`).
- Sem kill switch e sem modo-manutencao automatico, de proposito: seriam o proprio vetor de ataque.
- Registro 100% local, sem telemetria nem phone-home; ledger unico em `.nemesis/logs/nemesis-violations.log`.
- Comando destrutivo permanece sempre proibido para a IA, independentemente de qualquer permissao de leitura ou escrita. Controle de paths em tres niveis: absolute_block, write_block, allowed_exceptions.

## Calibracao de falso-positivo
Calibrado para frontend (Next.js, React, TypeScript), FP abaixo de cerca de 1%. Backend cerca de 3 a 6%. DevSecOps, IaC e Shell a partir de cerca de 7%. Quanto mais "scriptado" o stack, maior o FP. Stacks de backend e devops relaxam pela allowlist.

## Operacao
Instalacao automatica por script (`nemesis-install.sh`), que detecta a IDE e escreve o hook no formato correto de cada uma (nome de arquivo e schema proprios). Nemesis Doctor: diagnostico com 7 verificacoes (G1 a G7; G1 compilacao, G2 testes, G3 inventario de binarios, G4 scaffold da IDE, G5 eBPF, G6 daemon, G7 pentest contra 184 casos de ataque), com veredito SAUDAVEL, ATENCAO ou CRITICO. IDEs cobertas: Claude Code, OpenAI Codex, Cursor 1.7+, Devin, Gemini/Agents, VS Code/GitHub Copilot, OpenClaude. Regra de ouro: o bloqueio so acontece com exit code 2.

Requisitos: Rust 1.70+, Clang/LLVM, cerca de 4 GB de RAM. A camada eBPF exige kernel Linux 5.8+ com BPF LSM habilitado, cgroup v2, clang e bpftool, e delegar capabilities (cap_bpf, cap_perfmon, cap_sys_resource).

## Arquivos canonicos de regra e manutencao
`AGENTS.md` (agente mantenedor, invariantes de seguranca, disciplina epistemica, mapa do repo), `.devin/rules/nemesis-epistemic-safety.md`, `CLAUDE.md`, e o manual `.nemesis/nemesis-doctor/NEMESIS-OPERATIONS.md`. Para avaliacao tecnica justa, ler primeiro o `.devin/rules/nemesis-epistemic-safety.md` e o `AGENTS.md`, que declaram as invariantes e o porque de cada decisao de design.

## Erros de diagnostico a nao repetir
- afirmar "o binario do Mac e antigo, por isso falhou" sem prova: era inferencia, nao fato;
- confundir fonte versus binario publicado, e layout de dev (`.nemesis/target/release/`) versus distribuido (`.nemesis/bin/`);
- propor solucao "elegante" (allowlist de exec por basename) que, sob escrutinio, abria vetor.
Regra: provar, nao supor; distinguir o que e fonte do que e distribuido; nunca tratar uma decisao de design deliberada como defeito acidental.
