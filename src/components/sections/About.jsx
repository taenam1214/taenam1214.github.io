import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { BackgroundBeams } from '../ui/background-beams';
import { aboutContent } from '../../data/content';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainerVariant, staggerItemVariant } from '../../utils/animations';

const About = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
  const statsRef = useRef([]);

  // Animate stats counter
  useEffect(() => {
    if (!hasIntersected) return;

    aboutContent.stats.forEach((stat, index) => {
      const element = statsRef.current[index];
      if (!element) return;

      const numMatch = stat.value.match(/^[\d.]+/);
      if (!numMatch) {
        element.innerText = stat.value;
        return;
      }

      const numValue = parseFloat(numMatch[0]);
      const suffix = stat.value.slice(numMatch[0].length);

      gsap.fromTo(
        element,
        { innerText: 0 },
        {
          innerText: numValue,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: numValue % 1 === 0 ? 1 : 0.1 },
          onUpdate: function () {
            const current = this.targets()[0].innerText;
            const display = numValue % 1 === 0 ? Math.ceil(current) : parseFloat(current).toFixed(1);
            element.innerText = display + suffix;
          },
        }
      );
    });
  }, [hasIntersected]);

  // Split the bio into an enlarged lead sentence + the remainder.
  const firstStop = aboutContent.bio.indexOf('. ');
  const lead = firstStop > -1 ? aboutContent.bio.slice(0, firstStop + 1) : aboutContent.bio;
  const rest = firstStop > -1 ? aboutContent.bio.slice(firstStop + 2) : '';

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gray-100/50 dark:bg-dark-50/30">
        <BackgroundBeams />
      </div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasIntersected ? 'visible' : 'hidden'}
          variants={staggerContainerVariant}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={staggerItemVariant} className="mb-14">
            <div className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-cyan-500 mb-3">
              {'// Profile'}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand via-cyan-500 to-azure">Me</span>
            </h2>
          </motion.div>

          {/* Big lead statement — full width */}
          <motion.p
            variants={staggerItemVariant}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-white max-w-6xl text-balance mb-12"
          >
            {lead}
          </motion.p>

          {/* Body + Focus (left)  ·  Spec card (right) */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
            <motion.div variants={staggerItemVariant} className="lg:col-span-7">
              {rest && (
                <p className="text-lg text-gray-600 dark:text-white/70 leading-relaxed mb-8">
                  {rest}
                </p>
              )}

              <div className="font-mono text-xs tracking-[0.2em] uppercase text-cyan-500 mb-4">
                Focus Areas
              </div>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {aboutContent.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 text-gray-700 dark:text-white/75">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 shadow-[0_0_8px_#15e6a0]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* profile.config spec card */}
            <motion.div variants={staggerItemVariant} className="lg:col-span-5">
              <div className="rounded-2xl border border-gray-900/15 dark:border-white/15 bg-white/60 dark:bg-dark-100/70 backdrop-blur-md overflow-hidden">
                <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-900/10 dark:border-white/10">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-2.5 font-mono text-sm text-gray-500 dark:text-white/50">profile.config</span>
                </div>
                <div className="p-7 sm:p-8 font-mono text-base sm:text-lg space-y-4">
                  {[
                    ['name', 'Taenam Kim'],
                    ['role', 'Software Engineer'],
                    ['based', 'Pittsburgh, PA'],
                    ['stack', 'Full-Stack · Systems · AI'],
                    ['now', '@ TeleTracking — Foundry AI'],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[88px_1fr] gap-4">
                      <span className="text-brand tracking-wide">{k}</span>
                      <span className="text-gray-900 dark:text-white">{v}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-[88px_1fr] gap-4 pt-1">
                    <span className="text-brand tracking-wide">status</span>
                    <span className="text-gray-900 dark:text-white flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_10px_#15e6a0] mr-2.5" />
                      building &amp; shipping
                      <span className="inline-block w-[10px] h-[20px] bg-cyan-500 ml-1.5 align-middle animate-[blink_1.1s_steps(1)_infinite]" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={staggerItemVariant}
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-gray-900/10 dark:border-white/10 bg-gray-900/10 dark:bg-white/10"
          >
            {aboutContent.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-100 p-6 md:p-8 text-center group hover:bg-gray-50 dark:hover:bg-dark-50 transition-colors duration-300"
              >
                <div
                  ref={(el) => (statsRef.current[index] = el)}
                  className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand via-cyan-500 to-azure mb-2 tracking-tight"
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-gray-500 dark:text-white/55">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
