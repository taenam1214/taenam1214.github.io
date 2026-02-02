import gsap from 'gsap';

// GSAP Animation Presets
export const fadeInUp = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    }
  );
};

export const fadeIn = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.6,
      delay,
      ease: 'power2.out',
    }
  );
};

export const scaleIn = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay,
      ease: 'back.out(1.4)',
    }
  );
};

export const slideInLeft = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    }
  );
};

export const slideInRight = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 100 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
    }
  );
};

export const staggerChildren = (parent, childSelector, delay = 0.1) => {
  const children = parent.querySelectorAll(childSelector);
  return gsap.fromTo(
    children,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: delay,
      ease: 'power2.out',
    }
  );
};

// Framer Motion Variants
export const fadeInUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const pageTransitionVariant = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};
