"use client";

import {
  BoltIcon,
  ClockIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import AOS from "aos";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useState } from "react";

interface Topic {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  content: string;
}

const topics: Topic[] = [
  {
    title: "Apresentação",
    icon: UserIcon,
    content:
      "Sou desenvolvedor Full-Stack TypeScript (React/Next.js) com foco em segurança por padrão e governança determinística de agentes de IA. Construo desde interfaces e design systems até camadas de backend (BFF) e enforcement de baixo nível. Sou autor e mantenedor único do Nemesis Defender, um framework open-source de segurança escrito em Rust com camada de kernel em eBPF. Sigo me aprofundando em fundamentos formais, unindo prática de produção à teoria.",
  },
  {
    title: "Trajetória",
    icon: ClockIcon,
    content:
      "Antes do software, foram 17 anos em metrologia dimensional (GD&T avançado, CMM, engenharia reversa) garantindo precisão milimétrica e conformidade de qualidade. Essa base molda meu trabalho até hoje: contratos explícitos, baixa tolerância a ambiguidade e qualidade verificável. Migrei para o desenvolvimento de software como autodidata desde 2022 e hoje atuo como Full-Stack na Auclan Design.",
  },
  {
    title: "Especialidade",
    icon: CodeBracketIcon,
    content:
      "Minha especialidade é levar uma ideia ao produto digital completo: TypeScript em strict mode, React 19 e Next.js com App Router e React Server Components, Tailwind e design systems com contratos explícitos. Trabalho com arquitetura em camadas (UI → Hooks → Services → Types) e BFF via Route Handlers, mantendo credenciais e regras sensíveis exclusivamente no servidor. Da interface fiel ao design até a API, entrego software que funciona e que se mantém.",
  },
  {
    title: "Arquitetura",
    icon: CubeTransparentIcon,
    content:
      "Penso projetos para serem escaláveis e fáceis de evoluir. Uso Clean Architecture, separação rigorosa de responsabilidades e contratos TypeScript explícitos entre as camadas. No frontend, design systems com tokens semânticos e mais de 160 componentes tipados; no backend, BFF mantendo o que é sensível fora do cliente. Baixa tolerância a ambiguidade: cada limite do sistema é declarado, não presumido.",
  },
  {
    title: "Segurança",
    icon: ShieldCheckIcon,
    content:
      "Segurança não é etapa final, é padrão de projeto. Aplico OWASP Top 10 e OWASP Top 10 for LLM, CSP Level 3 com nonce dinâmico, HSTS, X-Frame-Options e Permissions-Policy, além de validação em runtime com Zod, modelagem de ameaças e segurança de supply-chain. Penso em enforcement em runtime e design fail-closed: o sistema falha fechado, nunca aberto. Tenho certificações em OWASP Top 10 for LLM e AI Governance.",
  },
  {
    title: "Nemesis Defender",
    icon: ShieldExclamationIcon,
    content:
      "Projetei e implementei sozinho o Nemesis Defender: um framework de enforcement de segurança em três camadas independentes (pre-tool hooks, scanner de conteúdo e LSM em eBPF no kernel Linux) que bloqueia comandos destrutivos e malware de supply-chain antes da execução. Em produção há cerca de 1,5 ano com agentes LLM operando sobre o código — zero comandos destrutivos executados e zero acessos não autorizados. Inclui pipeline de varredura em 6 estágios, 18 visitors, +2.000 bloqueios reais no kernel e uma suíte autoral de 184 testes em 26 módulos.",
  },
  {
    title: "Performance",
    icon: BoltIcon,
    content:
      "Otimizo do bundle ao kernel. Com React Server Components, SSR, SSG e ISR alcanço scores Lighthouse na faixa de 90+ e reduções de ~20–30% no bundle, de olho em LCP e TTI. Trato performance como contrato verificável, medido e versionado — não como impressão subjetiva. A mesma disciplina vale para o baixo nível: análise estática, parsing e enforcement em runtime com custo previsível.",
  },
  {
    title: "IA & Agentic",
    icon: CpuChipIcon,
    content:
      "Desenvolvo com IA sob governança arquitetural explícita. Uso Claude Code, Cursor, Windsurf, Codex e o Vercel AI SDK para features, refactors, correções e documentação — sempre com contratos claros sobre o que o agente pode e não pode fazer. Foi justamente trabalhando com agentes LLM que nasceu o Nemesis Defender: governar a autonomia do modelo de forma determinística, não confiar nela cegamente.",
  },
];

const About = () => {
  const [activeTopic, setActiveTopic] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);

  const ActiveIcon = topics[activeTopic].icon;

  return (
    <div className="w-full p-2 md:p-8">
      <div
        className="mac-window relative w-full md:max-w-[920px] md:min-h-[520px] mx-auto flex flex-col"
        data-aos="fade-up"
      >
        {/* Barra de título (janela macOS) */}
        <div className="mac-window-titlebar">
          <span className="traffic-light close" />
          <span className="traffic-light minimize" />
          <span className="traffic-light maximize" />
          <span className="mac-window-title">Sobre — Fernando Moreira</span>
        </div>

        {/* Corpo: sidebar de tópicos (estilo Ajustes do Sistema) + conteúdo */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          {/* Tópicos: lista vertical no desktop, chips roláveis no mobile */}
          <nav
            aria-label="Tópicos sobre mim"
            className="flex md:flex-col gap-1 md:w-[210px] shrink-0 overflow-x-auto md:overflow-x-visible p-2 md:p-3 bg-[var(--finder-header)] md:border-r border-b md:border-b-0 border-[var(--finder-border)]"
          >
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              const isActive = activeTopic === index;
              return (
                <button
                  type="button"
                  key={topic.title}
                  onClick={() => setActiveTopic(index)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--finder-accent)] ${
                    isActive
                      ? "bg-[var(--finder-accent)] text-white"
                      : "text-[var(--finder-text)] hover:bg-[var(--finder-hover)]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {topic.title}
                </button>
              );
            })}
          </nav>

          {/* Conteúdo do tópico ativo */}
          <div className="flex-1 min-w-0 px-5 py-6 md:px-8 md:py-8 overflow-y-auto scrollbar-finder">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--finder-accent)]/15 text-[var(--finder-accent)]">
                <ActiveIcon className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-semibold text-[var(--finder-text)]">
                {topics[activeTopic].title}
              </h2>
            </div>
            <p className="max-w-[600px] text-[15px] leading-relaxed text-[var(--finder-text-secondary)]">
              {topics[activeTopic].content}
            </p>
          </div>
        </div>

        {/* Rodapé da janela */}
        <div className="border-t border-[var(--finder-border)] bg-[var(--finder-header)]">
          <p className="w-full text-center text-[var(--finder-text-secondary)] italic text-xs px-4 py-3">
            "Precisão na interface. Segurança na arquitetura. Evidência em cada decisão."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
