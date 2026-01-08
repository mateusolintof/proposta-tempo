"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  eyebrow?: string;
  eyebrowColor?: "default" | "success" | "warning" | "danger";
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const eyebrowColorMap = {
  default: "text-[#00E5FF] border-[#00E5FF]/30",
  success: "text-[#00FF94] border-[#00FF94]/30",
  warning: "text-[#FFD700] border-[#FFD700]/30",
  danger: "text-[#FF6B6B] border-[#FF6B6B]/30",
};

export default function SectionWrapper({
  id,
  eyebrow,
  eyebrowColor = "default",
  title,
  subtitle,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-16 border-b border-white/5 last:border-b-0",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-10">
          {eyebrow && (
            <span
              className={cn(
                "inline-flex mb-4 uppercase tracking-[0.2em] text-xs px-4 py-1.5 rounded-full border",
                eyebrowColorMap[eyebrowColor]
              )}
            >
              {eyebrow}
            </span>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          {subtitle && (
            <p className="mt-3 text-white/60 text-lg max-w-2xl">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        <div>{children}</div>
      </motion.div>
    </section>
  );
}
