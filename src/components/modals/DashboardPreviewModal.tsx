"use client";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LayoutDashboard,
  Bot,
  Users,
  UserCheck,
  Lightbulb,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";

interface DashboardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Chart data
const leadsData = [
  { day: "Seg", leads: 120, agendamentos: 45 },
  { day: "Ter", leads: 145, agendamentos: 62 },
  { day: "Qua", leads: 180, agendamentos: 85 },
  { day: "Qui", leads: 165, agendamentos: 78 },
  { day: "Sex", leads: 155, agendamentos: 70 },
  { day: "Sab", leads: 90, agendamentos: 35 },
];

const funnelData = [
  { stage: "Leads", value: 4500, percent: 100, color: "#1a3a4a" },
  { stage: "Qualificados", value: 2500, percent: 55.6, color: "#2a5a6a" },
  { stage: "Agendados", value: 1700, percent: 37.8, color: "#3b7a8a" },
  { stage: "Confirmados", value: 1500, percent: 33.1, color: "#4c9aaa" },
  { stage: "Realizados", value: 1300, percent: 28.9, color: "#5dbaca" },
];

const leadsChartConfig = {
  leads: {
    label: "Leads",
    color: "#3b82a0",
  },
  agendamentos: {
    label: "Agendamentos",
    color: "#1a4a5e",
  },
} satisfies ChartConfig;

const menuItems = [
  { icon: LayoutDashboard, label: "Visão geral", active: true },
  { icon: Bot, label: "Gestão IA", active: false },
  { icon: Users, label: "Atendimento vendedores", active: false },
  { icon: UserCheck, label: "Clientes", active: false },
  { icon: Lightbulb, label: "Insights + reports", active: false },
];

const kpis = [
  { label: "LEADS/DIA", value: "150", subtitle: "Média 7 dias" },
  { label: "QUALIFICADOS", value: "55%", subtitle: "Por intenção" },
  { label: "AGENDAMENTOS", value: "38%", subtitle: "Lead → agenda" },
  { label: "NO-SHOW", value: "14%", subtitle: "Últimos 30 dias", warning: true },
  { label: "RECEITA (PIPELINE)", value: "R$ 1,2M", subtitle: "Prox. 30 dias" },
  { label: "PIPELINE", value: "R$ 2,1M", subtitle: "Em negociação" },
];

export default function DashboardPreviewModal({
  isOpen,
  onClose,
}: DashboardPreviewModalProps) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Painel Executivo"
      subtitle=""
    >
      <div className="h-full flex flex-col -mx-8 -mt-2">
        {/* Header with subtitle and filters */}
        <div className="px-8 pb-4 border-b border-gray-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                Dashboard Executivo
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-1">
                Visão completa do atendimento comercial
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                KPIs, funis e insights com suporte de IA
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                Últimos 7 dias
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-white bg-[#1a3a4a] rounded-full">
                Últimos 30 dias
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                Últimos 90 dias
              </button>
            </div>
          </div>
        </div>

        {/* Main content with sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 bg-[#1a2a3a] flex-shrink-0 overflow-y-auto">
            {/* Logo/Brand */}
            <div className="px-4 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2a4a5a] flex items-center justify-center text-white text-xs font-bold">
                AI
              </div>
              <div>
                <p className="text-white text-sm font-medium">Dashboard</p>
                <p className="text-gray-400 text-xs">Menu principal</p>
              </div>
            </div>

            {/* Main Menu */}
            <div className="px-3 mt-2">
              <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase px-3 mb-2">
                Main
              </p>
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-default mb-1 ${
                    item.active
                      ? "bg-[#2a4a5a] text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Demo notice */}
            <div className="px-3 mt-8">
              <div className="bg-[#2a4a5a]/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs">
                  Dados anonimizados para demo comercial.
                </p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-gray-50 overflow-y-auto p-6">
            {/* KPI Cards - 2 rows of 3 */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {kpis.slice(0, 3).map((kpi) => (
                <div
                  key={kpi.label}
                  className="bg-white rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                      {kpi.label}
                    </p>
                    <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {kpi.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{kpi.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {kpis.slice(3).map((kpi) => (
                <div
                  key={kpi.label}
                  className="bg-white rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                      {kpi.label}
                    </p>
                    <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          kpi.warning ? "bg-amber-400" : "bg-green-400"
                        }`}
                      />
                    </div>
                  </div>
                  <p
                    className={`text-2xl font-bold mt-2 ${
                      kpi.warning ? "text-amber-600" : "text-gray-900"
                    }`}
                  >
                    {kpi.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{kpi.subtitle}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-5 gap-4">
              {/* Area Chart */}
              <div className="col-span-3 bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">
                    Leads e agendamentos
                  </h3>
                  <span className="text-xs text-gray-400">Últimos 30 dias</span>
                </div>
                <ChartContainer config={leadsChartConfig} className="h-[200px] w-full">
                  <AreaChart
                    data={leadsData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="fillLeadsDash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-leads)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-leads)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="fillAgendDash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-agendamentos)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-agendamentos)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickMargin={8}
                      domain={[0, 200]}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stroke="var(--color-leads)"
                      fill="url(#fillLeadsDash)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="agendamentos"
                      stroke="var(--color-agendamentos)"
                      fill="url(#fillAgendDash)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>

              {/* Funnel Chart */}
              <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">⟲</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Funil de vendas
                  </h3>
                </div>
                <div className="space-y-2">
                  {funnelData.map((item) => (
                    <div key={item.stage} className="flex items-center gap-3">
                      <div
                        className="h-6 rounded-r-full transition-all"
                        style={{
                          width: `${item.percent}%`,
                          backgroundColor: item.color,
                          minWidth: "60px",
                        }}
                      />
                      <div className="flex items-center gap-2 text-xs whitespace-nowrap">
                        <span className="text-gray-500">●</span>
                        <span className="text-gray-700 font-medium">
                          {item.stage}
                        </span>
                        <span className="text-gray-400">
                          {(item.value / 1000).toFixed(1)} mil
                        </span>
                        <span className="text-gray-400">{item.percent}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Insight Box */}
                <div className="mt-4 p-3 bg-cyan-50 border border-cyan-100 rounded-lg">
                  <p className="text-xs text-cyan-800">
                    <span className="font-semibold">Oportunidade:</span> reforçar
                    follow-up nos primeiros 20 minutos para reduzir queda entre
                    "Qualificados" e "Agendados".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
