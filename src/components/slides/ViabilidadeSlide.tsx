"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Clock,
  Zap,
} from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import type { ModalKind } from "@/types/modal";

interface ViabilidadeSlideProps {
  onOpenModal?: (modal: ModalKind) => void;
}

const highlights = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    label: "ROI Projetado",
    value: "+300%",
    desc: "em 12 meses",
    color: "#00FF94",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Payback",
    value: "3-4",
    desc: "meses",
    color: "#00E5FF",
  },
  {
    icon: <TrendingDown className="w-5 h-5" />,
    label: "Economia",
    value: "-60%",
    desc: "custos operacionais",
    color: "#FFD700",
  },
];

export default function ViabilidadeSlide({ onOpenModal }: ViabilidadeSlideProps) {
  return (
    <SlideShell
      eyebrow="Viabilidade"
      eyebrowColor="success"
      title="Viabilidade Econômica"
      subtitle="Simule o retorno do investimento e a economia com automação"
      align="center"
      background={
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00FF94]/5 via-transparent to-transparent pointer-events-none" />
      }
    >
      {/* Highlights */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mx-auto mb-10">
        {highlights.map((item, index) => (
          <motion.div
            key={item.label}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <div style={{ color: item.color }}>{item.icon}</div>
            </div>
            <p className="text-3xl md:text-4xl font-bold" style={{ color: item.color }}>
              {item.value}
            </p>
            <p className="text-white/70 text-body mt-1">{item.label}</p>
            <p className="text-white/40 text-xs">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Calculator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
        {/* ROI Calculator Card */}
        <motion.button
          type="button"
          onClick={() => onOpenModal?.({ type: "roi" })}
          className="bg-gradient-to-br from-[#00FF94]/10 to-transparent border border-[#00FF94]/30 rounded-2xl p-6 text-left hover:border-[#00FF94]/60 hover:bg-[#00FF94]/5 transition-all cursor-pointer group"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-4 bg-[#00FF94]/20 rounded-xl">
              <Calculator className="w-8 h-8 text-[#00FF94]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white group-hover:text-[#00FF94] transition-colors">
                Calculadora de ROI
              </h3>
              <p className="text-white/60 mt-2 text-body leading-relaxed">
                Simule o retorno do investimento baseado no seu volume de leads,
                ticket médio e taxa de conversão atual.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#00FF94]">
                <Zap className="w-4 h-4" />
                <span className="text-body font-medium">Calcular agora</span>
              </div>
            </div>
          </div>
        </motion.button>

        {/* Cost Reduction Card */}
        <motion.button
          type="button"
          onClick={() => onOpenModal?.({ type: "costs" })}
          className="bg-gradient-to-br from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/30 rounded-2xl p-6 text-left hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/5 transition-all cursor-pointer group"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-4 bg-[#00E5FF]/20 rounded-xl">
              <DollarSign className="w-8 h-8 text-[#00E5FF]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white group-hover:text-[#00E5FF] transition-colors">
                Simulador de Economia
              </h3>
              <p className="text-white/60 mt-2 text-body leading-relaxed">
                Calcule a redução de custos com automação baseada na sua equipe
                atual e nível de automação desejado.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#00E5FF]">
                <Zap className="w-4 h-4" />
                <span className="text-body font-medium">Simular economia</span>
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Bottom Note */}
      <motion.p
        className="mt-10 text-white/40 text-body text-center max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        * Valores projetados com base em benchmarks de mercado. Use as calculadoras
        para simular cenários personalizados para sua operação.
      </motion.p>
    </SlideShell>
  );
}
