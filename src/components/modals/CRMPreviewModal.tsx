"use client";

import { motion } from "framer-motion";
import {
  Users,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
  Tag,
  Filter,
} from "lucide-react";
import ModalWrapper from "./ModalWrapper";

interface CRMPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const pipelineStages = [
  { id: "new", label: "Novo Lead", count: 45, color: "#00E5FF" },
  { id: "qualifying", label: "Em Qualificacao", count: 28, color: "#FFD700" },
  { id: "qualified", label: "Qualificado", count: 67, color: "#00FF94" },
  { id: "scheduled", label: "Agendado", count: 52, color: "#00E5FF" },
  { id: "confirmed", label: "Confirmado", count: 41, color: "#00FF94" },
  { id: "done", label: "Realizada", count: 38, color: "#00FF94" },
];

const sampleLeads = [
  {
    name: "Joao Silva",
    phone: "(63) 99999-9999",
    status: "Agendado",
    type: "Particular",
    temp: "quente",
    lastContact: "Hoje, 14:32",
  },
  {
    name: "Maria Santos",
    phone: "(63) 98888-8888",
    status: "Qualificado",
    type: "Unimed",
    temp: "morno",
    lastContact: "Ontem, 10:15",
  },
  {
    name: "Carlos Oliveira",
    phone: "(63) 97777-7777",
    status: "Novo Lead",
    type: "Bradesco",
    temp: "frio",
    lastContact: "Hoje, 09:00",
  },
];

const tempColors = {
  quente: "#FF6B6B",
  morno: "#FFD700",
  frio: "#00E5FF",
};

export default function CRMPreviewModal({
  isOpen,
  onClose,
}: CRMPreviewModalProps) {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="CRM Comercial"
      subtitle="Visualizacao completa do funil de vendas"
    >
      <div className="space-y-8">
        {/* Pipeline Visual */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#00E5FF]" />
            Pipeline de Vendas
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {pipelineStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <p
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: stage.color }}
                >
                  {stage.count}
                </p>
                <p className="text-white/50 text-[10px] md:text-xs mt-1 leading-tight">
                  {stage.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <Filter className="w-4 h-4 text-white/50" />
            <span className="text-white/70 text-sm">Todos os Status</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <Tag className="w-4 h-4 text-white/50" />
            <span className="text-white/70 text-sm">Particular</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <Tag className="w-4 h-4 text-white/50" />
            <span className="text-white/70 text-sm">Convenio</span>
          </div>
          <div className="flex items-center gap-2 bg-[#FF6B6B]/20 border border-[#FF6B6B]/30 rounded-lg px-3 py-2">
            <Clock className="w-4 h-4 text-[#FF6B6B]" />
            <span className="text-[#FF6B6B] text-sm">Alta Urgencia</span>
          </div>
        </div>

        {/* Lead Cards */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Leads Recentes
          </h3>
          <div className="space-y-3">
            {sampleLeads.map((lead, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00E5FF]/30 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    {/* Temperature indicator */}
                    <div
                      className="w-2 h-12 rounded-full"
                      style={{
                        backgroundColor:
                          tempColors[lead.temp as keyof typeof tempColors],
                      }}
                    />
                    <div>
                      <p className="text-white font-medium">{lead.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-3 h-3 text-white/40" />
                        <span className="text-white/50 text-sm">
                          {lead.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Status badge */}
                    <span className="px-3 py-1 bg-[#00E5FF]/20 text-[#00E5FF] text-xs rounded-full">
                      {lead.status}
                    </span>
                    {/* Type badge */}
                    <span className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                      {lead.type}
                    </span>
                    {/* Last contact */}
                    <span className="text-white/40 text-xs">
                      {lead.lastContact}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lead Detail Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00E5FF]" />
              Ficha do Lead
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Nome:</span>
                <span className="text-white">Joao Silva</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Idade:</span>
                <span className="text-white">45 anos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Queixa:</span>
                <span className="text-white">Dor no joelho</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Urgencia:</span>
                <span className="text-[#FFD700]">Media</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Interesse:</span>
                <span className="text-white">Artroscopia</span>
              </div>
              <div className="pt-3 border-t border-white/10">
                <p className="text-white/50 text-xs mb-2">Tags:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-[#00FF94]/20 text-[#00FF94] text-xs rounded">
                    #PrimeiraConsulta
                  </span>
                  <span className="px-2 py-0.5 bg-[#00E5FF]/20 text-[#00E5FF] text-xs rounded">
                    #Particular
                  </span>
                  <span className="px-2 py-0.5 bg-white/10 text-white/70 text-xs rounded">
                    #Artrose
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#00FF94]" />
              Historico de Conversa
            </h4>
            <div className="space-y-3 text-sm max-h-[200px] overflow-y-auto">
              <div className="bg-[#00FF94]/10 rounded-lg p-2 ml-4">
                <p className="text-white/80">
                  Ola! Gostaria de agendar uma consulta com o Dr. Mauricio.
                </p>
                <p className="text-white/40 text-xs mt-1">14:30</p>
              </div>
              <div className="bg-[#00E5FF]/10 rounded-lg p-2 mr-4">
                <p className="text-white/80">
                  Ola! Sou o assistente virtual do Dr. Mauricio. Sera particular
                  ou convenio?
                </p>
                <p className="text-white/40 text-xs mt-1">14:30 - Bot</p>
              </div>
              <div className="bg-[#00FF94]/10 rounded-lg p-2 ml-4">
                <p className="text-white/80">Particular</p>
                <p className="text-white/40 text-xs mt-1">14:31</p>
              </div>
              <div className="bg-[#00E5FF]/10 rounded-lg p-2 mr-4">
                <p className="text-white/80">
                  Perfeito! Temos horarios disponiveis na segunda as 14h, quarta
                  as 10h ou sexta as 16h. Qual prefere?
                </p>
                <p className="text-white/40 text-xs mt-1">14:31 - Bot</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-white/50 text-sm">
            CRM completo incluido no{" "}
            <span className="text-[#00FF94] font-semibold">
              Ecossistema Full
            </span>
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
}
