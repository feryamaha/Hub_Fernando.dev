// Este arquivo é responsável por exibir a seção "Sobre" do portfólio.
// Ele utiliza animações (AOS) para criar transições suaves e dinâmicas nos elementos.
// Também gerencia a exibição de informações organizadas em abas, com base no tema selecionado.

import { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme'; // Hook para gerenciar o tema da aplicação
import AOS from 'aos'; // Biblioteca para animações baseadas em scroll
import 'aos/dist/aos.css'; // Estilos padrão da biblioteca AOS
import './About.css'; // Estilos personalizados para o componente "About"

const About = () => {
    // Obtém o tema atual (claro ou escuro) usando o hook `useTheme`
    const [theme] = useTheme();
    // Estado para controlar a aba ativa
    const [activeTab, setActiveTab] = useState(0);

    // Inicializa a biblioteca AOS para animações baseadas em scroll
    useEffect(() => {
        AOS.init({
            duration: 800, // Define a duração das animações em milissegundos
            easing: 'ease-out', // Define a curva de suavização para as animações
            once: true, // Garante que as animações ocorram apenas uma vez
        });
    }, []);

    // Dados das abas que serão exibidas na seção "Sobre"
    // Cada aba contém um título e uma descrição detalhada com tom informal e técnico sobre as habilidades do desenvolvedor
    const folders = [
        {
            title: 'Apresentação',
            content:
                'Oi, eu sou um Desenvolvedor Front-End que curte criar interfaces legais e funcionais. Meu foco é em produto, UX/UI, Pixel Perfect, detalhismo e lógica. Gosto de trabalhar na construção de projetos que realmente façam sentido para quem usa, misturando design e código de um jeito que fique bonito e prático. Já trabalhei em vários tipos de projetos, desde sites simples até aplicações mais complexas, e tô sempre aprendendo algo novo.',
        },
        {
            title: 'Especialidade',
            content:
                'Minha especialidade é pegar uma ideia ou design e transformar em um produto digital que funcione bem e seja bonito de ver. Trabalho bastante com Next.js, React, Typescript e Tailwind, e sou muito bom em fazer interfaces responsivas e fiéis ao design (o famoso pixel perfect). Gosto de usar ferramentas como Figma pra entender melhor o que o designer pensou e já trabalhei em projetos onde precisei criar layouts que ficassem legais tanto no desktop quanto no celular, sem perder a essência do design original.',
        },
        {
            title: 'Visão & Missão',
            content:
                'Minha visão é sempre pensar no usuário final enquanto desenvolvo. Quero criar coisas que sejam fáceis de usar, rápidas e que possam crescer junto com o projeto. Minha missão é entregar um trabalho que tenha qualidade técnica, mas que também seja algo que o usuário goste de interagir. Pra mim, um bom projeto é aquele que roda bem, não dá dor de cabeça pra dar manutenção e ainda faz o usuário sorrir e nao reclame enquanto usa – e é nisso que eu miro quando tô codando.',
        },
        {
            title: 'Produto & UX',
            content:
                'Gosto de criar soluções que juntam tecnologia, design e usabilidade de um jeito que faça sentido pro usuário e pro negócio. Trabalho de olho no que o usuário precisa e no que o cliente quer alcançar. Já colaborei com designers pra transformar protótipos em interfaces funcionais, ajustando detalhes pra garantir que a experiência seja fluida. Por exemplo, já ajustei formulários pra ficarem mais intuitivos e fáceis de preencher, o que deixou os usuários mais satisfeitos e reduziu erros no preenchimento.',
        },
        {
            title: 'Pixel Perfect',
            content:
                'Sou bem detalhista quando o assunto é visual. Gosto de garantir que cada botão, cada margem e cada cor esteja exatamente como no design, sem deixar nada fora do lugar. Também me preocupo com responsividade e acessibilidade – testo em vários tamanhos de tela e uso ferramentas pra checar se tá tudo acessível, como contraste de cores e suporte pra leitores de tela. Já peguei designs complexos e deixei tudo certinho, até o último pixel, pra garantir que o resultado final fosse o mais próximo possível do que foi planejado.',
        },
        {
            title: 'Análise & Lógica',
            content:
                'Sou bom em analisar problemas e encontrar soluções práticas, sempre pensando no que faz mais sentido pro projeto. Quando algo não tá funcionando, gosto de investigar a fundo, entender o porquê e resolver de um jeito que seja eficiente. Por exemplo, já otimizei o carregamento de imagens em um site que tava lento, usando lazy loading e compressão, e isso fez a página carregar bem mais rápido, sem perder qualidade. Gosto de tomar decisões baseadas em testes e boas práticas.',
        },
        {
            title: 'Arquitetura',
            content:
                'Quando monto um projeto, penso em deixá-lo organizado e fácil de mexer no futuro. Gosto de usar componentização no React pra criar pedaços reutilizáveis de código, o que facilita bastante na hora de adicionar algo novo ou fazer ajustes. Já trabalhei em projetos onde dividi o código em módulos menores, o que ajudou a equipe a trabalhar melhor e evitou aquela bagunça que às vezes acontece em projetos grandes. Meu foco é sempre deixar tudo bem estruturado e pronto pra crescer.',
        },
        {
            title: 'Automação',
            content:
                'Adoro automatizar tarefas pra facilitar o trabalho e garantir que as entregas sejam consistentes. Uso ferramentas como GitHub Actions pra criar pipelines que rodam testes e fazem deploy automaticamente. Já configurei testes automáticos com Jest pra checar se o código tá funcionando direitinho antes de subir pra produção. Isso economiza um tempo danado e ajuda a evitar aqueles bugs chatos que aparecem do nada. Meu objetivo é deixar o processo o mais tranquilo e confiável possível.',
        },
    ];

    return (
        <div className={`w-full p-2 md:p-8 theme-${theme}`}>
            {/* Card principal que contém as abas e o conteúdo */}
            <div
                className="relative w-full md:max-w-[920px] h-[85vh] md:h-[520px]  mx-auto bg-[rgba(30,30,30,0.9)] rounded-lg shadow-lg overflow-x-auto overflow-y-hidden border border-gray-700 flex flex-col "
                data-aos="fade-up"
            >
                {/* Semáforo (círculos coloridos no topo à esquerda, simulando uma janela do macOS) */}
                <div className="absolute top-4 left-4 flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                {/* Cabeçalho do card, contendo a imagem (removida) e as abas */}
                <div className="flex items-start p-2">
                    {/* Container das abas, com largura máxima de 95% e centralizado horizontalmente */}
                    <div className="flex flex-col flex-1 max-w-[95%] mx-auto pt-12 overflow-x-auto ">
                        {/* Abas de navegação, exibidas em linha com largura ajustada ao conteúdo */}
                        <div className="w-max flex space-x-10 rounded-lg border-gray-600 p-3">
                            {folders.map((folder, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(index)}
                                    className={`pb-3 text-sm font-medium transition-colors duration-200 border-b-2 w-[120px] whitespace-nowrap${
                                        activeTab === index
                                            ? 'text-[var(--finder-text)] border-[var(--finder-accent)]' // Cor do texto e borda baseadas no tema ativo
                                            : 'text-gray-500  border-gray-600 hover:text-gray-500'
                                    }`}
                                >
                                    {folder.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Área de conteúdo da aba ativa, ocupando o espaço restante com rolagem */}
                <div className="flex justify-center items-center flex-grow px-4 py-8 overflow-y-auto">
                    <div className="max-w-[620px] text-gray-300 leading-tight">
                        <p className="text-right text-gray-300 text-base md:text-xl tracking-wide indent-9">
                            {folders[activeTab].content}
                        </p>
                    </div>
                </div>

                {/* Footer com a mensagem fixa, estilizada com opacidade reduzida e altura dinâmica */}
                <div className="h-max p-[3px] flex items-center border-t border-gray-600 text-center">
                    <p className="w-full text-gray-400 italic text-sm opacity-70">
                        "Meu objetivo é criar produtos digitais que encantam pelo visual, pela
                        experiência e pela robustez técnica."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
