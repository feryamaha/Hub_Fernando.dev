"use client";

import { useTheme } from "@/hooks/use-theme";
import AOS from "aos";
import { useEffect, useState } from "react";

interface Folder {
  title: string;
  content: string;
}

const folders: Folder[] = [
  {
    title: "Apresentação",
    content:
      "Sou Engenheiro de Software Full-Stack com foco em TypeScript (React/Next.js), segurança por padrão e governança determinística de agentes de IA. Construo desde interfaces e design systems até camadas de backend (BFF) e enforcement de baixo nível. Sou autor e mantenedor único do Nemesis Defender, um framework open-source de segurança escrito em Rust com camada de kernel em eBPF. Atualmente curso Engenharia de Software, unindo prática de produção a fundamentos formais.",
  },
  {
    title: "Especialidade",
    content:
      "Minha especialidade é levar uma ideia ao produto digital completo: TypeScript em strict mode, React 19 e Next.js com App Router e React Server Components, Tailwind e design systems com contratos explícitos. Trabalho com arquitetura em camadas (UI → Hooks → Services → Types) e BFF via Route Handlers, mantendo credenciais e regras sensíveis exclusivamente no servidor. Da interface fiel ao design até a API, entrego software que funciona e que se mantém.",
  },
  {
    title: "Segurança",
    content:
      "Segurança não é etapa final, é padrão de projeto. Aplico OWASP Top 10 e OWASP Top 10 for LLM, CSP Level 3 com nonce dinâmico, HSTS, X-Frame-Options e Permissions-Policy, além de validação em runtime com Zod, modelagem de ameaças e segurança de supply-chain. Penso em enforcement em runtime e design fail-closed: o sistema falha fechado, nunca aberto. Tenho certificações em OWASP Top 10 for LLM e AI Governance.",
  },
  {
    title: "Nemesis Defender",
    content:
      "Projetei e implementei sozinho o Nemesis Defender: um framework de enforcement de segurança em três camadas independentes (pre-tool hooks, scanner de conteúdo e LSM em eBPF no kernel Linux) que bloqueia comandos destrutivos e malware de supply-chain antes da execução. Em produção há cerca de 1,5 ano com agentes LLM operando sobre o código — zero comandos destrutivos executados e zero acessos não autorizados. Inclui pipeline de varredura em 6 estágios, 18 visitors, +2.000 bloqueios reais no kernel e uma suíte autoral de 184 testes em 26 módulos.",
  },
  {
    title: "Arquitetura",
    content:
      "Penso projetos para serem escaláveis e fáceis de evoluir. Uso Clean Architecture, separação rigorosa de responsabilidades e contratos TypeScript explícitos entre as camadas. No frontend, design systems com tokens semânticos e mais de 160 componentes tipados; no backend, BFF mantendo o que é sensível fora do cliente. Baixa tolerância a ambiguidade: cada limite do sistema é declarado, não presumido.",
  },
  {
    title: "Performance",
    content:
      "Otimizo do bundle ao kernel. Com React Server Components, SSR, SSG e ISR alcanço scores Lighthouse na faixa de 90+ e reduções de ~20–30% no bundle, de olho em LCP e TTI. Trato performance como contrato verificável, medido e versionado — não como impressão subjetiva. A mesma disciplina vale para o baixo nível: análise estática, parsing e enforcement em runtime com custo previsível.",
  },
  {
    title: "IA & Agentic",
    content:
      "Desenvolvo com IA sob governança arquitetural explícita. Uso Claude Code, Cursor, Windsurf, Codex e o Vercel AI SDK para features, refactors, correções e documentação — sempre com contratos claros sobre o que o agente pode e não pode fazer. Foi justamente trabalhando com agentes LLM que nasceu o Nemesis Defender: governar a autonomia do modelo de forma determinística, não confiar nela cegamente.",
  },
  {
    title: "Trajetória",
    content:
      "Antes do software, foram 17 anos em metrologia dimensional (GD&T avançado, CMM, engenharia reversa) garantindo precisão milimétrica e conformidade de qualidade. Essa base molda minha engenharia até hoje: contratos explícitos, baixa tolerância a ambiguidade e qualidade verificável. Migrei para a engenharia de software como autodidata desde 2022 e hoje atuo como Full-Stack na Auclan Design, cursando Engenharia de Software.",
  },
];

const About = () => {
  const [theme] = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <div className={`w-full p-2 md:p-8 theme-${theme}`}>
      <div
        className="relative w-full md:max-w-[920px] h-[85vh] md:h-[520px] mx-auto bg-[rgba(30,30,30,0.9)] rounded-lg shadow-lg overflow-x-auto overflow-y-hidden border border-gray-700 flex flex-col"
        data-aos="fade-up"
      >
        {/* Semáforo (janela macOS) */}
        <div className="absolute top-4 left-4 flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>

        {/* Cabeçalho com as abas */}
        <div className="flex items-start p-2">
          <div className="flex flex-col flex-1 max-w-[95%] mx-auto pt-12 overflow-x-auto">
            <div className="w-max flex space-x-10 rounded-lg border-gray-600 p-3">
              {folders.map((folder, index) => (
                <button
                  type="button"
                  key={folder.title}
                  onClick={() => setActiveTab(index)}
                  className={`pb-3 text-sm font-medium transition-colors duration-200 border-b-2 w-[120px] whitespace-nowrap ${
                    activeTab === index
                      ? "text-[var(--finder-text)] border-[var(--finder-accent)]"
                      : "text-gray-500 border-gray-600 hover:text-gray-500"
                  }`}
                >
                  {folder.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conteúdo da aba ativa */}
        <div className="flex justify-center items-center flex-grow px-4 py-8 overflow-y-auto">
          <div className="max-w-[620px] text-gray-300 leading-tight">
            <p className="text-right text-gray-300 text-base md:text-xl tracking-wide indent-9">
              {folders[activeTab].content}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="h-max p-[3px] flex items-center border-t border-gray-600 text-center">
          <p className="w-full text-gray-400 italic text-sm opacity-70">
            "Disciplina de engenharia: contratos explícitos, baixa tolerância a ambiguidade e
            qualidade verificável — da interface ao kernel."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
