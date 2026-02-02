import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardSpotlight } from '../ui/card-spotlight';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const TimelineItem = ({ experience, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CardSpotlight className="p-6 hover:border-magenta/50 transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {experience.logo && (
                <img
                  src={experience.logo}
                  alt={experience.company}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-white">{experience.role}</h3>
                <p className="text-magenta font-medium">{experience.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span>{experience.period}</span>
              {experience.location && (
                <>
                  <span>•</span>
                  <span>{experience.location}</span>
                </>
              )}
            </div>
          </div>

          {/* Expand Button */}
          {experience.achievements && experience.achievements.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <IconChevronUp className="w-5 h-5 text-white/70" />
              ) : (
                <IconChevronDown className="w-5 h-5 text-white/70" />
              )}
            </button>
          )}
        </div>

        {/* Description */}
        <p className="text-white/80 leading-relaxed">{experience.description}</p>

        {/* Achievements - Expandable */}
        <AnimatePresence>
          {isExpanded && experience.achievements && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold text-white/90 mb-3">Key Achievements:</h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2 text-white/70"
                    >
                      <span className="text-magenta mt-1.5">▹</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {experience.technologies.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1 text-xs rounded-full bg-magenta/20 text-magenta border border-magenta/30 hover:bg-magenta/30 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </CardSpotlight>
  );
};

export default TimelineItem;
