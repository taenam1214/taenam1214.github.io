import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export const HeroHighlight = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-transparent",
        className
      )}
    >
      {children}
      <BackgroundBeams />
    </div>
  );
};

export const Highlight = ({ children, className }) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-magenta to-cyan-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};

const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff00ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
