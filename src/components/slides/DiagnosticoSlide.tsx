"use client";

import { motion } from "framer-motion";
import { Clock, UserX, AlertTriangle } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

const metrics = [
  { label: "Sem cobertura", value: "61%", subtext: "101h/semana" },
  { label: "Leads perdidos/mês", value: "~500", subtext: "potenciais clientes" },
  { label: "Tempo descoberto", value: "101h", subtext: "por semana" },
];

const painPoints = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Atendimento Sobrecarregado",
    desc: "Canal online com volume alto e baixa eficiência operacional",
  },
  {
    icon: <UserX className="w-6 h-6" />,
    title: "Janelas sem Cobertura",
    desc: "61% do tempo sem atendimento humano disponível",
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Abandono e Falta de Follow-up",
    desc: "Conversas e orçamentos ficam pendentes; sem cadência, a oportunidade esfria",
  },
];

export default function DiagnosticoSlide() {
  return (
    <SlideShell
      eyebrow="Diagnóstico"
      eyebrowColor="danger"
      title="Diagnóstico Operacional"
      subtitle="Principais pontos de fricção identificados no atendimento comercial"
    >
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-4xl md:text-5xl font-bold text-[#00E5FF]">
              {metric.value}
            </p>
            <p className="text-white/80 mt-2 font-medium">{metric.label}</p>
            <p className="text-white/40 text-eyebrow mt-1">{metric.subtext}</p>
          </motion.div>
        ))}
      </div>

      {/* Pain Points */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {painPoints.map((point, index) => (
          <motion.div
            key={point.title}
            className="bg-white/5 border border-red-500/20 rounded-xl p-6 hover:border-red-500/40 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 rounded-lg text-red-400">
                {point.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {point.title}
                </h3>
                <p className="text-white/60 mt-2 text-body leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
