import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { projects, projectCategories } from '../../data/projects';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/01';

const ProjectRow = ({ project, index, reduce }) => {
  const [display, setDisplay] = useState(project.title);
  const intervalRef = useRef(null);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const runScramble = () => {
    if (reduce) return;
    const target = project.title;
    let frame = 0;
    const dur = 20;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(
        target
          .split('')
          .map((c, i) => {
            if (c === ' ') return ' ';
            if (i < frame / (dur / target.length)) return target[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );
      frame += 1;
      if (frame > dur) {
        clearInterval(intervalRef.current);
        setDisplay(target);
      }
    }, 28);
  };

  const meta = [...project.technologies.slice(0, 4), project.year]
    .filter(Boolean)
    .join(' · ')
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={runScramble}
      className="group grid grid-cols-[46px_1fr_auto] md:grid-cols-[70px_14px_1fr_auto] items-center gap-5 md:gap-7 py-7 border-t border-gray-900/10 dark:border-white/[0.13] last:border-b transition-all duration-500 hover:pl-3 hover:bg-gradient-to-r hover:from-brand/[0.07] hover:to-transparent"
    >
      {/* Index */}
      <span className="font-mono text-xl text-gray-400 dark:text-white/40 group-hover:text-brand transition-colors">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Constellation star (desktop only) */}
      <span className="hidden md:block w-3 h-3 rounded-full bg-gray-400/40 dark:bg-white/30 group-hover:bg-cyan-500 group-hover:shadow-[0_0_18px_#22d3ee] group-hover:scale-150 transition-all duration-300" />

      {/* Name + meta */}
      <div className="min-w-0">
        <h3 className="text-2xl sm:text-3xl md:text-[clamp(26px,4vw,52px)] font-bold tracking-tight leading-none text-gray-900 dark:text-white transition-all duration-300 group-hover:translate-x-2.5 group-hover:gradient-text">
          {display}
        </h3>
        <p className="font-mono text-[11px] sm:text-xs text-gray-500 dark:text-white/45 mt-2 tracking-wide truncate">
          {meta}
        </p>
      </div>

      {/* Links */}
      <div className="flex items-center gap-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="p-2.5 rounded-full text-gray-600 dark:text-white/60 hover:text-brand hover:bg-gray-900/5 dark:hover:bg-white/10 transition-colors"
          >
            <IconBrandGithub className="w-5 h-5" />
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            className="p-2.5 rounded-full text-gray-600 dark:text-white/60 hover:text-cyan-500 hover:bg-gray-900/5 dark:hover:bg-white/10 transition-colors"
          >
            <IconExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const reduce = useReducedMotion();

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  // Featured first, then the rest — preserves the original emphasis.
  const ordered = [
    ...filteredProjects.filter((p) => p.featured),
    ...filteredProjects.filter((p) => !p.featured),
  ];

  return (
    <section id="projects" className="relative min-h-screen py-24 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-[6vw] relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-cyan-500 mb-3">
            {'// Constellation — Selected Work'}
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Projects
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {projectCategories.map((category) => (
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
        </div>

        {/* Project Rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {ordered.length > 0 ? (
              ordered.map((project, index) => (
                <ProjectRow key={project.id} project={project} index={index} reduce={reduce} />
              ))
            ) : (
              <p className="text-center py-20 text-gray-500 dark:text-white/50 text-lg">
                No projects found in this category.
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="font-mono text-gray-400 dark:text-white/40 text-xs sm:text-sm mt-6">
          hover a row — watch it resolve ↑
        </p>
      </div>
    </section>
  );
};

export default Projects;
