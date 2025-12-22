"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SlideShellProps = {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  background?: ReactNode;
  align?: "left" | "center";
  size?: "default" | "compact";
  eyebrowColor?: "default" | "success" | "warning" | "danger";
  className?: string;
  contentClassName?: string;
};

const eyebrowColors = {
  default: "bg-white/10 text-white/80 border-white/20",
  success: "bg-[#00FF94]/10 text-[#00FF94] border-[#00FF94]/30",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/10 text-red-400 border-red-500/30",
};

export default function SlideShell({
  eyebrow,
  title,
  subtitle,
  children,
  background,
  align = "left",
  size = "default",
  eyebrowColor = "default",
  className,
  contentClassName,
}: SlideShellProps) {
  return (
    <section
      className={cn(
        "h-full w-full pt-[clamp(72px,8vh,96px)] pb-[clamp(36px,6vh,56px)] px-6 md:px-8 flex flex-col",
        "items-center relative",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {background}
      <div className="w-full max-w-6xl mx-auto flex flex-col min-h-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span
            className={cn(
              "inline-flex mb-4 uppercase tracking-[0.28em] text-[11px] px-4 py-2 rounded-full border backdrop-blur-md",
              eyebrowColors[eyebrowColor]
            )}
          >
            {eyebrow}
          </span>

          <h2
            className={cn(
              "font-bold text-white leading-tight tracking-tight",
              size === "compact"
                ? "text-3xl md:text-4xl"
                : "text-4xl md:text-5xl"
            )}
          >
            {title}
          </h2>

          {subtitle ? (
            <p
              className={cn(
                "mt-3 text-white/70 text-base md:text-lg leading-relaxed",
                align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </motion.div>

        {children ? (
          <div className={cn("mt-8 w-full flex-1 min-h-0", contentClassName)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
