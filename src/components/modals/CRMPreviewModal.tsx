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
  Settings,
  Sparkles,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";

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
    { id: "contacts" as ViewType, icon: Users, label: "Contacts" },
    { id: null, icon: Building2, label: "Companies", disabled: true },
    { id: null, icon: Zap, label: "Activities", disabled: true },
    { id: null, icon: Calendar, label: "Calendar", disabled: true },
    { id: null, icon: FileText, label: "Reports", disabled: true },
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

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="CRM Integrado"
      subtitle=""
    >
      <div className="h-full flex flex-col -mx-8 -mt-2">
        {/* Transition gradient from dark modal to light content */}
        <div className="h-2 bg-gradient-to-b from-[#02040A] to-[#1a2a3a]" />

        {/* Header with subtitle and filters */}
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
                <p className="text-white text-sm font-medium">CRM Comercial</p>
                <p className="text-gray-400 text-xs">Menu principal</p>
              </div>
            </div>

            {/* Main Menu */}
            <div className="px-3 mt-2">
              <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase px-3 mb-2">
                Main
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

            {/* Management Menu */}
            <div className="px-3 mt-6">
              <p className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase px-3 mb-2">
                Management
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

          {/* Content Area with Animation */}
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
    </ModalWrapper>
  );
}
