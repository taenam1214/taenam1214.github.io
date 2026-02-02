import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, projectCategories } from '../../data/projects';
import ProjectCard from '../features/ProjectCard';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainerVariant, staggerItemVariant } from '../../utils/animations';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-50/30" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
          variants={staggerContainerVariant}
        >
          {/* Section Title */}
          <motion.div variants={staggerItemVariant} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-magenta to-cyan-500">Projects</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              A showcase of my recent work and side projects
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-magenta to-cyan-500 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={staggerItemVariant}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {projectCategories.map((category) => (
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

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto"
            >
              {/* Featured Projects */}
              {featuredProjects.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Featured</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        featured={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Projects */}
              {regularProjects.length > 0 && (
                <div>
                  {featuredProjects.length > 0 && (
                    <h3 className="text-2xl font-bold text-white mb-6">More Projects</h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        featured={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-white/50 text-lg">No projects found in this category.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
