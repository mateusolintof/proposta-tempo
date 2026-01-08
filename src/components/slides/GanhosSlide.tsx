"use client";

import { motion } from "framer-motion";
import {
  Zap,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  ArrowRight,
  BarChart3,
  Calculator,
  TrendingDown,
  Clock,
} from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import type { ModalKind } from "@/types/modal";

const gains = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Retenção de Lead Frio",
    desc: "O lead de tráfego frio exige velocidade. Ao responder em segundos e já apresentar o cálculo de economia, evitamos que ele continue pesquisando e vá para o concorrente.",
    color: "cyan",
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    title: "Financeiro (OCR)",
    desc: "A IA atua como uma barreira de qualidade: lê a fatura, valida o ticket mínimo e descarta curiosos automaticamente, protegendo a agenda dos vendedores.",
    color: "green",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Maturação de Oportunidades",
    desc: "Leads que não fecham agora não são perdidos. O Agente mantém o follow-up ativo e nutre o CRM, reaquecendo contatos para vendas futuras.",
    color: "cyan",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Foco Exclusivo em Fechamento",
    desc: "Inversão da lógica de trabalho: o humano para de prospectar e começa a negociar. Menos tempo operacional, mais tempo persuasivo.",
    color: "green",
  },
];

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

interface GanhosSlideProps {
  onOpenModal?: (modal: ModalKind) => void;
}

export default function GanhosSlide({ onOpenModal }: GanhosSlideProps) {
  return (
    <SlideShell
      eyebrow="Resultados"
      eyebrowColor="success"
      title="Ganhos & Viabilidade"
      subtitle="Impacto direto nos indicadores de performance comercial"
      background={
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#00FF94]/5 via-transparent to-transparent pointer-events-none" />
      }
    >
      {/* Viabilidade Highlights */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mx-auto mb-6">
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
              className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <div style={{ color: item.color }}>{item.icon}</div>
            </div>
            <p className="text-2xl md:text-3xl font-bold" style={{ color: item.color }}>
              {item.value}
            </p>
            <p className="text-white/70 text-sm mt-1">{item.label}</p>
            <p className="text-white/40 text-xs">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Gains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {gains.map((gain, index) => (
          <motion.div
            key={gain.title}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div
              className={`p-2 rounded-lg ${
                gain.color === "cyan"
                  ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                  : "bg-[#00FF94]/10 text-[#00FF94]"
              }`}
            >
              {gain.icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {gain.title}
              </h3>
              <p className="text-white/50 mt-1 text-[13px] leading-relaxed">
                {gain.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calculator Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
        {/* ROI Calculator Card */}
        <motion.button
          type="button"
          onClick={() => onOpenModal?.({ type: "roi" })}
          className="bg-gradient-to-br from-[#00FF94]/10 to-transparent border border-[#00FF94]/30 rounded-xl p-4 text-left hover:border-[#00FF94]/60 hover:bg-[#00FF94]/5 transition-all cursor-pointer group"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-3 bg-[#00FF94]/20 rounded-xl">
              <Calculator className="w-6 h-6 text-[#00FF94]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white group-hover:text-[#00FF94] transition-colors">
                Calculadora de ROI
              </h3>
              <p className="text-white/60 mt-1 text-sm leading-relaxed">
                Simule o retorno do investimento baseado no seu volume de leads.
              </p>
              <div className="mt-2 flex items-center gap-2 text-[#00FF94]">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Calcular agora</span>
              </div>
            </div>
          </div>
        </motion.button>

        {/* Cost Reduction Card */}
        <motion.button
          type="button"
          onClick={() => onOpenModal?.({ type: "costs" })}
          className="bg-gradient-to-br from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/30 rounded-xl p-4 text-left hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/5 transition-all cursor-pointer group"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-3 bg-[#00E5FF]/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white group-hover:text-[#00E5FF] transition-colors">
                Simulador de Economia
              </h3>
              <p className="text-white/60 mt-1 text-sm leading-relaxed">
                Calcule a redução de custos com automação baseada na sua equipe.
              </p>
              <div className="mt-2 flex items-center gap-2 text-[#00E5FF]">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Simular economia</span>
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
        <motion.button
          type="button"
          onClick={() => onOpenModal?.({ type: "gains" })}
          className="group flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-[#00FF94]/10 to-transparent border border-[#00FF94]/30 rounded-xl text-white hover:border-[#00FF94]/60 hover:bg-[#00FF94]/5 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <TrendingUp className="w-5 h-5 text-[#00FF94]" />
          <span className="font-medium text-sm">Detalhar Ganhos</span>
          <ArrowRight className="w-4 h-4 text-[#00FF94] group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          type="button"
          onClick={() => onOpenModal?.({ type: "intelligence" })}
          className="group flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/30 rounded-xl text-white hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/5 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BarChart3 className="w-5 h-5 text-[#00E5FF]" />
          <span className="font-medium text-sm">Inteligência de Dados</span>
          <ArrowRight className="w-4 h-4 text-[#00E5FF] group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </SlideShell>
  );
}
