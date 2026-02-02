import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timeline } from '../ui/timeline';
import { experiences, experienceCategories } from '../../data/experiences';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainerVariant, staggerItemVariant } from '../../utils/animations';
import TimelineItem from '../features/TimelineItem';

const Experience = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const filteredExperiences = activeFilter === 'all'
    ? experiences
    : experiences.filter(exp => exp.type === activeFilter);

  return (
    <section id="experience" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-magenta/5 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          variants={staggerContainerVariant}
        >
          {/* Section Title */}
          <motion.div variants={staggerItemVariant} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              My <span className="bg-clip-text text-transparent bg-gradient-to-r from-magenta to-cyan-500">Journey</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              A timeline of my professional experience and educational background
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-magenta to-cyan-500 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={staggerItemVariant}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {experienceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-magenta to-cyan-500 text-white shadow-lg shadow-magenta/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 hover:border-white/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div variants={staggerItemVariant} className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Timeline data={filteredExperiences} activeFilter={activeFilter}>
                  {filteredExperiences.map((experience, index) => (
                    <TimelineItem
                      key={experience.id}
                      experience={experience}
                      index={index}
                    />
                  ))}
                </Timeline>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
