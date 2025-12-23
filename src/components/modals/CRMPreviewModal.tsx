"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Inbox,
  GitBranch,
  Users,
  Building2,
  Zap,
  Calendar,
  FileText,
  ChevronDown,
  Clock,
  Sparkles,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";
import { useMediaQuery } from "@/lib/useMediaQuery";

// Views
import CRMDashboardView from "./crm/CRMDashboardView";
import CRMInboxView from "./crm/CRMInboxView";
import CRMContactsView from "./crm/CRMContactsView";
import CRMPipelineView from "./crm/CRMPipelineView";

interface CRMPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewType = "dashboard" | "inbox" | "pipeline" | "contacts";

export default function CRMPreviewModal({
  isOpen,
  onClose,
}: CRMPreviewModalProps) {
  const [activeView, setActiveView] = useState<ViewType>("dashboard");
  const [pipelineExpanded, setPipelineExpanded] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const mobileTabs: Array<{ id: ViewType; label: string }> = [
    { id: "dashboard", label: "Dashboard" },
    { id: "inbox", label: "Inbox" },
    { id: "pipeline", label: "Pipeline" },
    { id: "contacts", label: "Clientes" },
  ];

  const menuItems = [
    { id: "dashboard" as ViewType, icon: LayoutDashboard, label: "Dashboard" },
    { id: "inbox" as ViewType, icon: Inbox, label: "Inbox" },
    {
      id: "pipeline" as ViewType,
      icon: GitBranch,
      label: "Pipeline",
      expandable: true,
      children: ["Atendimento IA", "Atendimento humano", "Follow-up"],
    },
  ];

  const managementItems = [
    { id: "contacts" as ViewType, icon: Users, label: "Clientes" },
    { id: null, icon: Building2, label: "Empresas", disabled: true },
    { id: null, icon: Zap, label: "Atividades", disabled: true },
    { id: null, icon: Calendar, label: "Calendário", disabled: true },
    { id: null, icon: FileText, label: "Relatórios", disabled: true },
  ];

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <CRMDashboardView />;
      case "inbox":
        return <CRMInboxView />;
      case "pipeline":
        return <CRMPipelineView />;
      case "contacts":
        return <CRMContactsView />;
      default:
        return <CRMDashboardView />;
    }
  };

  const renderMobileView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Conversas ativas", value: "284", hint: "Inbox unificado" },
                { label: "Pedidos ativos", value: "126", hint: "Próx. 7 dias" },
                { label: "Deals em negociação", value: "412", hint: "Pipelines" },
                { label: "Receita em pipeline", value: "R$ 1,9M", hint: "Próx. 30 dias" },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                    {kpi.label}
                  </p>
                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {kpi.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{kpi.hint}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900">
                Principais canais (exemplo)
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { label: "WhatsApp · 42%", color: "bg-emerald-100 text-emerald-900" },
                  { label: "Instagram · 26%", color: "bg-sky-100 text-sky-900" },
                  { label: "Google · 20%", color: "bg-amber-100 text-amber-900" },
                  { label: "Indicação · 12%", color: "bg-slate-100 text-slate-900" },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${chip.color}`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "inbox":
        return (
          <div className="space-y-3">
            {[
              { name: "Marina Duarte", channel: "WhatsApp", message: "Quero cotar paracetamol e dipirona…", tag: "Novo" },
              { name: "Rafael Lima", channel: "Instagram", message: "Tem entrega hoje para SP capital?", tag: "Em negociação" },
              { name: "Empresa São Jorge", channel: "WhatsApp", message: "Preciso de proposta mensal (PJ)…", tag: "Qualificado" },
              { name: "Ana Beatriz", channel: "Google", message: "Qual o prazo para retirada na loja?", tag: "FAQ" },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{item.channel}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700">
                    {item.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        );

      case "pipeline":
        return (
          <div className="space-y-4">
            {[
              { stage: "Novos (IA)", count: 128, hint: "Qualificação automática" },
              { stage: "Em negociação", count: 64, hint: "Prioridade por intenção" },
              { stage: "Follow-up", count: 52, hint: "Cadência ativa" },
              { stage: "Fechados", count: 31, hint: "Pedidos confirmados" },
            ].map((stage) => (
              <div
                key={stage.stage}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {stage.stage}
                  </p>
                  <p className="text-sm font-bold text-gray-900">{stage.count}</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">{stage.hint}</p>
              </div>
            ))}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-sm font-semibold text-gray-900">O que a IA faz</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>• Qualifica (PF/PJ), coleta dados e identifica intenção.</li>
                <li>• Sugere próximo passo e prioriza por urgência.</li>
                <li>• Executa follow-ups e registra motivo de perda.</li>
              </ul>
            </div>
          </div>
        );

      case "contacts":
        return (
          <div className="space-y-3">
            {[
              { name: "Marina Duarte", segment: "Reposição mensal", score: 88 },
              { name: "Rafael Lima", segment: "Compra pontual", score: 74 },
              { name: "Empresa São Jorge (PJ)", segment: "Recorrência B2B", score: 92 },
              { name: "Ana Beatriz", segment: "Primeiro contato", score: 61 },
            ].map((contact) => (
              <div
                key={contact.name}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {contact.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{contact.segment}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-semibold text-sky-900">
                    Score {contact.score}
                  </span>
                </div>
              </div>
            ))}
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
      title="CRM Integrado"
      subtitle=""
    >
      <div className="h-full flex flex-col -mx-8 -mt-2">
        {/* Mobile (summary-first) */}
        {!isDesktop ? (
          <div className="h-full flex flex-col">
          <div className="h-2 bg-gradient-to-b from-[#02040A] to-[#1a2a3a]" />

          <div className="px-6 pb-4 pt-5 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white shadow-sm">
            <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
              CRM Comercial
            </p>
            <h2 className="text-lg font-semibold text-gray-900 mt-1">
              Central única de atendimento e vendas
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Inbox unificado + pipeline com IA + histórico completo do cliente
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
                gráficos) para simular a experiência real do CRM.
              </p>
            </div>
          </div>
          </div>
        ) : (
          /* Desktop (full interactive preview) */
          <div className="h-full flex-col flex">
          <div className="h-2 bg-gradient-to-b from-[#02040A] to-[#1a2a3a]" />

          <div className="px-8 pb-4 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                  CRM Comercial
                </p>
                <h2 className="text-xl font-semibold text-gray-900 mt-1">
                  Central única de atendimento e vendas
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Pipelines múltiplos, inbox unificado e analytics em tempo real
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                  Preview interativo
                </span>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                  <Clock className="w-4 h-4" />
                  Últimos 30 dias
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-[#1a3a4a] bg-[#e8f4f8] border border-[#c5e4ed] rounded-full">
                  <Sparkles className="w-4 h-4" />
                  IA ativa e treinada
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
                  <p className="text-white text-sm font-medium">CRM Comercial</p>
                  <p className="text-gray-400 text-xs">Menu principal</p>
                </div>
              </div>

              <div className="px-3 mt-2">
                <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase px-3 mb-2">
                  Principal
                </p>
                {menuItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => {
                        if (item.expandable) {
                          setPipelineExpanded(!pipelineExpanded);
                        }
                        setActiveView(item.id);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeView === item.id
                          ? "bg-[#2a4a5a] text-white"
                          : "text-gray-400 hover:text-gray-300 hover:bg-[#2a4a5a]/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm flex-1 text-left">{item.label}</span>
                      {item.expandable && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            pipelineExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                    {item.expandable && pipelineExpanded && (
                      <div className="ml-7 mt-1 space-y-1">
                        {item.children?.map((child) => (
                          <button
                            key={child}
                            onClick={() => setActiveView("pipeline")}
                            className={`w-full text-left text-sm py-1.5 transition-colors ${
                              activeView === "pipeline"
                                ? "text-gray-300"
                                : "text-gray-500 hover:text-gray-400"
                            }`}
                          >
                            {child}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="px-3 mt-6">
                <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase px-3 mb-2">
                  Gestão
                </p>
                {managementItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => item.id && setActiveView(item.id)}
                    disabled={item.disabled}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      item.disabled
                        ? "text-gray-600 cursor-not-allowed"
                        : item.id && activeView === item.id
                        ? "bg-[#2a4a5a] text-white"
                        : "text-gray-400 hover:text-gray-300 hover:bg-[#2a4a5a]/50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
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
