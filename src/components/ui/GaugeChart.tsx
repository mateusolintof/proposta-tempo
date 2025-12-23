"use client";

import { motion } from "framer-motion";

interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  sublabel?: string;
  color: "amber" | "emerald" | "cyan" | "red";
}

const colorMap = {
  amber: { stroke: "#f59e0b", glow: "rgba(245, 158, 11, 0.3)" },
  emerald: { stroke: "#10b981", glow: "rgba(16, 185, 129, 0.3)" },
  cyan: { stroke: "#00E5FF", glow: "rgba(0, 229, 255, 0.3)" },
  red: { stroke: "#ef4444", glow: "rgba(239, 68, 68, 0.3)" },
};

export default function GaugeChart({
  value,
  max,
  label,
  sublabel,
  color,
}: GaugeChartProps) {
  // Semicircle arc: 180 degrees = π radians
  // Arc length for a semicircle with radius 40: π * 40 ≈ 125.66
  const arcLength = Math.PI * 40;
  const percentage = Math.min(value / max, 1);
  const strokeDasharray = `${percentage * arcLength} ${arcLength}`;
  const colors = colorMap[color];

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <svg viewBox="0 0 100 60" className="w-full max-w-[180px]">
        {/* Glow filter */}
        <defs>
          <filter id={`glow-${color}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background arc */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Value arc */}
        <motion.path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          filter={`url(#glow-${color})`}
          initial={{ strokeDasharray: `0 ${arcLength}` }}
          whileInView={{ strokeDasharray }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Value text */}
        <text
          x="50"
          y="42"
          textAnchor="middle"
          className="fill-white font-bold"
          style={{ fontSize: "18px" }}
        >
          {value}
        </text>
      </svg>

      <p className="text-white/80 text-sm font-medium mt-1 text-center">
        {label}
      </p>
      {sublabel && (
        <p className="text-white/50 text-xs text-center">{sublabel}</p>
      )}
    </motion.div>
  );
}
