import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { experiences, experienceCategories } from '../../data/experiences';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainerVariant, staggerItemVariant } from '../../utils/animations';

const Experience = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const filteredExperiences = activeFilter === 'all'
    ? experiences
    : experiences.filter((exp) => exp.type === activeFilter);

  return (
    <section id="experience" className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/5 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasIntersected ? 'visible' : 'hidden'}
          variants={staggerContainerVariant}
        >
          {/* Section Title */}
          <motion.div variants={staggerItemVariant} className="text-center mb-12">
            <div className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-cyan-500 mb-3">
              {'// Timeline'}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand via-cyan-500 to-azure">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              A flight path through my work and education
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-brand via-cyan-500 to-azure mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={staggerItemVariant}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {experienceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-brand to-azure text-dark shadow-lg shadow-brand/30'
                    : 'bg-gray-900/5 dark:bg-white/5 text-gray-700 dark:text-white/70 border border-gray-900/10 dark:border-white/10 hover:border-brand/40'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Timeline */}
          <AnimatePresence mode="wait">
            <TimelineRail key={activeFilter} items={filteredExperiences} />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const TimelineRail = ({ items }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      ref={containerRef}
      className="relative max-w-3xl mx-auto pl-12 sm:pl-16"
    >
      {/* Static rail track */}
      <div className="absolute left-[19px] sm:left-[27px] top-2 bottom-2 w-[2px] bg-gray-900/10 dark:bg-white/10" />
      {/* Animated draw line */}
      <motion.div
        className="absolute left-[19px] sm:left-[27px] top-2 bottom-2 w-[2px] origin-top bg-gradient-to-b from-brand via-cyan-500 to-azure"
        style={{ scaleY: lineScale }}
      />

      {items.map((exp, index) => (
        <ExperienceEntry key={exp.id} exp={exp} index={index} />
      ))}
    </motion.div>
  );
};

const ExperienceEntry = ({ exp, index }) => {
  const isEducation = exp.type === 'education';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative pb-14 last:pb-0 group"
    >
      {/* Star node on the rail */}
      <span
        className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-3.5 h-3.5 rounded-full z-10 ${
          isEducation ? 'bg-azure shadow-[0_0_14px_#3b82f6]' : 'bg-brand shadow-[0_0_14px_#15e6a0]'
        }`}
      >
        <span
          className={`absolute inset-0 rounded-full opacity-70 animate-ping ${
            isEducation ? 'bg-azure' : 'bg-brand'
          }`}
        />
      </span>

      {/* Period · Location */}
      <div className="font-mono text-xs tracking-wider text-cyan-500 mb-1.5">
        {exp.period}
        <span className="text-gray-400 dark:text-white/35"> · {exp.location}</span>
      </div>

      {/* Company + role */}
      <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900 dark:text-white transition-colors duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand group-hover:to-azure">
        {exp.company}
      </h3>
      <div className="text-base sm:text-lg font-medium text-gray-700 dark:text-white/75 mb-3">
        {exp.role}
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-white/65 leading-relaxed mb-4">
        {exp.description}
      </p>

      {/* Achievements */}
      {exp.achievements && (
        <ul className="space-y-2 mb-4">
          {exp.achievements.map((a, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand/70 flex-shrink-0" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech */}
      {exp.technologies && (
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech, i) => (
            <span
              key={i}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-brand/10 text-brand border border-brand/25"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Experience;
