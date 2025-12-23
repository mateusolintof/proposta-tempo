"use client";

import type { ReactNode } from "react";
import { CalendarCheck2, Gauge, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import ModalWrapper from "./ModalWrapper";

interface GainsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const workloadData = [
  { name: "Seg", ia: 68, humano: 34 },
  { name: "Ter", ia: 72, humano: 40 },
  { name: "Qua", ia: 78, humano: 46 },
  { name: "Qui", ia: 75, humano: 42 },
  { name: "Sex", ia: 66, humano: 38 },
  { name: "Sab", ia: 54, humano: 22 },
];

const workloadChartConfig = {
  ia: { label: "IA", color: "#00E5FF" },
  humano: { label: "Humano", color: "#1a3a4a" },
} satisfies ChartConfig;

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 text-body text-white/70">
      <span
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]"
        aria-hidden="true"
      />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function GainsModal({ isOpen, onClose }: GainsModalProps) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Ganhos Operacionais"
      subtitle="Impacto direto na operação comercial"
    >
      <div className="space-y-6">
        <div className="text-body text-white/70">
          Esta é uma visão do que muda na operação quando o volume repetitivo é
          absorvido pela IA, com governança de pipeline e relatórios para
          gestão.
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Column - Benefit Cards */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00E5FF]/20 text-[#00E5FF]">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-white">
                    Receita capturada com cadência
                  </h4>
                  <p className="mt-1 text-body text-white/60">
                    Leads entram fora do horário, voltam para o funil e seguem
                    um próximo passo claro — sem depender de memória ou
                    planilhas.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Bullet>
                      Resposta imediata 24/7 para não &quot;esfriar&quot; o lead.
                    </Bullet>
                    <Bullet>
                      Qualificação e roteamento por perfil (PF/PJ) e intenção.
                    </Bullet>
                    <Bullet>
                      Follow-up automático com prioridade por intenção.
                    </Bullet>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00E5FF]/20 text-[#00E5FF]">
                  <Gauge className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-white">
                    Menos ruído, mais produtividade
                  </h4>
                  <p className="mt-1 text-body text-white/60">
                    A operação deixa de ser call center. O time humano atua onde
                    faz diferença: negociação, casos complexos e relacionamento.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Bullet>
                      Fila única com contexto e histórico da conversa.
                    </Bullet>
                    <Bullet>Distribuição por responsável e por canal.</Bullet>
                    <Bullet>
                      Checklist de próximos passos para reduzir retrabalho.
                    </Bullet>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00E5FF]/20 text-[#00E5FF]">
                  <CalendarCheck2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-white">
                    Pipeline mais previsível
                  </h4>
                  <p className="mt-1 text-body text-white/60">
                    Cadência automática e reativação guiada diminuem perdas — e
                    deixam claro onde estão os gargalos do funil.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Bullet>
                      Cadência automática para orçamentos e pedidos pendentes.
                    </Bullet>
                    <Bullet>
                      Recuperação de conversões com alternativas e próxima ação.
                    </Bullet>
                    <Bullet>
                      Registro de motivos para melhoria contínua.
                    </Bullet>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Chart and Reports */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-body font-semibold text-white">
                    Carga de atendimento (exemplo)
                  </div>
                  <div className="mt-1 text-xs text-white/50">
                    IA absorve picos e fora do horário; humano foca no que
                    converte.
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-xs text-white/60">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: "#00E5FF" }}
                    />
                    IA
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: "#1a3a4a" }}
                    />
                    Humano
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <ChartContainer
                  config={workloadChartConfig}
                  className="h-56 w-full"
                >
                  <BarChart
                    data={workloadData}
                    margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="rgba(255, 255, 255, 0.1)"
                    />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "rgba(255, 255, 255, 0.6)", fontSize: 12 }}
                    />
                    <YAxis hide tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="ia"
                      stackId="workload"
                      fill="var(--color-ia)"
                      radius={[10, 10, 0, 0]}
                    />
                    <Bar
                      dataKey="humano"
                      stackId="workload"
                      fill="var(--color-humano)"
                      radius={[0, 0, 10, 10]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-body font-semibold text-white">
                O que aparece em Reports
              </div>
              <div className="mt-3 space-y-2">
                <Bullet>
                  Tempo de primeira resposta por canal e por etapa (IA vs
                  humano).
                </Bullet>
                <Bullet>
                  Conversão por etapa, origem e responsável — com histórico.
                </Bullet>
                <Bullet>
                  Abandono, cancelamentos e motivos de perda por período.
                </Bullet>
                <Bullet>
                  Motivos de perda e recomendações acionáveis geradas por IA.
                </Bullet>
              </div>
              <div className="mt-4 text-xs text-white/40">
                Dados e metas são ilustrativos nesta proposta. Ajustamos após a
                imersão e leitura dos dados reais.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
