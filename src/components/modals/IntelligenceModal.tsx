"use client";

import type { ReactNode } from "react";
import { BarChart3, Link2, Sparkles } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import ModalWrapper from "./ModalWrapper";

interface IntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const channelData = [
  { key: "whatsapp", label: "WhatsApp", value: 42 },
  { key: "instagram", label: "Instagram", value: 26 },
  { key: "google", label: "Google", value: 20 },
  { key: "indicacao", label: "Indicacao", value: 12 },
] as { key: string; label: string; value: number }[];

const channelChartConfig = {
  whatsapp: { label: "WhatsApp", color: "#00E5FF" },
  instagram: { label: "Instagram", color: "#1a5a6a" },
  google: { label: "Google", color: "#2a7a8a" },
  indicacao: { label: "Indicacao", color: "#7ad4e8" },
} satisfies ChartConfig;

const noshowReasonData = [
  { label: "Sem confirmacao", value: 34 },
  { label: "Duvida de preparo", value: 22 },
  { label: "Horario inadequado", value: 18 },
  { label: "Convenio pendente", value: 14 },
  { label: "Outros", value: 12 },
] as { label: string; value: number }[];

const noshowChartConfig = {
  value: { label: "Incidencia", color: "#00E5FF" },
} satisfies ChartConfig;

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 text-sm text-slate-700">
      <span
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]"
        aria-hidden="true"
      />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function IntelligenceModal({
  isOpen,
  onClose,
}: IntelligenceModalProps) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Inteligencia de Dados"
      subtitle="Visao unificada de conversas e agenda"
    >
      <div className="space-y-6">
        <div className="text-sm text-white/70">
          Em vez de &quot;olhar no achismo&quot;, a solucao transforma conversas e agenda
          em uma visao unica: origem, intencao, etapa, motivo de perda e proxima
          acao.
        </div>

        {/* Feature Cards Row */}
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <Sparkles className="h-5 w-5" />,
              title: "Classificacao automatica",
              desc: "Canal, intencao, perfil e tipo de paciente — sem digitacao manual.",
            },
            {
              icon: <Link2 className="h-5 w-5" />,
              title: "Conciliacao com agenda",
              desc: "Sabe quem agendou, remarcou, faltou ou compareceu — com rastreio por origem.",
            },
            {
              icon: <BarChart3 className="h-5 w-5" />,
              title: "Insights acionaveis",
              desc: "Relatorios e recomendacoes para agir no mesmo dia, nao no fim do mes.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00E5FF]/20 text-[#00E5FF]">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="mt-1 text-sm text-white/60">{item.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Channel Distribution - Pie Chart */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">
                  Distribuicao por canal (exemplo)
                </div>
                <div className="mt-1 text-xs text-white/50">
                  Ajuda a priorizar investimento por lead que vira consulta.
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[160px_1fr] sm:items-center">
              <ChartContainer
                config={channelChartConfig}
                className="h-40 w-full"
              >
                <PieChart>
                  <Pie
                    data={channelData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={44}
                    outerRadius={72}
                    paddingAngle={4}
                  >
                    {channelData.map((entry) => (
                      <Cell
                        key={entry.key}
                        fill={`var(--color-${entry.key})`}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="label" />}
                  />
                </PieChart>
              </ChartContainer>

              <div className="space-y-2 text-sm">
                {channelData.map((entry) => (
                  <div
                    key={entry.key}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: `var(--color-${entry.key})` }}
                      />
                      <span className="font-medium text-white">
                        {entry.label}
                      </span>
                    </div>
                    <span className="text-white/60">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* No-show Reasons - Bar Chart */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">
                  Motivos de no-show (exemplo)
                </div>
                <div className="mt-1 text-xs text-white/50">
                  Direciona ajustes de confirmacao, preparo e fila de espera.
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ChartContainer
                config={noshowChartConfig}
                className="h-56 w-full"
              >
                <BarChart
                  data={noshowReasonData}
                  layout="vertical"
                  margin={{ left: 0, right: 18, top: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    horizontal={false}
                    strokeDasharray="3 3"
                    stroke="rgba(255, 255, 255, 0.1)"
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={130}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "rgba(255, 255, 255, 0.6)", fontSize: 12 }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="label" />}
                  />
                  <Bar dataKey="value" fill="var(--color-value)" radius={10} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-semibold text-white">
            Perguntas que passam a ter resposta rapida
          </div>
          <div className="mt-3 space-y-2">
            <Bullet>
              Quais canais trazem pacientes que agendam e comparecem (e nao so
              volume)?
            </Bullet>
            <Bullet>
              Em que etapa do funil estamos perdendo mais e por que?
            </Bullet>
            <Bullet>
              Quais horarios/profissionais tem mais remarcacao ou no-show?
            </Bullet>
            <Bullet>
              Qual mensagem/objecao mais trava o agendamento e qual resposta
              converte melhor?
            </Bullet>
          </div>
        </div>

        <div className="text-xs text-white/40">
          Dados e exemplos sao ilustrativos para demo comercial. Ajustamos
          metricas e paineis apos a imersao e leitura dos dados reais.
        </div>
      </div>
    </ModalWrapper>
  );
}
