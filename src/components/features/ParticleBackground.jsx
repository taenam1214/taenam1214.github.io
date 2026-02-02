import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PARTICLE_CONFIG } from '../../utils/constants';

const ParticleBackground = () => {
  const prefersReducedMotion = useReducedMotion();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Don't render particles if user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 -z-10 opacity-0 dark:opacity-100 transition-opacity duration-300"
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: ['grab', 'bubble'],
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.5,
              },
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 0.3,
              opacity: 0.8,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: PARTICLE_CONFIG.color,
          },
          links: {
            color: PARTICLE_CONFIG.color,
            distance: PARTICLE_CONFIG.maxDistance,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: true,
            speed: PARTICLE_CONFIG.speed,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: PARTICLE_CONFIG.count,
          },
          opacity: {
            value: 0.5,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false,
            },
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
