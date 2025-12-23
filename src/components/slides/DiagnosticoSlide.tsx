"use client";

import { motion } from "framer-motion";
import { TrendingDown, Clock, AlertTriangle } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import GaugeChart from "@/components/ui/GaugeChart";

const metricsAtual = [
  {
    icon: <Clock className="w-5 h-5" />,
    value: "320",
    label: "(64%)",
    desc: "Leads fora do horário comercial",
    color: "text-amber-400",
  },
  {
    icon: <TrendingDown className="w-5 h-5" />,
    value: "5%",
    label: "Taxa de Conversão",
    desc: "Atual",
    color: "text-red-400",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    value: "Alto",
    label: "nº de oportunidades",
    desc: "perdidas",
    color: "text-amber-400",
  },
];

export default function DiagnosticoSlide() {
  return (
    <SlideShell
      eyebrow="Diagnóstico & Cenário"
      eyebrowColor="warning"
      title="Análise de Eficiência & Gargalos"
      subtitle="Como a cobertura 24/7 e a qualificação imediata vão destravar sua Taxa de Conversão."
      size="compact"
      background={
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent pointer-events-none" />
      }
    >
      <div
        className="w-full space-y-6 overflow-y-auto"
        data-allow-vertical-scroll
      >
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seção 1: O Raio-X Atual */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
              <h3 className="text-lg font-semibold text-white">
                O Raio-X Atual (Gargalo Operacional)
              </h3>
            </div>
            <p className="text-sm text-white/50 ml-5">
              Baseado nos dados históricos de 500 leads.
            </p>

            {/* Cards de métricas */}
            <div className="space-y-3 ml-5">
              {metricsAtual.map((metric, index) => (
                <motion.div
                  key={metric.value + metric.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`p-2 bg-white/5 rounded-lg ${metric.color}`}>
                    {metric.icon}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-bold ${metric.color}`}>
                        {metric.value}
                      </span>
                      <span className="text-white/60 text-sm">
                        {metric.label}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs">{metric.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Seção 2: Projeção de Cenário */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
              <h3 className="text-lg font-semibold text-white">
                Projeção de Cenário (R$ 3.000/mês)
              </h3>
            </div>
            <p className="text-sm text-white/50 ml-5">
              Custo/lead ~R$11 → ~272 leads/mês
            </p>

            {/* Gauge Charts */}
            <div className="grid grid-cols-2 gap-6 ml-5">
              <GaugeChart
                value={14}
                max={50}
                label="Cenário Atual (5%)"
                sublabel="~14 vendas/mês"
                color="amber"
              />
              <GaugeChart
                value={32}
                max={50}
                label="Cenário IA (10-12%)"
                sublabel="~32 vendas/mês"
                color="emerald"
              />
            </div>

            {/* Impacto financeiro */}
            <motion.div
              className="ml-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <p className="text-emerald-400 font-bold text-3xl">+128%</p>
                <p className="text-white/60 text-sm">Aumento projetado em vendas</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-xs">De 14 para 32 vendas</p>
                <p className="text-emerald-400 text-sm font-medium">
                  +18 vendas/mês
                </p>
              </div>
            </motion.div>

            {/* Risco da inércia */}
            <motion.div
              className="ml-5 bg-red-500/10 border border-red-500/20 rounded-xl p-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-red-400 text-xs uppercase tracking-wider mb-1">
                Risco da Inércia
              </p>
              <p className="text-white/70 text-sm">
                Sem IA: ~174 leads/mês (64%) continuarão sem resposta imediata
              </p>
            </motion.div>
          </div>
        </div>

        {/* Rodapé - Frase de Impacto */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            <strong className="text-[#00FF94]">Diagnóstico:</strong> O gargalo é
            falta de capacidade de processamento.{" "}
            <strong className="text-[#00E5FF]">
              A implementação dos Agentes
            </strong>{" "}
            visa recuperar a eficiência dos 64% de leads que hoje ficam sem
            atendimento imediato.
          </p>
        </motion.div>
      </div>
    </SlideShell>
  );
}
