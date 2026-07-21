"use client";

import RotatingText from "@/components/ui/rotating-text";
import TrueFocus from "@/components/ui/true-focus";
import { useNavigation } from "@/hooks/use-navigation";
import { useTheme } from "@/hooks/use-theme";

const Home = () => {
  const [theme] = useTheme();
  const { navigate } = useNavigation();

  return (
    <div className={`space-y-6 md:space-y-8 theme-${theme} p-4 md:p-8 w-full max-w-[90%] mx-auto`}>
      <section className="text-center w-full" data-aos="fade-down" data-aos-duration="1000">
        <TrueFocus
          sentence="Fernando Moreira"
          borderColor="var(--finder-accent)"
          glowColor="var(--finder-accent)"
          blurAmount={2}
          animationDuration={2}
          pauseBetweenAnimations={3}
        />
        <p
          className="text-xl sm:text-2xl md:text-xl text-finder-text-secondary"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Full-Stack TypeScript · Rust · Segurança
        </p>
        <p
          className="mt-3 text-sm md:text-base text-finder-text-secondary max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          Autor do Nemesis Defender, framework open-source de segurança para agentes de IA em Rust e
          eBPF. Construo interfaces, design systems e backends com segurança por padrão.
        </p>
      </section>

      <div
        className="flex items-center justify-center w-full"
        data-aos="zoom-in"
        data-aos-duration="800"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          <h1
            className="font-dos font-[900] text-finder-accent w-full md:w-auto text-center md:text-left"
            style={{ fontSize: "clamp(2.25rem, 7vw, 4.5rem)" }}
            data-aos="fade-right"
            data-aos-delay="200"
          >
            fernando.dev
          </h1>
          <div
            className="w-full md:w-auto flex items-center justify-center"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <RotatingText
              texts={[
                "TypeScript",
                "React 19",
                "Next.js",
                "Rust",
                "Segurança",
                "Clean Architecture",
                "eBPF",
                "Full-Stack",
              ]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-finder-accent text-finder-accent-contrast overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg text-[clamp(1.75rem,5.5vw,3.25rem)] font-[900] w-max max-w-full mx-auto"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </div>
      </div>

      {/* CTAs principais para quem chega pela primeira vez */}
      <div
        className="flex flex-wrap items-center justify-center gap-3 pb-8"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="px-5 py-2 rounded-lg bg-finder-accent text-finder-accent-contrast text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
        >
          Ver projetos
        </button>
        <button
          type="button"
          onClick={() => navigate("/contact")}
          className="px-5 py-2 rounded-lg border border-finder-border text-finder-text text-sm font-medium hover:bg-finder-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-finder-accent"
        >
          Entrar em contato
        </button>
      </div>
    </div>
  );
};

export default Home;
