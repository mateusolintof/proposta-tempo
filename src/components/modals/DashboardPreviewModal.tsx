"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  AlertTriangle,
  Bot,
  Star,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";

interface DashboardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const kpis = [
  {
    label: "Leads Hoje",
    value: "152",
    change: "+12",
    icon: <Users className="w-5 h-5" />,
    color: "#00E5FF",
  },
  {
    label: "Qualificados",
    value: "89",
    change: "58%",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "#00FF94",
  },
  {
    label: "Agendados",
    value: "34",
    change: "+5",
    icon: <Calendar className="w-5 h-5" />,
    color: "#00E5FF",
  },
  {
    label: "T. Resposta",
    value: "< 2min",
    change: "Excelente",
    icon: <Clock className="w-5 h-5" />,
    color: "#00FF94",
  },
  {
    label: "No-Show",
    value: "8%",
    change: "-40%",
    icon: <AlertTriangle className="w-5 h-5" />,
    color: "#FF6B6B",
  },
  {
    label: "Receita Proj.",
    value: "R$ 13.6k",
    change: "Mes: 408k",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "#FFD700",
  },
];

const funnelData = [
  { label: "Leads Totais", value: 4500, percent: 100 },
  { label: "Qualificados", value: 2700, percent: 60 },
  { label: "Agendados", value: 2160, percent: 48 },
  { label: "Confirmados", value: 1944, percent: 43 },
  { label: "Consultas Realizadas", value: 1750, percent: 39 },
];

const agentPerformance = [
  {
    name: "Agente SDR",
    leads: 4500,
    rate: "60%",
    time: "4min 32s",
    satisfaction: "4.7/5",
    color: "#00FF94",
  },
  {
    name: "Agente FAQ",
    leads: 1850,
    rate: "22%",
    time: "98%",
    satisfaction: "4.8/5",
    color: "#00E5FF",
  },
  {
    name: "Agente No-Show",
    leads: 2160,
    rate: "94%",
    time: "10%",
    satisfaction: "187",
    color: "#FF6B6B",
  },
];

export default function DashboardPreviewModal({
  isOpen,
  onClose,
}: DashboardPreviewModalProps) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Dashboard Executivo"
      subtitle="KPIs em tempo real para tomada de decisao"
    >
      <div className="space-y-8">
        {/* KPIs Grid */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-[#00E5FF]" />
            Visao Geral - Hoje
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.label}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${kpi.color}20` }}
                >
                  <div style={{ color: kpi.color }}>{kpi.icon}</div>
                </div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: kpi.color }}
                >
                  {kpi.value}
                </p>
                <p className="text-white/50 text-xs">{kpi.label}</p>
                <p className="text-white/30 text-xs mt-1">{kpi.change}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Funnel + Performance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funnel */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00FF94]" />
              Funil de Conversao - Mes Atual
            </h4>
            <div className="space-y-3">
              {funnelData.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">{item.label}</span>
                    <span className="text-white">
                      {item.value.toLocaleString()} ({item.percent}%)
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #00E5FF, #00FF94)`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/50 text-sm">
                Taxa de Conversao Final:{" "}
                <span className="text-[#00FF94] font-semibold">39%</span>
              </p>
              <p className="text-white/30 text-xs">
                vs 15% antes da automacao = +160% melhoria
              </p>
            </div>
          </div>

          {/* Agent Performance */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#00E5FF]" />
              Performance dos Agentes IA
            </h4>
            <div className="space-y-4">
              {agentPerformance.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  className="bg-white/5 rounded-lg p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">
                      {agent.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star
                        className="w-3 h-3"
                        style={{ color: agent.color }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: agent.color }}
                      >
                        {agent.satisfaction}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-white/40">Leads</p>
                      <p className="text-white">
                        {agent.leads.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/40">Taxa</p>
                      <p style={{ color: agent.color }}>{agent.rate}</p>
                    </div>
                    <div>
                      <p className="text-white/40">Tempo/Resp</p>
                      <p className="text-white">{agent.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottlenecks */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#FFD700]" />
            Gargalos Identificados
          </h4>
          <div className="space-y-3">
            <motion.div
              className="flex items-start gap-3 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <AlertTriangle className="w-4 h-4 text-[#FFD700] mt-0.5" />
              <div>
                <p className="text-white/80 text-sm">
                  40% dos leads nao sao qualificados
                </p>
                <p className="text-white/50 text-xs mt-1">
                  Motivo: Problema nao relacionado a especialidade
                </p>
                <p className="text-[#00E5FF] text-xs mt-1">
                  Acao: Ajustar copy da landing page
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-3 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AlertTriangle className="w-4 h-4 text-[#FFD700] mt-0.5" />
              <div>
                <p className="text-white/80 text-sm">
                  20% dos qualificados nao agendam
                </p>
                <p className="text-white/50 text-xs mt-1">
                  Motivo: Nao encontra horario adequado
                </p>
                <p className="text-[#00E5FF] text-xs mt-1">
                  Acao: Avaliar ampliacao de horarios
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-3 bg-[#00FF94]/10 border border-[#00FF94]/20 rounded-lg p-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <TrendingUp className="w-4 h-4 text-[#00FF94] mt-0.5" />
              <div>
                <p className="text-white/80 text-sm">
                  No-show caiu de 25% para 10%
                </p>
                <p className="text-[#00FF94] text-xs mt-1">
                  Confirmacoes automaticas funcionando!
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-white/50 text-sm">
            Dashboard completo incluido no{" "}
            <span className="text-[#00FF94] font-semibold">
              Ecossistema Full
            </span>
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
}
