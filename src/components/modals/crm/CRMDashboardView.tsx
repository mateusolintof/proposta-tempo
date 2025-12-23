"use client";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  PieChart,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

// Chart data
const volumeData = [
  { day: "Seg", leads: 180, pedidos: 95 },
  { day: "Ter", leads: 220, pedidos: 120 },
  { day: "Qua", leads: 280, pedidos: 150 },
  { day: "Qui", leads: 260, pedidos: 140 },
  { day: "Sex", leads: 240, pedidos: 130 },
  { day: "Sab", leads: 160, pedidos: 80 },
];

const origemData = [
  { name: "WhatsApp", value: 42, fill: "#1a4a5e" },
  { name: "Instagram", value: 26, fill: "#3b82a0" },
  { name: "Google", value: 20, fill: "#5ba3c0" },
  { name: "Indicação", value: 12, fill: "#8ec5d9" },
];

const volumeChartConfig = {
  leads: {
    label: "Leads",
    color: "#3b82a0",
  },
  pedidos: {
    label: "Pedidos",
    color: "#1a4a5e",
  },
} satisfies ChartConfig;

const origemChartConfig = {
  value: {
    label: "Porcentagem",
  },
  WhatsApp: {
    label: "WhatsApp",
    color: "#1a4a5e",
  },
  Instagram: {
    label: "Instagram",
    color: "#3b82a0",
  },
  Google: {
    label: "Google",
    color: "#5ba3c0",
  },
  Indicação: {
    label: "Indicação",
    color: "#8ec5d9",
  },
} satisfies ChartConfig;

const kpis = [
  { label: "CONVERSAS ATIVAS", value: "284", subtitle: "Inbox unificado" },
  { label: "PEDIDOS ATIVOS", value: "126", subtitle: "Próximos 7 dias" },
  { label: "DEALS EM NEGOCIAÇÃO", value: "412", subtitle: "Pipelines" },
  { label: "RECEITA EM PIPELINE", value: "R$ 1,9M", subtitle: "Prox. 30 dias" },
];

export default function CRMDashboardView() {
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
      <div className="grid grid-cols-5 gap-4">
        {/* Area Chart */}
        <div className="col-span-3 bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              Volume de leads e pedidos
            </h3>
            <span className="text-xs text-gray-400">Última semana</span>
          </div>
          <ChartContainer config={volumeChartConfig} className="h-[220px] w-full">
            <AreaChart
              data={volumeData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillLeadsCRM" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-leads)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-leads)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillPedidosCRM" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-pedidos)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-pedidos)" stopOpacity={0} />
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
                domain={[0, 320]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="var(--color-leads)"
                fill="url(#fillLeadsCRM)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="pedidos"
                stroke="var(--color-pedidos)"
                fill="url(#fillPedidosCRM)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Donut Chart */}
        <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Origem dos leads
          </h3>
          <ChartContainer config={origemChartConfig} className="h-[180px] w-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={origemData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
