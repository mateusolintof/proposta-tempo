"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Lightbulb,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  FileText,
  Download,
  Calendar,
  ArrowRight,
} from "lucide-react";

const performanceData = [
  { metric: "Taxa conversão", atual: 38, meta: 45 },
  { metric: "Tempo resposta", atual: 85, meta: 90 },
  { metric: "Satisfação", atual: 92, meta: 95 },
  { metric: "Retenção", atual: 78, meta: 80 },
];

const chartConfig = {
  atual: {
    label: "Atual",
    color: "#1a4a5e",
  },
  meta: {
    label: "Meta",
    color: "#94a3b8",
  },
} satisfies ChartConfig;

const insights = [
  {
    type: "opportunity",
    title: "Oportunidade de conversão",
    description: "32 leads qualificados aguardam follow-up há mais de 48h. Priorize contato para aumentar taxa de conversão em até 15%.",
    impact: "Alto impacto",
    action: "Ver leads",
  },
  {
    type: "warning",
    title: "Atenção ao canal Instagram",
    description: "Taxa de resposta no Instagram caiu 23% esta semana. Considere automatização ou realocação de recursos.",
    impact: "Médio impacto",
    action: "Analisar",
  },
  {
    type: "success",
    title: "Meta de pedidos atingida",
    description: "Parabéns! O time superou a meta de pedidos em 12% este mês. Mantenha a estratégia atual.",
    impact: "Positivo",
    action: "Ver detalhes",
  },
];

const reports = [
  {
    title: "Relatório Semanal",
    description: "Performance geral do time comercial",
    date: "Gerado em 20/12/2024",
    status: "Disponível",
  },
  {
    title: "Análise de Funil",
    description: "Conversão por etapa e canal",
    date: "Gerado em 18/12/2024",
    status: "Disponível",
  },
  {
    title: "ROI por Canal",
    description: "Retorno sobre investimento em marketing",
    date: "Agendado para 23/12",
    status: "Agendado",
  },
];

const actionItems = [
  { task: "Revisar 12 propostas pendentes", priority: "Alta", due: "Hoje" },
  { task: "Follow-up com leads inativos", priority: "Média", due: "Amanhã" },
  { task: "Atualizar templates de mensagem", priority: "Baixa", due: "Esta semana" },
];

export default function DashInsightsView() {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <Lightbulb className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInsightStyle = (type: string) => {
    switch (type) {
      case "opportunity":
        return "border-l-blue-500 bg-blue-50/50";
      case "warning":
        return "border-l-amber-500 bg-amber-50/50";
      case "success":
        return "border-l-green-500 bg-green-50/50";
      default:
        return "border-l-gray-500 bg-gray-50/50";
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Insights e Recomendações</h3>
        <p className="text-sm text-gray-500">Sugestões inteligentes baseadas nos dados do seu negócio</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Insights */}
        <div className="col-span-2 space-y-4">
          {/* Insights Cards */}
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 border border-gray-100 border-l-4 ${getInsightStyle(insight.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getInsightIcon(insight.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        insight.impact === "Alto impacto" ? "bg-blue-100 text-blue-700" :
                        insight.impact === "Médio impacto" ? "bg-amber-100 text-amber-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {insight.impact}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{insight.description}</p>
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-[#1a4a5e] hover:underline">
                      {insight.action}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#1a4a5e]" />
              <h3 className="text-base font-semibold text-gray-900">
                Performance vs Metas
              </h3>
            </div>
            <ChartContainer config={chartConfig} className="h-[180px] w-full">
              <BarChart
                data={performanceData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="metric"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  width={110}
                  fontSize={12}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="atual"
                  fill="var(--color-atual)"
                  radius={[0, 4, 4, 0]}
                  barSize={16}
                />
                <Bar
                  dataKey="meta"
                  fill="var(--color-meta)"
                  radius={[0, 4, 4, 0]}
                  barSize={16}
                />
              </BarChart>
            </ChartContainer>
            <div className="flex items-center justify-center gap-6 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#1a4a5e]" />
                <span className="text-xs text-gray-500">Atual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-300" />
                <span className="text-xs text-gray-500">Meta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Reports & Actions */}
        <div className="space-y-4">
          {/* Action Items */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 text-sm">Ações pendentes</h4>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                {actionItems.length} itens
              </span>
            </div>
            <div className="space-y-2">
              {actionItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    item.priority === "Alta" ? "bg-red-500" :
                    item.priority === "Média" ? "bg-amber-500" :
                    "bg-gray-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-900 truncate">{item.task}</p>
                    <p className="text-[11px] text-gray-500">{item.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reports */}
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#1a4a5e]" />
              <h4 className="font-semibold text-gray-900 text-sm">Relatórios</h4>
            </div>
            <div className="space-y-2">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="text-sm font-medium text-gray-900">{report.title}</h5>
                    {report.status === "Disponível" ? (
                      <button className="p-1 text-[#1a4a5e] hover:bg-[#e8f4f8] rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    ) : (
                      <Calendar className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{report.description}</p>
                  <p className="text-[11px] text-gray-400">{report.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary Box */}
          <div className="bg-gradient-to-br from-[#1a3a4a] to-[#2a5a6a] rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4" />
              <h4 className="font-semibold text-sm">Resumo IA</h4>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed">
              Esta semana, o principal gargalo está na conversão de leads qualificados para pedidos.
              Recomendamos priorizar o follow-up nos primeiros 20 minutos após a qualificação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
