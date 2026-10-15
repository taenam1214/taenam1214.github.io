import React from 'react';
import { heroContent } from '../../data/content';

// Scrolling tech ticker content (listed once; duplicated in render for a seamless loop)
const TECH = [
  'React', 'TypeScript', 'Node.js', 'Next.js', 'Three.js', 'Kafka',
  'PostgreSQL', 'Redis', 'WebSockets', 'Swift', 'Firebase', 'Python',
  'AI Agents', 'Fastify', 'Docker',
];

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Split the name so the last word gets the gradient highlight.
  const words = heroContent.name.trim().split(/\s+/);
  const lastName = words.pop();
  const firstName = words.join(' ');

  const tickerItems = [...TECH, ...TECH];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="px-[6vw] pt-28 pb-10">
        {/* Eyebrow */}
        <div className="font-mono text-xs sm:text-sm tracking-[0.4em] uppercase text-cyan-500 mb-6 animate-[fade_1s_0.2s_both]">
          {heroContent.title} · Full-Stack · Systems
        </div>

        {/* Name — editorial headline with blur-rise + light sweep */}
        <h1 className="font-display font-black leading-[0.86] tracking-[-0.045em] text-[clamp(66px,15vw,215px)]">
          {firstName && (
            <span className="name-mask">
              <span className="name-rise text-gray-900 dark:text-white">{firstName.toUpperCase()}</span>
            </span>
          )}
          <span className="name-mask">
            <span
              className="name-rise name-sheen gradient-text"
              style={{ textShadow: '0 0 80px rgba(34,211,238,0.4)' }}
            >
              {lastName.toUpperCase()}
            </span>
          </span>
        </h1>

        {/* Lead */}
        <p className="max-w-[660px] mt-8 text-[clamp(18px,2.1vw,27px)] font-medium leading-snug text-gray-800 dark:text-white/85 animate-[fade_1s_0.8s_both]">
          {heroContent.tagline}
        </p>

        {/* Sub */}
        <p className="max-w-[620px] mt-4 text-base sm:text-lg text-gray-500 dark:text-white/55 animate-[fade_1s_0.95s_both]">
          {heroContent.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mt-9 animate-[fade_1s_1.1s_both]">
          <button
            onClick={() => scrollToSection('#projects')}
            className="px-7 py-3.5 rounded-full font-semibold text-sm text-dark bg-gradient-to-r from-brand to-azure hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(21,230,160,0.4)] transition-all duration-300"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="px-7 py-3.5 rounded-full font-semibold text-sm text-gray-900 dark:text-white border border-gray-900/20 dark:border-white/20 bg-white/40 dark:bg-white/5 backdrop-blur-sm hover:border-brand hover:shadow-[0_0_24px_rgba(21,230,160,0.3)] transition-all duration-300"
          >
            Get in Touch
          </button>
          <a
            href="/images/TaenamKim_Resume_SWE.pdf"
            download
            className="px-7 py-3.5 rounded-full font-semibold text-sm text-gray-900 dark:text-white border border-gray-900/20 dark:border-white/20 bg-white/40 dark:bg-white/5 backdrop-blur-sm hover:border-cyan-500 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)] transition-all duration-300"
          >
            Résumé
          </a>
        </div>
      </div>

      {/* Tech ticker */}
      <div className="ticker-mask relative z-10 mt-auto border-y border-gray-900/10 dark:border-white/10 bg-white/30 dark:bg-dark/40 backdrop-blur-sm overflow-hidden whitespace-nowrap py-5">
        <div className="ticker-track">
          {tickerItems.map((t, i) => (
            <span key={i} className="font-mono text-[clamp(15px,2vw,22px)] font-medium tracking-wider text-gray-700 dark:text-white/75 px-6">
              {t}
              <span className="text-brand text-sm align-middle ml-6">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
