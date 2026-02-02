import React from 'react';
import { motion } from 'framer-motion';
import { HeroHighlight, Highlight } from '../ui/hero-highlight';
import { TextGenerateEffect } from '../ui/text-generate-effect';
import { MovingBorderButton } from '../ui/moving-border';
import { heroContent } from '../../data/content';
import { staggerContainerVariant, staggerItemVariant } from '../../utils/animations';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <HeroHighlight>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariant}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
        >
          {/* Name */}
          <motion.div variants={staggerItemVariant} className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
              <span className="text-gray-900 dark:text-white">
                {heroContent.name}
              </span>
            </h1>
          </motion.div>

          {/* Title with Highlight */}
          <motion.div variants={staggerItemVariant} className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-white/90">
              <Highlight className="text-white dark:text-white">
                {heroContent.title}
              </Highlight>
            </h2>
          </motion.div>

          {/* Tagline with Text Generate Effect */}
          <motion.div variants={staggerItemVariant} className="mb-12 max-w-3xl mx-auto">
            <TextGenerateEffect
              words={heroContent.tagline}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-white/70"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerItemVariant}
            className="text-base sm:text-lg text-gray-500 dark:text-white/60 max-w-2xl mx-auto mb-12"
          >
            {heroContent.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItemVariant}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MovingBorderButton
              onClick={() => scrollToSection('#projects')}
              className="px-8 py-4 text-white font-medium"
              containerClassName="rounded-full"
            >
              View Projects
            </MovingBorderButton>

            <MovingBorderButton
              onClick={() => scrollToSection('#contact')}
              className="px-8 py-4 text-white font-medium"
              containerClassName="rounded-full"
            >
              Get in Touch
            </MovingBorderButton>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-gray-400 dark:border-white/30 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-magenta rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </HeroHighlight>
    </section>
  );
};

export default Hero;
