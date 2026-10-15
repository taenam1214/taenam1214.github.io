import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const MovingBorderButton = ({
  children,
  className,
  containerClassName,
  borderClassName,
  duration = 2000,
  ...otherProps
}) => {
  return (
    <button
      className={cn(
        "relative p-[1px] overflow-hidden",
        containerClassName
      )}
      {...otherProps}
    >
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full",
          borderClassName
        )}
        style={{
          background: "linear-gradient(90deg, #15e6a0, #22d3ee, #3b82f6)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div
        className={cn(
          "relative bg-dark rounded-full z-10 backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>
    </button>
  );
};
