import { AnimatePresence, Variants } from "framer-motion";
import * as motion from "framer-motion/client";

const variants: Variants = {
  initial: { y: 20, opacity: 0 },
  enter: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.5, ease: "anticipate" }}
        className="overflow-y-auto scrollable-area"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
