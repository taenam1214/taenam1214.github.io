import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";

export const Timeline = ({ data, activeFilter = "all" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const filteredData = activeFilter === "all"
    ? data
    : data.filter(item => item.type === activeFilter);

  return (
    <div ref={ref} className="relative w-full">
      {/* Timeline Line */}
      <motion.div
        className="absolute left-8 md:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-magenta to-transparent origin-top"
        style={{
          scaleY: useTransform(scrollYProgress, [0, 1], [0, 1]),
        }}
      />

      {/* Timeline Items */}
      <div className="space-y-12">
        {filteredData.map((item, index) => (
          <TimelineItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
        isEven ? "md:text-right" : "md:text-left"
      )}
    >
      {/* Dot on Timeline */}
      <div
        className={cn(
          "absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-magenta shadow-lg shadow-magenta/50 z-10 transform -translate-x-1/2",
          "before:absolute before:inset-0 before:rounded-full before:bg-magenta before:animate-ping before:opacity-75"
        )}
      />

      {/* Content */}
      <div className={cn("md:col-span-1", isEven ? "md:col-start-1" : "md:col-start-2")}>
        <div className="ml-16 md:ml-0 md:px-8">
          {item.children || (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-magenta/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  <p className="text-magenta font-medium">{item.company}</p>
                </div>
              </div>
              <p className="text-sm text-white/60 mb-3">{item.period}</p>
              <p className="text-white/80 mb-4">{item.description}</p>
              {item.technologies && (
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-magenta/20 text-magenta border border-magenta/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
