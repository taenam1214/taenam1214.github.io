import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { skills, skillHighlights } from '../../data/skills';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainerVariant, staggerItemVariant } from '../../utils/animations';
import { CardSpotlight } from '../ui/card-spotlight';

const Skills = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          variants={staggerContainerVariant}
        >
          {/* Section Title */}
          <motion.div variants={staggerItemVariant} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-magenta to-cyan-500">Expertise</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Technologies and tools I work with
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-magenta to-cyan-500 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={staggerItemVariant}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {skillHighlights.map((highlight, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-magenta/20 to-cyan-500/20 border border-magenta/30 text-white font-medium"
              >
                {highlight}
              </motion.span>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {skills.map((skillCategory, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={staggerItemVariant}
              >
                <SkillCategory
                  category={skillCategory}
                  index={categoryIndex}
                  hasIntersected={hasIntersected}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillCategory = ({ category, index, hasIntersected }) => {
  const progressRefs = useRef([]);

  useEffect(() => {
    if (!hasIntersected) return;

    category.items.forEach((skill, i) => {
      const progressBar = progressRefs.current[i];
      if (!progressBar) return;

      gsap.fromTo(
        progressBar,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.5,
          delay: index * 0.2 + i * 0.1,
          ease: 'power3.out',
        }
      );
    });
  }, [hasIntersected, category.items, index]);

  return (
    <CardSpotlight className="p-6 h-full">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-magenta rounded-full animate-pulse" />
        {category.category}
      </h3>

      <div className="space-y-4">
        {category.items.map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: skillIndex * 0.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{skill.icon}</span>
                <span className="text-white font-medium">{skill.name}</span>
              </div>
              <span className="text-sm text-white/50">{skill.level}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                ref={(el) => (progressRefs.current[skillIndex] = el)}
                className="h-full bg-gradient-to-r from-magenta to-cyan-500 rounded-full"
                style={{ width: '0%' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </CardSpotlight>
  );
};

export default Skills;
