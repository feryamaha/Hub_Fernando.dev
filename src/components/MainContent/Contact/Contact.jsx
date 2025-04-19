import React, { useRef, useEffect, useState } from 'react';
import { EnvelopeIcon, PhoneIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Crosshair from './Crosshair';
import { useTheme } from '../../../hooks/useTheme';
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import TrueFocus from './TrueFocus';

const Contact = () => {
  const containerRef = useRef(null);
  const [theme] = useTheme();
  const [copied, setCopied] = useState(false);
  const email = 'fernandomoreira.dev@gmail.com';

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: (
        <svg className="w-6 h-6 group-hover:animate-shake" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com/feryamaha',
      color: '#181717'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6 group-hover:animate-shake" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065c0-1.138.92-2.063 2.063-2.063c1.14 0 2.064.925 2.064 2.063c0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: 'https://www.linkedin.com/in/feryamaha/',
      color: '#0077B5'
    },
    {
      name: 'X (Twitter)',
      icon: (
        <svg className="w-6 h-6 group-hover:animate-shake" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: 'https://x.com/_feryamaha',
      color: '#000000'
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-6 h-6 group-hover:animate-shake" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51c-.173-.008-.371-.01-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      url: 'https://wa.me/seu-numero',
      color: '#25D366'
    },
    {
      name: 'Email',
      icon: <EnvelopeIcon className="w-6 h-6 group-hover:animate-shake" />,
      url: 'mailto:seu-email@exemplo.com',
      color: '#EA4335'
    }
  ];

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen p-8 theme-${theme} relative overflow-hidden`}
    >
      <Crosshair containerRef={containerRef} color="var(--finder-accent)" />
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-[var(--finder-accent)] mb-12 text-center" data-aos="fade-down" data-aos-delay="100">
          Vamos Conversar
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--finder-accent)]/5 hover:bg-[var(--finder-accent)]/10 transition-all duration-300"
              style={{ '--hover-color': link.color }}
              data-aos="fade-right"
              data-aos-delay={`${index * 200 + 200}`}
            >
              <div className="text-[var(--finder-accent)] group-hover:text-[var(--hover-color)] transition-colors duration-300">
                {link.icon}
              </div>
              <span className="mt-2 text-sm text-[var(--finder-accent)]/80 group-hover:text-[var(--hover-color)] transition-colors duration-300">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="text-[var(--finder-accent)]/80" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            <TrueFocus 
              sentence="Sinta-se à vontade para entrar em contato através de qualquer uma das redes acima. Estou sempre aberto a novas oportunidades e colaborações."
              manualMode={true}
              blurAmount={3}
              borderColor="var(--finder-accent)"
              glowColor="rgba(var(--finder-accent-rgb), 0.6)"
              animationDuration={0.3}
              pauseBetweenAnimations={0.5}
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="text-[var(--finder-accent)]/80" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            <button
              onClick={handleCopyEmail}
              className={`flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors ${copied ? 'text-green-500' : ''}`}
            >
              <EnvelopeIcon className="h-5 w-5" />
              <span>{email}</span>
              <span className={`text-sm text-green-500 transition-opacity ${copied ? 'opacity-100' : 'opacity-0'}`}>
                Copied!
              </span>
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="text-[var(--finder-accent)]/80" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <PhoneIcon className="h-5 w-5" />
              <span>+55 (11) 97317-1909</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 