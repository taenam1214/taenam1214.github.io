import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  featured = false,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input bg-white/5 backdrop-blur-lg border border-white/10 hover:border-magenta/50 p-4 flex flex-col space-y-4",
        featured && "md:col-span-2 md:row-span-2",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-400 text-sm">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
