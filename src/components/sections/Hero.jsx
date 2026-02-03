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
            className="flex flex-col gap-4 justify-center items-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            </div>

            <a
              href="/images/TaenamKim_Resume_SWE.pdf"
              download
            >
              <MovingBorderButton
                className="px-8 py-4 text-white font-medium"
                containerClassName="rounded-full"
              >
                Resume
              </MovingBorderButton>
            </a>
          </motion.div>

        </motion.div>
      </HeroHighlight>
    </section>
  );
};

export default Hero;
