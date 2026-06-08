"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "red" | "gold" | "none";
}

export default function GlassCard({ children, className = "", hover = true, glow = "none" }: GlassCardProps) {
  const glowClass = glow === "red" ? "glow-border-red" : glow === "gold" ? "border-tohsaka-gold/30" : "";

  if (!hover) {
    return (
      <div className={`glass rounded-xl ${glowClass} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`glass gem-shine rounded-xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(196,30,58,0.15)] ${glowClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}
