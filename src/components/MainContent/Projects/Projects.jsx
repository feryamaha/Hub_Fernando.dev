'use client';

import { useTheme } from '../../../hooks/useTheme';

const pastProjects = [
    {
        title: 'AUTODATAF',
        description:
            'Projeto pessoal que organiza cursos gratuitos do YouTube para estudo focado de programação, com backend e frontend integrados para uma experiência fluida.',
        technologies: ['React', 'CSS', 'Node.js', 'PostgreSQL'],
        date: 'Março de 2024',
        link: (
            <a
                href="https://autodata-f.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--finder-accent)] underline"
            >
                autodataf.vercel.app
            </a>
        ),
    },
    {
        title: 'MLX CAPITAL',
        description:
            'Construção de interfaces frontend para um cliente da Auclan Design, com ênfase em performance e design pixel perfect, integrando layouts dinâmicos.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        date: 'Novembro de 2024',
        link: (
            <a
                href="https://mlxcapital.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--finder-accent)] underline flex gap-2"
            >
                mlxcapital.com.br{' '}
                <a
                    href="https://auclandesign.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--finder-accent)] underline"
                >
                    auclandesign.com
                </a>
            </a>
        ),
    },
    {
        title: 'ALPHA',
        description:
            'Desenvolvimento do frontend para um cliente da Auclan Design, criando interfaces modernas e responsivas com foco em usabilidade e fidelidade ao design.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        date: 'Dezembro de 2024',
        link: (
            <>
                <span className="flex gap-2">
                    <span className="no-underline italic text-md text-gray-300">
                        Projeto Confidencial da
                    </span>
                    <a
                        href="https://auclandesign.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--finder-accent)] underline flex gap-2"
                    >
                        {' '}
                        auclandesign.com
                    </a>
                </span>
            </>
        ),
    },
    {
        title: 'VEGA',
        description:
            'Desenvolvimento frontend para um sistema da Auclan Design, utilizando SCSS para estilização avançada e garantindo responsividade e acessibilidade.',
        technologies: ['HTML', 'SCSS', 'JavaScript'],
        date: 'Janeiro de 2025',
        link: (
            <>
                <span className="flex gap-2">
                    <a
                        href="https://www.vegasat.com.br/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--finder-accent)] underline flex gap-2"
                    >
                        {' '}
                        vegasat.com.br
                    </a>
                    <a
                        href="https://auclandesign.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--finder-accent)] underline flex gap-2"
                    >
                        {' '}
                        auclandesign.com
                    </a>
                </span>
            </>
        ),
    },
    {
        title: 'Pulse Color',
        description:
            'Projeto pessoal criado para praticar html, css, SASS e JavaScript, focado em design responsivo e interatividade com cores dinâmicas e animações usando javascript puro.',
        technologies: ['HTML', 'SCSS', 'JavaScript'],
        date: 'Fevereiro de 2025',
        link: (
            <a
                href="https://feryamaha.github.io/SASS/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--finder-accent)] underline flex gap-2"
            >
                {' '}
                feryamaha.github.io/SASS/
            </a>
        ),
    },
    {
        title: 'WHFF-enD',
        description:
            'Projeto pessoal de aprendizado em React, funcionando como um hub de conhecimento com foco em conceitos fundamentais, Webpack e Babel para robustez.',
        technologies: ['React', 'SCSS', 'JavaScript'],
        date: 'Abril de 2025',
        link: (
            <a
                href="https://feryamaha.github.io/WHFF-enD/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--finder-accent)] underline flex gap-2"
            >
                {' '}
                feryamaha.github.io/WHFF-enD/
            </a>
        ),
    },
    {
        title: 'Ya Balloons App',
        description:
            'Projeto pessoal em React web, criado especialmente para minhas filhas, com o objetivo de proporcionar uma experiência divertida e interativa. Desenvolvido com Create React App, incorpora testes unitários robustos (Testing Library e Jest) e boas práticas de desenvolvimento, com deploy estático no GitHub Pages para uma aplicação leve e otimizada.',
        technologies: [
            'React 19',
            'Create React App',
            'Testing Library',
            'Jest',
            'JavaScript',
            'GitHub Pages',
        ],
        date: 'Março de 2025',
        link: (
            <a
                href="https://feryamaha.github.io/ya-balloons-app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--finder-accent)] underline flex gap-2"
            >
                feryamaha.github.io/ya-balloons-app
            </a>
        ),
    },
    {
        title: 'NFTs CodeBoost',
        description:
            'Site didático para aprendizado de Next.js (App Router) no curso CodeBoost, com tema de NFTs. Inclui carrosséis interativos (Swiper), ícones modernos (Lucide), componentes acessíveis (Radix UI), e estilização com Tailwind CSS, otimizado por Turbopack e deploy no Vercel.',
        technologies: [
            'Next.js',
            'React',
            'Tailwind',
            'Radix UI',
            'Swiper',
            'Lucide Icons',
            'Turbopack',
        ],
        date: 'Maio de 2025',
        link: (
            <a
                href="https://nf-ts-code-boost.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--finder-accent)] underline"
            >
                nf-ts-code-boost.vercel.app
            </a>
        ),
    },
];

