import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const TextGenerateEffect = ({ words, className }) => {
  const wordsArray = words.split(" ");

  return (
    <div className={cn("", className)}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            variants={{
              hidden: { opacity: 0, filter: "blur(10px)" },
              visible: { opacity: 1, filter: "blur(0px)" },
            }}
            transition={{
              duration: 0.3,
            }}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
