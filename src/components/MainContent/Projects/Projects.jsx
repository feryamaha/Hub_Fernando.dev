import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../hooks/useTheme';
import AOS from 'aos';
import 'aos/dist/aos.css';

const projects = [
  {
    id: 1,
    title: "WHFF-enD",
    description: "Um site de portfólio moderno construído com React e Tailwind CSS, apresentando elementos de UI no estilo macOS e animações suaves.",
    image: "/icons/img_projetc_whffend.webp",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Heroicons"],
    demoLink: "https://whff-end.demo",
    githubLink: "https://github.com/username/WHFF-enD"
  },
  {
    id: 2,
    title: "Alpha - Auclan Design",
    description: "Solução completa para gerenciamento de projetos e equipes com foco em produtividade e colaboração.",
    image: "/icons/img_project_alpha.webp",
    technologies: ["Next.js", "Node.js", "MongoDB", "AWS"],
    demoLink: "https://alpha-project.demo",
    githubLink: "https://github.com/username/alpha-project"
  },
  {
    id: 3,
    title: "AutoDataF",
    description: "Plataforma de análise e visualização de dados automotivos com relatórios personalizados.",
    image: "/icons/img_project_autodataf.webp",
    technologies: ["React", "Python", "Pandas", "Chart.js"],
    demoLink: "https://autodataf.demo",
    githubLink: "https://github.com/username/autodataf"
  },
  {
    id: 4,
    title: "MLX Capital - Auclan Design",
    description: "Sistema de machine learning para análise preditiva e otimização de processos.",
    image: "/icons/img_project_mlx.webp",
    technologies: ["Python", "TensorFlow", "Scikit-learn", "FastAPI"],
    demoLink: "https://mlx-platform.demo",
    githubLink: "https://github.com/username/mlx-platform"
  },
  {
    id: 5,
    title: "Vega - Auclan Design",
    description: "Plataforma de gestão empresarial integrada com foco em automação e eficiência.",
    image: "/icons/img_project_vega.webp",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Docker"],
    demoLink: "https://vega-system.demo",
    githubLink: "https://github.com/username/vega-system"
  }
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme] = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false
    });
  }, []);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div 
      className={`min-h-screen theme-${theme}`}
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="max-w-7xl mx-auto relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="w-full flex-shrink-0 px-[1%]"
              data-aos={index === currentIndex ? "fade-left" : ""}
              data-aos-delay={index === currentIndex ? "200" : ""}
            >
              <div className="relative h-[400px] md:h-[600px] rounded-[30px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-[30px]"
                  data-aos={index === currentIndex ? "zoom-in" : ""}
                  data-aos-delay={index === currentIndex ? "300" : ""}
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[var(--finder-accent)]/10 to-transparent backdrop-blur-sm hidden md:block"
                  data-aos={index === currentIndex ? "fade-up" : ""}
                  data-aos-delay={index === currentIndex ? "400" : ""}
                >
                  <div className="space-y-2 md:space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--finder-accent)]">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--finder-accent)]/80">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm bg-[var(--finder-accent)] text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 md:gap-4 mt-4 md:mt-6">
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 md:px-4 py-1 md:py-2 rounded-lg bg-[var(--finder-accent)] text-white hover:bg-[var(--finder-accent)]/90 transition-colors text-sm md:text-base"
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 md:px-4 py-1 md:py-2 rounded-lg bg-[var(--finder-accent)]/10 text-[var(--finder-accent)] hover:bg-[var(--finder-accent)]/20 transition-colors text-sm md:text-base"
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botões de navegação e informações do projeto em mobile */}
        <div className="md:hidden">
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="p-2 rounded-full bg-[var(--finder-accent)] text-white hover:bg-[var(--finder-accent)]/90 transition-colors"
              onClick={handlePrevSlide}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              className="p-2 rounded-full bg-[var(--finder-accent)] text-white hover:bg-[var(--finder-accent)]/90 transition-colors"
              onClick={handleNextSlide}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Informações do projeto em mobile */}
          <div className="mt-4 p-4">
            <h3 className="text-xl font-bold text-[var(--finder-accent)]">
              {projects[currentIndex].title}
            </h3>
            <p className="text-sm text-[var(--finder-accent)]/80 mt-2">
              {projects[currentIndex].description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {projects[currentIndex].technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full text-xs bg-[var(--finder-accent)] text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <a
                href={projects[currentIndex].demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 rounded-lg bg-[var(--finder-accent)] text-white hover:bg-[var(--finder-accent)]/90 transition-colors text-sm"
              >
                Live Demo
              </a>
              <a
                href={projects[currentIndex].githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 rounded-lg bg-[var(--finder-accent)]/10 text-[var(--finder-accent)] hover:bg-[var(--finder-accent)]/20 transition-colors text-sm"
              >
                View Code
              </a>
            </div>
          </div>
        </div>

        {/* Botões de navegação em desktop */}
        <div className="hidden md:block">
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--finder-accent)] text-white hover:bg-[var(--finder-accent)]/90 transition-colors"
            onClick={handlePrevSlide}
            data-aos="fade-right"
            data-aos-delay="500"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--finder-accent)] text-white hover:bg-[var(--finder-accent)]/90 transition-colors"
            onClick={handleNextSlide}
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects; 