"use client";

import { useState } from "react";
import { MessageSquare, Phone, Mail, Tag } from "lucide-react";

interface Conversation {
  id: number;
  name: string;
  preview: string;
  time: string;
  channel: "whatsapp" | "instagram" | "email";
  unread?: boolean;
  avatar?: string;
}

interface Message {
  id: number;
  from: "lead" | "ai" | "agent";
  text: string;
  time: string;
}

const conversations: Conversation[] = [
  { id: 1, name: "Julia Alves", preview: "Podemos confirmar SIM ou Não. Qual preferir?", time: "há segundos", channel: "whatsapp", unread: true },
  { id: 2, name: "Marcos Lima", preview: "Olá! Gostaria de agendar uma consulta...", time: "10 min atrás", channel: "whatsapp" },
  { id: 3, name: "Patrícia Souza", preview: "Perfeito! Posso confirmar SIM às 17h...", time: "25 min atrás", channel: "whatsapp" },
  { id: 4, name: "Fernando Oliveira", preview: "Caro cliente, obrigado pelo contato...", time: "1h atrás", channel: "instagram" },
];

const messagesData: Record<number, Message[]> = {
  1: [
    { id: 1, from: "lead", text: "Olá, gostaria de agendar uma consulta de ortopedia", time: "10:30" },
    { id: 2, from: "ai", text: "Olá Julia! Claro, temos horários disponíveis. Você prefere pela manhã ou tarde?", time: "10:31" },
    { id: 3, from: "lead", text: "Prefiro à tarde, por favor", time: "10:32" },
    { id: 4, from: "ai", text: "Perfeito! Temos disponibilidade às 14h ou 17h. Qual horário funciona melhor para você?", time: "10:32" },
    { id: 5, from: "lead", text: "Podemos confirmar SIM ou Não. Qual preferir?", time: "10:33" },
  ],
  2: [
    { id: 1, from: "lead", text: "Olá! Gostaria de agendar uma consulta para avaliar dor no joelho", time: "09:45" },
    { id: 2, from: "ai", text: "Olá Marcos! Entendo, vamos verificar a disponibilidade. Você tem convênio?", time: "09:46" },
  ],
};

const leadDetailsData: Record<number, {
  name: string;
  phone: string;
  source: string;
  score: number;
  recommendations: string[];
  tags: string[];
  lastInteraction: string;
}> = {
  1: {
    name: "Julia Alves",
    phone: "+55 11 99999-9999",
    source: "WhatsApp",
    score: 88,
    recommendations: ["Ligar", "Reagendamento LCA"],
    tags: ["Cirurgia", "Convênio"],
    lastInteraction: "Hoje 10:33",
  },
  2: {
    name: "Marcos Lima",
    phone: "+55 11 98888-8888",
    source: "WhatsApp",
    score: 72,
    recommendations: ["Enviar informações", "Verificar convênio"],
    tags: ["Consulta", "Particular"],
    lastInteraction: "Hoje 09:46",
  },
};

export default function CRMInboxView() {
  const [selectedConversation, setSelectedConversation] = useState(1);

  const messages = messagesData[selectedConversation] || [];
  const leadDetails = leadDetailsData[selectedConversation] || leadDetailsData[1];

  return (
    <div className="flex-1 flex overflow-hidden bg-white">
      {/* Left Panel - Conversations List */}
      <div className="w-72 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Conversas ativas</h3>
          <p className="text-xs text-gray-500 mt-0.5">WhatsApp, Instagram e Google em uma única timeline</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedConversation === conv.id
                  ? "bg-blue-50 border-l-2 border-l-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm flex-shrink-0">
                  {conv.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium text-sm ${conv.unread ? "text-gray-900" : "text-gray-700"}`}>
                      {conv.name}
                    </span>
                    <span className="text-xs text-gray-400">{conv.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{conv.preview}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      conv.channel === "whatsapp" ? "bg-green-100 text-green-700" :
                      conv.channel === "instagram" ? "bg-pink-100 text-pink-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {conv.channel}
                    </span>
                    {conv.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center Panel - Chat */}
      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
              {leadDetails.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{leadDetails.name}</h4>
              <p className="text-xs text-gray-500">via {leadDetails.source}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">
              Ocultar conversa
            </button>
            <button className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">
              Ocultar detalhes
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "lead" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                  msg.from === "lead"
                    ? "bg-white border border-gray-200 text-gray-800"
                    : msg.from === "ai"
                    ? "bg-[#1a3a4a] text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${
                  msg.from === "lead" ? "text-gray-400" : "text-white/60"
                }`}>
                  {msg.time} {msg.from === "ai" && "• IA"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Digite uma mensagem..."
              className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
            <button className="px-4 py-2.5 bg-[#1a3a4a] text-white rounded-full text-sm font-medium" disabled>
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Lead Details */}
      <div className="w-72 border-l border-gray-200 bg-gray-50 overflow-y-auto">
        <div className="p-4 border-b border-gray-100 bg-white">
          <h3 className="font-semibold text-gray-900">Detalhes do lead</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
              Score IA
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${leadDetails.score}%` }}
                />
              </div>
              <span className="text-sm font-bold text-gray-900">{leadDetails.score}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
              Recomendações IA
            </p>
            <div className="space-y-2">
              {leadDetails.recommendations.map((rec) => (
                <div key={rec} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {rec}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
              Canal
            </p>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">{leadDetails.source}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
              Última interação
            </p>
            <p className="text-sm text-gray-700">{leadDetails.lastInteraction}</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {leadDetails.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
