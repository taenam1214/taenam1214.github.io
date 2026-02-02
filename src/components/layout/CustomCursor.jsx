import React, { useEffect, useRef, useState } from 'react';
import { useCursorPosition } from '../../hooks/useCursorPosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import gsap from 'gsap';

const CustomCursor = () => {
  const position = useCursorPosition();
  const prefersReducedMotion = useReducedMotion();
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches ||
                   'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animate cursor following mouse
  useEffect(() => {
    if (!cursorRef.current || !cursorOuterRef.current || prefersReducedMotion || isMobile) return;

    gsap.to(cursorRef.current, {
      x: position.x,
      y: position.y,
      duration: 0.05,
      ease: 'power2.out',
    });

    gsap.to(cursorOuterRef.current, {
      x: position.x,
      y: position.y,
      duration: 0.15,
      ease: 'power2.out',
    });
  }, [position, prefersReducedMotion, isMobile]);

  // Detect hoverable elements
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const hoverableElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, .hoverable'
    );

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    hoverableElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      hoverableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [prefersReducedMotion, isMobile]);

  // Click effect
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [prefersReducedMotion, isMobile]);

  // Don't render on mobile or if reduced motion is preferred
  if (prefersReducedMotion || isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white transition-transform duration-150 ${
          isClicking ? 'scale-75' : isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate(-50%, -50%)`,
        }}
      />

      {/* Outer cursor ring */}
      <div
        ref={cursorOuterRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border-2 border-magenta transition-all duration-300 ${
          isClicking ? 'scale-75 border-magenta-400' : isHovering ? 'scale-150 border-magenta-300' : 'scale-100'
        }`}
        style={{
          transform: `translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
