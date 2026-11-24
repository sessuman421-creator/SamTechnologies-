import type { ReactNode } from 'react';
import { motion } from 'motion/react';

export const STUDIO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const STUDIO_SPRING = {
  type: 'spring' as const,
  stiffness: 360,
  damping: 32,
  mass: 0.85,
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export function SmoothReveal({ children, delay = 0, className = '', yOffset = 16 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.58, delay, ease: STUDIO_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PageShellProps {
  children: ReactNode;
}

export function PageTransitionShell({ children }: PageShellProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14, scale: 0.996 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.996 }}
      transition={{ duration: 0.38, ease: STUDIO_EASE }}
      className="min-h-[calc(100vh-4rem)] will-change-transform"
    >
      {children}
    </motion.main>
  );
}
