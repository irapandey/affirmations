"use client";

import { motion, AnimatePresence } from "framer-motion";

// const drift = Math.random() * 120 - 60;

type Butterfly = {
  id: number;
  pathX: number[];
  pathY: number[];
  delay: number;
  duration: number;
};

type Props = {
  butterflies: Butterfly[];
  onRemove: (id: number) => void;
};

export default function Butterflies({ butterflies, onRemove }: Props) {
  return (
    <AnimatePresence>
      {butterflies.map((b) => (
        <motion.span
          key={b.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: b.pathX,
            y: b.pathY,
            rotate: [-17, 10, -9, 8, 5, -4, 0],
            scale: [0.7, 1, 0.95, 1.0, 1.9, 3],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => onRemove(b.id)}
          className="absolute text-3xl pointer-events-none"
          style={{
            bottom: "18%",
            left: "48%",
          }}
        >
          🦋
        </motion.span>
      ))}
    </AnimatePresence>
  );
}
