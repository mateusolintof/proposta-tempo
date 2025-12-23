"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Users, History, Filter, Maximize2 } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import type { ModalKind } from "@/types/modal";

const tools = [
  {
    id: "crm",
    icon: <Users className="w-6 h-6" />,
    title: "CRM Integrado",
    desc: "Visualização completa do funil de vendas com status de cada lead",
    hasPreview: true,
  },
  {
    id: "dashboard",
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Dashboard Executivo",
    desc: "KPIs em tempo real para tomada de decisão rápida",
    hasPreview: true,
  },
  {
    id: "history",
    icon: <History className="w-6 h-6" />,
    title: "Histórico Completo",
    desc: "Todas as conversas registradas e acessíveis para análise",
    hasPreview: false,
  },
  {
    id: "filters",
    icon: <Filter className="w-6 h-6" />,
    title: "Filtros Avançados",
    desc: "Segmentação por canal, equipe e período personalizado",
    hasPreview: false,
  },
];

const metrics = [
  { label: "Aumento de Conversão", value: "+40%" },
  { label: "Tempo de Resposta", value: "Imediato" },
];

interface FerramentasSlideProps {
  onOpenModal?: (modal: ModalKind) => void;
}

export default function FerramentasSlide({ onOpenModal }: FerramentasSlideProps) {
  const handleToolClick = (toolId: string) => {
    if (toolId === "crm") {
      onOpenModal?.({ type: "crm" });
    } else if (toolId === "dashboard") {
      onOpenModal?.({ type: "dashboard" });
    }
  };
  return (
    <SlideShell
      eyebrow="Ferramentas"
      title="Ferramentas de Controle"
      subtitle="CRM + Dashboard Executivo para gestão completa"
      background={
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#00E5FF]/5 via-transparent to-transparent pointer-events-none" />
      }
    >
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {tools.map((tool, index) => (
          <motion.button
            key={tool.id}
            type="button"
            onClick={() => tool.hasPreview && handleToolClick(tool.id)}
            className={`bg-white/5 border border-white/10 rounded-xl p-6 text-left transition-all ${
              tool.hasPreview
                ? "hover:border-[#00E5FF]/50 hover:bg-white/10 cursor-pointer"
                : "cursor-default"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={tool.hasPreview ? { scale: 1.02 } : {}}
            whileTap={tool.hasPreview ? { scale: 0.98 } : {}}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#00E5FF]/10 rounded-lg text-[#00E5FF]">
                {tool.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {tool.title}
                  </h3>
                  {tool.hasPreview && (
                    <Maximize2 className="w-4 h-4 text-[#00E5FF] opacity-60" />
                  )}
                </div>
                <p className="text-white/60 mt-1 text-body leading-relaxed">
                  {tool.desc}
                </p>
                {tool.hasPreview && (
                  <span className="inline-block mt-2 text-xs text-[#00E5FF]/70">
                    Clique para ver preview
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="bg-gradient-to-br from-[#00E5FF]/10 to-[#00FF94]/10 border border-[#00E5FF]/20 rounded-2xl p-6 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <p className="text-3xl md:text-4xl font-bold text-[#00E5FF]">
              {metric.value}
            </p>
            <p className="text-white/60 mt-2 text-body">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
