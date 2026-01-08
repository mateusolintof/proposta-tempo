"use client";

import SolucoesSection from "./sections/SolucoesSection";
import InvestimentoSection from "./sections/InvestimentoSection";
import FAQSection from "./sections/FAQSection";
import ProcessoSection from "./sections/ProcessoSection";

export default function PropostaPage() {
  return (
    <div className="min-h-screen bg-[#02040A] text-white scroll-smooth">
      {/* Hero Header */}
      <header className="pt-16 pb-12 px-6 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#00E5FF] text-sm uppercase tracking-[0.2em] mb-4">
            Proposta Técnica
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tempo Energia
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Agentes de IA especializados para transformar a operação comercial:
            qualificação instantânea, follow-up automático e pós-vendas inteligente.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 uppercase">Cliente</p>
              <p className="text-sm font-medium text-white">Tempo Energia</p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 uppercase">Preparado por</p>
              <p className="text-sm font-medium text-white">Convert A.I</p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 uppercase">Versão</p>
              <p className="text-sm font-medium text-white">Janeiro 2025</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6">
        <SolucoesSection />
        <InvestimentoSection />
        <ProcessoSection />
        <FAQSection />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 mt-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/40 text-sm mb-4">
            Próximo passo: Agendar reunião para alinhamento e kick-off
          </p>
          <img
            src="/branding/logo-principal-white.svg"
            alt="Convert A.I"
            className="h-10 w-auto mx-auto opacity-50"
          />
          <p className="text-white/30 text-xs mt-4">
            Convert A.I - Arquitetura de Agentes de IA
          </p>
        </div>
      </footer>
    </div>
  );
}
