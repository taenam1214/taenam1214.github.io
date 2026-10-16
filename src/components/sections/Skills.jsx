import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skills, skillHighlights } from '../../data/skills';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { staggerContainerVariant, staggerItemVariant } from '../../utils/animations';
import { CardSpotlight } from '../ui/card-spotlight';

const VB_W = 340;
const VB_H = 264;
const CX = VB_W / 2;
const CY = VB_H / 2 + 6;
const RX = 100;
const RY = 78;

// Map a 0–100 proficiency onto a node radius (subtle, no fake precision shown).
const nodeRadius = (level) => {
  const t = Math.max(0, Math.min(1, (level - 68) / 30));
  return 5 + t * 6.5;
};

const Skills = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={hasIntersected ? 'visible' : 'hidden'}
          variants={staggerContainerVariant}
        >
          {/* Section Title */}
          <motion.div variants={staggerItemVariant} className="text-center mb-12">
            <div className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-cyan-500 mb-3">
              {'// Toolkit'}
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand via-cyan-500 to-azure">Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Each cluster is a constellation — bigger stars, deeper experience. Hover to light one up.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-brand via-cyan-500 to-azure mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={staggerItemVariant}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {skillHighlights.map((highlight, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="px-5 py-2.5 rounded-full font-mono text-sm bg-gradient-to-r from-brand/15 to-azure/15 border border-brand/30 text-gray-900 dark:text-white"
              >
                {highlight}
              </motion.span>
            ))}
          </motion.div>

          {/* Constellation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skills.map((category, i) => (
              <motion.div key={i} variants={staggerItemVariant}>
                <CategoryConstellation category={category} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CategoryConstellation = ({ category }) => {
  const [hover, setHover] = useState(null);
  const items = category.items;
  const n = items.length;

  // Lay the skills out on a lightly jittered ring to read as a constellation.
  const nodes = items.map((it, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const j = (((i * 37) % 11) - 5) / 70; // deterministic -0.07..0.07
    const x = CX + Math.cos(a) * RX * (1 + j);
    const y = CY + Math.sin(a) * RY * (1 + j);
    return { ...it, x, y, a, r: nodeRadius(it.level) };
  });

  // Edges: a ring loop plus a couple of cross links for a constellation feel.
  const edges = [];
  for (let i = 0; i < n; i++) edges.push([i, (i + 1) % n]);
  if (n > 5) {
    edges.push([0, Math.floor(n / 2)]);
    edges.push([2, Math.min(n - 1, Math.floor(n / 2) + 2)]);
  }

  const labelAnchor = (a) => {
    const c = Math.cos(a);
    if (c < -0.33) return 'end';
    if (c > 0.33) return 'start';
    return 'middle';
  };

  return (
    <CardSpotlight className="h-full p-5">
      <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-gray-900 dark:text-white mb-1 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-brand rounded-full" />
        {category.category}
      </h3>
      <p className="font-mono text-[11px] text-gray-500 dark:text-white/40 mb-2">{n} skills</p>

      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto overflow-visible text-gray-700 dark:text-white/85" onMouseLeave={() => setHover(null)}>
        {/* Edges */}
        {edges.map(([a, b], i) => {
          const active = hover === a || hover === b;
          return (
            <line
              key={`e${i}`}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke={active ? '#22d3ee' : '#15e6a0'}
              strokeOpacity={active ? 0.85 : 0.22}
              strokeWidth={active ? 1.4 : 0.7}
              style={{ transition: 'all .25s' }}
            />
          );
        })}

        {/* Nodes + labels */}
        {nodes.map((node, i) => {
          const active = hover === i;
          const dim = hover !== null && !active;
          const lx = node.x + Math.cos(node.a) * (node.r + 7);
          const ly = node.y + Math.sin(node.a) * (node.r + 7) + 3;
          return (
            <g
              key={i}
              onMouseEnter={() => setHover(i)}
              style={{ cursor: 'default', opacity: dim ? 0.4 : 1, transition: 'opacity .25s' }}
            >
              {/* glow halo */}
              <circle cx={node.x} cy={node.y} r={node.r * (active ? 2.8 : 2)} fill={active ? '#22d3ee' : '#15e6a0'} opacity={active ? 0.28 : 0.12} style={{ transition: 'all .25s' }} />
              {/* node */}
              <circle cx={node.x} cy={node.y} r={active ? node.r * 1.25 : node.r} fill={active ? '#22d3ee' : '#15e6a0'} style={{ transition: 'all .25s' }} />
              {/* label */}
              <text
                x={lx} y={ly}
                textAnchor={labelAnchor(node.a)}
                className="font-mono"
                fontSize="11"
                fill={active ? '#ffffff' : 'currentColor'}
                fillOpacity={active ? 1 : 0.72}
                style={{ transition: 'all .25s' }}
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
    </CardSpotlight>
  );
};

export default Skills;
