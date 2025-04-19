import React from 'react';
import RotatingText from '../../shared/RotatingText';
import TrueFocus from '../../shared/TrueFocus';
import { useTheme } from '../../../hooks/useTheme';

const Home = () => {
  const [theme] = useTheme();

  return (
    <div className={`space-y-8 theme-${theme} p-4 md:p-8 w-full max-w-[90%] mx-auto min-h-screen flex flex-col justify-center`}>
      <section className="text-center w-full" data-aos="fade-down" data-aos-duration="1000">
        <TrueFocus
          sentence="Fernando Moreira"
          borderColor="var(--finder-accent)"
          glowColor="var(--finder-accent)"
          blurAmount={3}
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
        <p className="text-xl sm:text-2xl md:text-xl text-[var(--finder-text-secondary)]" data-aos="fade-up" data-aos-delay="400">
          Desenvolvedor front-end
        </p>
      </section>

      <div className="flex items-center justify-center min-h-[40vh] md:min-h-[60vh] w-full" data-aos="zoom-in" data-aos-duration="800">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-3xl sm:text-4xl md:text-[73px] w-full">
          <h1 className="font-[900] text-[var(--finder-accent)] w-full md:w-auto text-center md:text-left" data-aos="fade-right" data-aos-delay="200">
            fernando.dev
          </h1>
          <div className="w-full md:w-auto flex items-center justify-center" data-aos="fade-left" data-aos-delay="400">
            <RotatingText
              texts={['React', 'JavaScript', 'Components', 'Hooks', 'Pixel Perfect', 'Tailwind', 'SEO', 'Front-end']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-[var(--finder-accent)] text-black overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg text-3xl sm:text-4xl md:text-[53px] font-[900] w-full"
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
    </div>
  );
};

export default Home; 