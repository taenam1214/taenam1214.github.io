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

      // Extract number from value (e.g., "1.8 Million+" -> 1.8, "20+" -> 20)
      const numMatch = stat.value.match(/^[\d.]+/);
      if (!numMatch) {
        element.innerText = stat.value;
        return;
      }

      const numValue = parseFloat(numMatch[0]);
      const suffix = stat.value.slice(numMatch[0].length); // e.g., " Million+" or "+"

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

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-dark-50/30">
        <BackgroundBeams />
      </div>

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          variants={staggerContainerVariant}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={staggerItemVariant} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-magenta to-cyan-500">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-magenta to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          {/* Bio Card */}
          <motion.div
            variants={staggerItemVariant}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 mb-12 hover:border-magenta/50 transition-colors duration-300"
          >
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              {aboutContent.bio}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutContent.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-white/70"
                >
                  <div className="w-2 h-2 bg-magenta rounded-full flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerItemVariant}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {aboutContent.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:border-magenta/50 hover:scale-105 transition-all duration-300"
              >
                <div
                  ref={(el) => (statsRef.current[index] = el)}
                  className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-magenta to-cyan-500 mb-2"
                >
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
