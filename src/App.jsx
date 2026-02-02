import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/layout/CustomCursor';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import ParticleBackground from './components/features/ParticleBackground';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';

function AppContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Native smooth scrolling (no delay)
  useEffect(() => {
    // Add smooth scroll behavior to html element
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="bg-white dark:bg-dark text-gray-900 dark:text-white min-h-screen relative overflow-x-hidden transition-colors duration-300">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-magenta via-magenta-400 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main Content with Page Transition */}
      <PageTransition>
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </PageTransition>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
