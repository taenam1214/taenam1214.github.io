# Taenam Kim — Portfolio

A personal portfolio site with a **"Cosmic Editorial"** design: a live WebGL
starfield backdrop carrying oversized editorial typography, a name headline that
reveals with a blur-rise + light sweep, a scrolling tech ticker, and project
entries as interactive "constellation" rows that scramble-resolve on hover.
Themed around a **green → cyan → blue** palette.

**Live:** https://taenam1214.github.io

---

## Features

- **Cosmic WebGL background** — three parallax star layers + a wireframe
  icosahedron that drifts toward the cursor and recedes on scroll (Three.js,
  driven imperatively for React 18 compatibility; dark-mode only).
- **Editorial hero** — the name is the headline, revealed with a per-line
  blur-rise and a gradient "light sweep", above a scrolling tech-stack ticker.
- **Projects as constellation rows** — each project scrambles into place on
  hover, keeps its GitHub / live-demo links, and is filterable by category.
- **Inertial smooth scrolling** via Lenis.
- **Working contact form** (EmailJS) with validation + a direct `mailto:` fallback.
- **Light / dark theme** with a persisted preference (Zustand).
- **Accessibility** — honors `prefers-reduced-motion` (WebGL motion, name
  reveal, ticker, and scramble all freeze gracefully).

---

## Tech stack & libraries

### Core
| Library | Purpose |
|---|---|
| `react`, `react-dom` | UI framework (React 18) |
| `react-scripts` (Create React App) | Build / dev tooling |

### Styling
| Library | Purpose |
|---|---|
| `tailwindcss` | Utility-first styling + the brand color system |
| `postcss`, `autoprefixer`, `@tailwindcss/postcss` | CSS processing |
| `tailwind-merge`, `clsx` | Conditional / merged class names (`cn` helper) |

### Animation & 3D
| Library | Purpose |
|---|---|
| `three` | Cosmic WebGL starfield + 3D object |
| `@react-three/fiber`, `@react-three/drei` | React renderer for Three.js (installed) |
| `framer-motion` | Section reveals, transitions, scroll progress, nav |
| `gsap` | Animated stat counters + custom cursor easing |
| `@studio-freight/lenis` | Inertial smooth scrolling |
| `tsparticles`, `react-tsparticles`, `tsparticles-slim` | Particle system (legacy background) |

### UI & icons
| Library | Purpose |
|---|---|
| `@tabler/icons-react` | Icons across nav, projects, contact, footer |
| `lucide-react` | Additional icon set (available) |
| `react-lazy-load-image-component` | Lazy-loaded imagery |

### State, forms & data
| Library | Purpose |
|---|---|
| `zustand` | Theme store (persisted light/dark) |
| `emailjs-com` | Contact form email delivery |
| `react-intersection-observer`, `react-use` | Viewport / utility hooks |

### Tooling & ops
| Library | Purpose |
|---|---|
| `gh-pages` | Deploy the build to GitHub Pages |
| `web-vitals` | Performance metrics |
| `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` | Testing |

**Fonts:** Inter (display/body) + Space Grotesk (mono labels & ticker), via Google Fonts.

---

## Project structure

```
src/
├── App.jsx                     # Layout, Lenis smooth scroll, section order
├── index.css                   # Tailwind layers + name/ticker effect utilities
├── components/
│   ├── sections/               # Hero, About, Experience, Projects, Skills, Contact
│   ├── layout/                 # Navigation, Footer, CustomCursor, PageTransition
│   ├── features/
│   │   ├── CosmicBackground.jsx # Three.js starfield + 3D object (dark-only)
│   │   └── ProjectCard.jsx
│   └── ui/                     # Reusable effect components (beams, spotlight, …)
├── data/                       # projects, skills, experiences, content
├── hooks/                      # useTheme, useReducedMotion, useIntersectionObserver
└── utils/                      # animations, constants, cn
tailwind.config.js              # Brand (green), azure (blue), cyan + fonts/keyframes
```

---

## Getting started

```bash
npm install        # install dependencies
npm start          # dev server at http://localhost:3000
npm run build      # production build → build/
npm run deploy     # build + publish to the gh-pages branch
```

### Scripts
| Command | Description |
|---|---|
| `npm start` | Local dev server |
| `npm run build` | Production build |
| `npm test` | Run tests |
| `npm run deploy` | Build and deploy to GitHub Pages |
