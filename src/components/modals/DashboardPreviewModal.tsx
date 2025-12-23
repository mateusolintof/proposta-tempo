"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Bot,
  Users,
  UserCheck,
  Lightbulb,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";
import { useMediaQuery } from "@/lib/useMediaQuery";

// Views
import DashVisaoGeralView from "./dashboard/DashVisaoGeralView";
import DashGestaoIAView from "./dashboard/DashGestaoIAView";
import DashClientesView from "./dashboard/DashClientesView";
import DashInsightsView from "./dashboard/DashInsightsView";

interface DashboardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewType = "visaogeral" | "gestao" | "vendedores" | "clientes" | "insights";

export default function DashboardPreviewModal({
  isOpen,
  onClose,
}: DashboardPreviewModalProps) {
  const [activeView, setActiveView] = useState<ViewType>("visaogeral");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const mobileTabs: Array<{ id: ViewType; label: string }> = [
    { id: "visaogeral", label: "Visão geral" },
    { id: "gestao", label: "Gestão IA" },
    { id: "clientes", label: "Clientes" },
    { id: "insights", label: "Insights" },
  ];

  const menuItems = [
    { id: "visaogeral" as ViewType, icon: LayoutDashboard, label: "Visão geral" },
    { id: "gestao" as ViewType, icon: Bot, label: "Gestão IA" },
    { id: "vendedores" as ViewType, icon: Users, label: "Atendimento vendedores", disabled: true },
    { id: "clientes" as ViewType, icon: UserCheck, label: "Clientes" },
    { id: "insights" as ViewType, icon: Lightbulb, label: "Insights + reports" },
  ];

  const renderView = () => {
    switch (activeView) {
      case "visaogeral":
        return <DashVisaoGeralView />;
      case "gestao":
        return <DashGestaoIAView />;
      case "clientes":
        return <DashClientesView />;
      case "insights":
        return <DashInsightsView />;
      default:
        return <DashVisaoGeralView />;
    }
  };

  const renderMobileView = () => {
    switch (activeView) {
      case "visaogeral":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Tempo de resposta", value: "Imediato", hint: "24/7 com IA" },
                { label: "Leads recuperados", value: "+500/mês", hint: "Fora do horário" },
                { label: "Conversão", value: "+40%", hint: "Pipeline com cadência" },
                { label: "Abandono", value: "-60%", hint: "Follow-up automático" },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                    {kpi.label}
                  </p>
                  <p className="mt-2 text-lg font-bold text-gray-900">
                    {kpi.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{kpi.hint}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900">
                Resumo do funil (exemplo)
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900">Novos</p>
                  <p className="mt-1 text-gray-600">128 leads</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900">Negociação</p>
                  <p className="mt-1 text-gray-600">64 leads</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900">Follow-up</p>
                  <p className="mt-1 text-gray-600">52 leads</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 border border-gray-200">
                  <p className="font-semibold text-gray-900">Fechados</p>
                  <p className="mt-1 text-gray-600">31 pedidos</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "gestao":
        return (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900">
                Qualidade e governança (exemplo)
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>• Handoffs para humano em casos críticos.</li>
                <li>• Logs completos + trilha de auditoria.</li>
                <li>• Guardrails LGPD e confirmação em dados sensíveis.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Automações", value: "51%", hint: "Tempo efetivo" },
                { label: "Handoffs", value: "7%", hint: "Casos críticos" },
                { label: "Satisfação", value: "4,7/5", hint: "Pós-compra" },
                { label: "NPS", value: "+18", hint: "Tendência" },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                    {kpi.label}
                  </p>
                  <p className="mt-2 text-lg font-bold text-gray-900">
                    {kpi.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{kpi.hint}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "clientes":
        return (
          <div className="space-y-3">
            {[
              { segment: "Reposição mensal", share: "34%", hint: "Alta recorrência" },
              { segment: "Compra pontual", share: "28%", hint: "Oportunidade de cadência" },
              { segment: "B2B / PJ", share: "22%", hint: "Ticket médio alto" },
              { segment: "Primeiro contato", share: "16%", hint: "Ativar onboarding" },
            ].map((row) => (
              <div
                key={row.segment}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {row.segment}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{row.hint}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-semibold text-sky-900">
                    {row.share}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "insights":
        return (
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900">
                Insights acionáveis (exemplo)
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>• Leads com risco de abandono ↑ (priorizar agora).</li>
                <li>• Produtos mais pedidos por canal (ajustar oferta).</li>
                <li>• Principais motivos de perda (corrigir gargalos).</li>
                <li>• SLA por vendedor e por horário (escala de equipe).</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900">Relatórios</p>
              <p className="mt-1 text-sm text-gray-600">
                Exportações e painéis por período, canal, equipe e produto.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Painel Executivo"
      subtitle=""
    >
      <div className="h-full flex flex-col -mx-8 -mt-2">
        {!isDesktop ? (
          <div className="h-full flex flex-col">
            <div className="h-2 bg-gradient-to-b from-[#02040A] to-[#1a2a3a]" />

            <div className="px-6 pb-4 pt-5 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white shadow-sm">
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                Dashboard Executivo
              </p>
              <h2 className="text-lg font-semibold text-gray-900 mt-1">
                Visão completa do atendimento comercial
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                KPIs, funis e insights com suporte de IA
              </p>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 px-6 py-5">
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {mobileTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveView(tab.id)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      activeView === tab.id
                        ? "bg-[#1a3a4a] text-white"
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-4">{renderMobileView()}</div>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold text-gray-900">
                  Preview completo
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Em telas maiores, exibimos o layout completo (com sidebar e
                  gráficos) para simular a experiência real do dashboard.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="h-2 bg-gradient-to-b from-[#02040A] to-[#1a2a3a]" />

            <div className="px-8 pb-4 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white shadow-sm">
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
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                    Preview interativo
                  </span>
                  <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                    Últimos 7 dias
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-white bg-[#1a3a4a] rounded-full">
                    Últimos 30 dias
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              <div className="w-56 bg-[#1a2a3a] flex-shrink-0 overflow-y-auto">
                <div className="px-4 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2a4a5a] flex items-center justify-center text-white text-xs font-bold">
                    AI
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Dashboard</p>
                    <p className="text-gray-400 text-xs">Menu principal</p>
                  </div>
                </div>

                <div className="px-3 mt-2">
                  <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase px-3 mb-2">
                    Main
                  </p>
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => !item.disabled && setActiveView(item.id)}
                      disabled={item.disabled}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                        item.disabled
                          ? "text-gray-600 cursor-not-allowed"
                          : activeView === item.id
                          ? "bg-[#2a4a5a] text-white"
                          : "text-gray-400 hover:text-gray-300 hover:bg-[#2a4a5a]/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="px-3 mt-8">
                  <div className="bg-[#2a4a5a]/50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs">
                      Dados anonimizados para demo comercial.
                    </p>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex overflow-hidden"
                >
                  {renderView()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
