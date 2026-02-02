import React from 'react';
import { motion } from 'framer-motion';
import { CardSpotlight } from '../ui/card-spotlight';
import { IconBrandGithub, IconExternalLink, IconFolder } from '@tabler/icons-react';

const ProjectCard = ({ project, featured = false }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`h-full ${featured ? 'md:col-span-2' : ''}`}
    >
      <CardSpotlight className={`h-full flex flex-col ${featured ? 'md:min-h-[400px]' : 'min-h-[320px]'}`}>
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-magenta/20 rounded-lg border border-magenta/30">
                <IconFolder className="w-6 h-6 text-magenta" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                {project.year && (
                  <span className="text-sm text-white/50">{project.year}</span>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
                  aria-label="GitHub"
                >
                  <IconBrandGithub className="w-5 h-5 text-white/70 group-hover:text-magenta transition-colors" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
                  aria-label="Live Demo"
                >
                  <IconExternalLink className="w-5 h-5 text-white/70 group-hover:text-cyan-500 transition-colors" />
                </a>
              )}
            </div>
          </div>

          {/* Image Placeholder */}
          {project.image ? (
            <div className="relative mb-4 rounded-lg overflow-hidden group/image">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover/image:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
            </div>
          ) : (
            <div className={`relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-magenta/20 to-cyan-500/20 ${featured ? 'h-48' : 'h-32'} flex items-center justify-center border border-white/10`}>
              <IconFolder className={`${featured ? 'w-16 h-16' : 'w-12 h-12'} text-magenta/40`} />
            </div>
          )}

          {/* Description */}
          <p className="text-white/70 leading-relaxed mb-4 flex-grow">
            {featured && project.longDescription ? project.longDescription : project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, featured ? 10 : 5).map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > (featured ? 10 : 5) && (
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/50">
                +{project.technologies.length - (featured ? 10 : 5)}
              </span>
            )}
          </div>
        </div>
      </CardSpotlight>
    </motion.div>
  );
};

export default ProjectCard;