const currentWork = [
    {
        title: 'Trabalho Atual na Auclan Design',
        description:
            'Desenvolvendo componentes para o design system e frontend de sites utilizando Next.js, React, TypeScript e Tailwind. Integração de APIs para funcionalidades dinâmicas, colaborando com equipes de design e desenvolvedores front-end e back-end na Auclan Design.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'API Integration'],
        date: 'Em andamento (2025)',
        link: (
            <a
                href="https://auclandesign.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--finder-accent)] underline flex gap-2"
            >
                {' '}
                auclandesign.com
            </a>
        ),
    },
    {
        title: 'UIKit Design System',
        description:
            'Contribuição na criação e manutenção de um design system na Auclan Design, desenvolvendo componentes reutilizáveis com foco em escalabilidade, acessibilidade e consistência visual.',
        technologies: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
        date: 'Em andamento (2025)',
        link: (
            <a
                href="https://auclandesign.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--finder-accent)] underline flex gap-2"
            >
                {' '}
                auclandesign.com
            </a>
        ),
    },
];

const Projects = () => {
    const [theme] = useTheme();

    return (
        <div className={`w-full p-8 theme-${theme}`}>
            {/* Seção: O que andei fazendo... */}
            <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">
                O que andei fazendo...
            </h2>
            <div className="flex flex-col gap-6 max-w-3xl mx-auto mb-12">
                {pastProjects.map((project, index) => (
                    <div key={index} className="border-l-4 border-[var(--finder-accent)] pl-4">
                        <h3 className="text-xl font-semibold text-[var(--finder-accent)]">
                            {project.title}
                        </h3>
                        <p className="text-sm text-[var(--finder-text)] mt-1">
                            {project.description}
                        </p>
                        <p className="text-sm text-[var(--finder-text)]/80 mt-2">
                            {project.date} |{' '}
                            {project.technologies.map(tech => `#${tech.toLowerCase()}`).join(' ')}
                        </p>
                        <span className="flex gap-2">
                            {' '}
                            Deploy: <p> {project.link} </p>{' '}
                        </span>
                    </div>
                ))}
            </div>

            {/* Seção: O que ando fazendo... */}
            <h2 className="text-2xl font-bold text-[var(--finder-accent)] mb-6">
                O que ando fazendo...
            </h2>
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                {currentWork.map((work, index) => (
                    <div key={index} className="border-l-4 border-[var(--finder-accent)] pl-4">
                        <h3 className="text-xl font-semibold text-[var(--finder-accent)]">
                            {work.title}
                        </h3>
                        <p className="text-sm text-[var(--finder-text)] mt-1">{work.description}</p>
                        <p className="text-sm text-[var(--finder-text)]/80 mt-2">
                            {work.date} |{' '}
                            {work.technologies.map(tech => `#${tech.toLowerCase()}`).join(' ')}
                        </p>
                        <span className="flex gap-2">
                            {' '}
                            Auclan: <p> {work.link} </p>{' '}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
