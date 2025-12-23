"use client";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  BarChart,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Shield, Clock, Target } from "lucide-react";

const resolucaoData = [
  { day: "Seg", ia: 195, escalados: 65 },
  { day: "Ter", ia: 180, escalados: 70 },
  { day: "Qua", ia: 160, escalados: 60 },
  { day: "Qui", ia: 175, escalados: 55 },
  { day: "Sex", ia: 165, escalados: 50 },
  { day: "Sab", ia: 120, escalados: 35 },
];

const intencoesData = [
  { name: "Pedido", value: 320 },
  { name: "FAQ", value: 240 },
  { name: "Status do pedido", value: 160 },
  { name: "Cadastro PJ", value: 100 },
];

const resolucaoChartConfig = {
  ia: {
    label: "Resolvido IA",
    color: "#3b82a0",
  },
  escalados: {
    label: "Escalados",
    color: "#94a3b8",
  },
} satisfies ChartConfig;

const intencoesChartConfig = {
  value: {
    label: "Quantidade",
    color: "#1a4a5e",
  },
} satisfies ChartConfig;

const kpis = [
  { label: "ATENDIMENTOS (IA)", value: "820", subtitle: "Últimos 7 dias" },
  { label: "LEADS QUALIFICADOS", value: "470", subtitle: "Últimos 7 dias" },
  { label: "ESCALADOS", value: "160", subtitle: "Para humano" },
  { label: "TEMPO DE RESPOSTA", value: "≈ 6 min", subtitle: "Média" },
];

const qualityCards = [
  {
    icon: Shield,
    title: "LGPD em dia",
    description: "Consentimentos registrados em 100% dos leads.",
  },
  {
    icon: Clock,
    title: "Tempo de resposta",
    description: "Relatórios por canal e por etapa (IA vs humano), com priorização.",
  },
  {
    icon: Target,
    title: "Acurácia",
    description: "Classificação correta em 93% das triagens.",
  },
];

export default function DashGestaoIAView() {
  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto p-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
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

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Resolução IA vs Escalados */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500 text-xs">⚡</span>
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Resolução IA vs escalados
            </h3>
          </div>
          <ChartContainer config={resolucaoChartConfig} className="h-[180px] w-full">
            <AreaChart
              data={resolucaoData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillIAGestao" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-ia)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-ia)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                domain={[0, 260]}
                fontSize={12}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                type="monotone"
                dataKey="ia"
                stroke="var(--color-ia)"
                fill="url(#fillIAGestao)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="escalados"
                stroke="var(--color-escalados)"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="4 4"
              />
            </AreaChart>
          </ChartContainer>
          <p className="text-xs text-gray-500 mt-3">
            Acompanhe quanto a IA resolve e quanto é escalado para o time.
          </p>
        </div>

        {/* Principais Intenções */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500 text-xs">☰</span>
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Principais intenções
            </h3>
          </div>
          <ChartContainer config={intencoesChartConfig} className="h-[180px] w-full">
            <BarChart
              data={intencoesData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                width={100}
                fontSize={12}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="value"
                fill="#1a4a5e"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ChartContainer>
          <p className="text-xs text-gray-500 mt-3">
            Entenda quais intents mais impactam a operação.
          </p>
        </div>
      </div>

      {/* Quality Cards */}
      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500 text-xs">✓</span>
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            Qualidade e conformidade
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {qualityCards.map((card) => (
            <div key={card.title} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <card.icon className="w-4 h-4 text-[#1a4a5e]" />
                <h4 className="font-semibold text-gray-900 text-sm">{card.title}</h4>
              </div>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
