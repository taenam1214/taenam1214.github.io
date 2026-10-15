import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Cosmic WebGL backdrop: three parallax star layers plus a wireframe
 * icosahedron that drifts toward the cursor and recedes on scroll.
 * Driven imperatively with three.js (React 18 safe — avoids the
 * @react-three/fiber v9 / React 19 peer mismatch).
 *
 * Dark-mode only; respects prefers-reduced-motion by freezing motion.
 */
const CosmicBackground = () => {
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef(null);

  useEffect(() => {
    // Only run the scene in dark mode.
    if (resolvedTheme !== 'dark') return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const makeStars = (count, spread, size, color, opacity) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size, color, transparent: true, opacity, depthWrite: false });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return pts;
    };
    const starsFar = makeStars(1500, 64, 0.055, 0xffffff, 0.85);
    const starsMid = makeStars(520, 42, 0.095, 0x9fe8ff, 0.9);
    const starsNear = makeStars(170, 26, 0.15, 0x8bffcf, 0.95);

    // 3D object offset to the right so hero type sits on the left.
    const group = new THREE.Group();
    scene.add(group);
    const BASE_X = 2.5;
    const BASE_Y = 0.5;
    group.position.set(BASE_X, BASE_Y, 0);
    const ico = new THREE.IcosahedronGeometry(1.7, 1);
    group.add(new THREE.LineSegments(
      new THREE.WireframeGeometry(ico),
      new THREE.LineBasicMaterial({ color: 0x15e6a0, transparent: true, opacity: 0.85 })
    ));
    group.add(new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 0),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.14, wireframe: true })
    ));
    group.add(new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', ico.getAttribute('position')),
      new THREE.PointsMaterial({ size: 0.1, color: 0xffffff })
    ));

    let mx = 0;
    let my = 0;
    let scrollY = 0;
    const onMouse = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => { scrollY = window.scrollY / window.innerHeight; };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    if (!prefersReducedMotion) window.addEventListener('mousemove', onMouse);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!prefersReducedMotion) {
        group.rotation.y += 0.0032;
        group.rotation.x = Math.sin(t * 0.3) * 0.15;
        group.position.x += ((BASE_X + mx * 1.2) - group.position.x) * 0.05;
        group.position.y += ((BASE_Y - my * 0.9) - group.position.y) * 0.05;
        starsFar.rotation.y += 0.0004;
        starsMid.rotation.y += 0.0008;
        starsNear.rotation.y += 0.0013;
        camera.position.x += (mx * 0.5 - camera.position.x) * 0.04;
        camera.position.y += (-my * 0.35 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
      }
      group.position.z = -scrollY * 4;
      group.scale.setScalar(Math.max(0.2, 0.95 - scrollY * 0.5));
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      renderer.dispose();
    };
  }, [resolvedTheme, prefersReducedMotion]);

  // Light mode: a soft static gradient instead of the dark starfield.
  if (resolvedTheme !== 'dark') {
    return (
      <div className="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-brand/5 via-transparent to-azure/5" />
    );
  }

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default CosmicBackground;
