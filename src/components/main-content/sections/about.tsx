"use client";

import about from "@/data/i18n/about.json";
import { useLocale } from "@/hooks/use-locale";
import { useTheme } from "@/hooks/use-theme";
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
import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useState } from "react";

interface Topic {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  content: string;
}

const topicIcons: ComponentType<SVGProps<SVGSVGElement>>[] = [
  UserIcon,
  ClockIcon,
  CodeBracketIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  BoltIcon,
  CpuChipIcon,
];

const About = () => {
  const [activeTopic, setActiveTopic] = useState(0);
  const [folderOpen, setFolderOpen] = useState(false);
  const [motionOk, setMotionOk] = useState(true);
  const [theme] = useTheme();
  const locale = useLocale();
  const t = about[locale];

  const topics: Topic[] = t.topics.map((topic, index) => ({
    title: topic.title,
    content: topic.content,
    icon: topicIcons[index],
  }));

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleTopicClick = (index: number) => {
    if (index !== activeTopic) {
      setActiveTopic(index);
      setFolderOpen(false);
    } else {
      setFolderOpen((prev) => !prev);
    }
  };

  const ActiveIcon = topics[activeTopic].icon;
  const folderIconPath = `/icons/icon-macos-folder-${theme}.webp`;

  return (
    <div className="w-full p-2 md:p-8">
      <div
        className="mac-window relative w-full md:max-w-[920px] md:min-h-[520px] mx-auto flex flex-col"
        data-aos="fade-up"
      >
        <div className="mac-window-titlebar">
          <img src="/icons/icon-close.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-minimize.svg" width={12} height={12} alt="" />
          <img src="/icons/icon-mac-maximize.svg" width={12} height={12} alt="" />
          <span className="mac-window-title">{t.windowTitle}</span>
        </div>

        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          <nav
            aria-label={t.navAriaLabel}
            className="flex md:flex-col gap-1 md:w-[210px] shrink-0 overflow-x-auto md:overflow-x-visible p-2 md:p-3 bg-finder-header md:border-r border-b md:border-b-0 border-finder-border"
          >
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              const isActive = activeTopic === index;
              return (
                <button
                  type="button"
                  key={topic.title}
                  onClick={() => handleTopicClick(index)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-finder-accent ${
                    isActive
                      ? "bg-finder-accent text-finder-accent-contrast"
                      : "text-finder-text hover:bg-finder-hover"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 " />
                  {topic.title}
                </button>
              );
            })}
          </nav>

          <div className="flex-1 min-w-0 px-5 py-6 md:px-8 md:py-8 overflow-y-auto scrollbar-finder">
            <AnimatePresence mode="wait">
              {!folderOpen ? (
                <motion.div
                  key={`folder-${activeTopic}`}
                  className="flex flex-col items-center justify-center min-h-[200px]"
                  initial={motionOk ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  exit={motionOk ? { opacity: 0 } : undefined}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    type="button"
                    onClick={() => setFolderOpen(true)}
                    aria-label={`Abrir pasta ${topics[activeTopic].title}`}
                    className="focus-visible:outline-2 focus-visible:outline-finder-accent rounded-lg"
                  >
                    <motion.img
                      src={folderIconPath}
                      width={64}
                      height={64}
                      alt=""
                      className="drop-shadow-lg brightness-150"
                      animate={motionOk ? { scale: [1, 1.08, 1] } : undefined}
                      transition={
                        motionOk
                          ? { duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                          : undefined
                      }
                    />
                  </button>
                  <p className="mt-4 text-[13px] text-finder-text-secondary">{t.folderHint}</p>
                </motion.div>
              ) : (
                <motion.div
                  key={`content-${activeTopic}`}
                  initial={motionOk ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={motionOk ? { opacity: 0 } : undefined}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-finder-accent/15 text-finder-accent">
                      <ActiveIcon className="w-5 h-5" />
                    </span>
                    <h2 className="text-lg font-semibold text-finder-text">
                      {topics[activeTopic].title}
                    </h2>
                  </div>
                  <p className="max-w-[600px] text-[15px] leading-relaxed text-finder-text-secondary">
                    {topics[activeTopic].content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="border-t border-finder-border bg-finder-header">
          <p className="w-full text-center text-finder-text-secondary italic text-xs px-4 py-3">
            {t.quote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
