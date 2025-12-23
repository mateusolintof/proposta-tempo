/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ModalKind } from "@/types/modal";

// 3D Background (dynamic import to avoid SSR issues)
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

// Modals (dynamic import for performance)
const AgentModal = dynamic(() => import("@/components/modals/AgentModal"), { ssr: false });
const CRMPreviewModal = dynamic(() => import("@/components/modals/CRMPreviewModal"), { ssr: false });
const DashboardPreviewModal = dynamic(() => import("@/components/modals/DashboardPreviewModal"), { ssr: false });
const ROICalculatorModal = dynamic(() => import("@/components/modals/ROICalculatorModal"), { ssr: false });
const CostReductionModal = dynamic(() => import("@/components/modals/CostReductionModal"), { ssr: false });
const GainsModal = dynamic(() => import("@/components/modals/GainsModal"), { ssr: false });
const IntelligenceModal = dynamic(() => import("@/components/modals/IntelligenceModal"), { ssr: false });

// Slides
import IntroSlide from "@/components/slides/IntroSlide";
import DiagnosticoSlide from "@/components/slides/DiagnosticoSlide";
import ObjetivoProjetoSlide from "@/components/slides/ObjetivoProjetoSlide";
import SolucaoSlide from "@/components/slides/SolucaoSlide";
import FerramentasSlide from "@/components/slides/FerramentasSlide";
import GanhosSlide from "@/components/slides/GanhosSlide";
import ViabilidadeSlide from "@/components/slides/ViabilidadeSlide";
import EntregaveisSlide from "@/components/slides/EntregaveisSlide";
import InvestimentoSlide from "@/components/slides/InvestimentoSlide";
import CronogramaSlide from "@/components/slides/CronogramaSlide";
import FAQSlide from "@/components/slides/FAQSlide";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const [activeSlide, setActiveSlide] = useState(0);
  const [modal, setModal] = useState<ModalKind>(null);
  const isModalOpen = modal !== null;

  const handleOpenModal = useCallback((newModal: ModalKind) => {
    setModal(newModal);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModal(null);
  }, []);

  const TOTAL_SLIDES = 11;

  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current) return;
    const slideWidth = containerRef.current.offsetWidth;
    const clampedIndex = Math.max(0, Math.min(TOTAL_SLIDES - 1, index));
    containerRef.current.scrollTo({
      left: slideWidth * clampedIndex,
      behavior: "smooth",
    });
  }, []);

  const slides = useMemo(
    () => [
      { id: "intro", label: "Início", element: <IntroSlide onEnter={() => scrollToIndex(1)} /> },
      { id: "diagnostico", label: "Diagnóstico", element: <DiagnosticoSlide /> },
      { id: "objetivo", label: "Objetivo", element: <ObjetivoProjetoSlide /> },
      {
        id: "solucao",
        label: "Solução",
        element: <SolucaoSlide onOpenModal={handleOpenModal} />,
      },
      {
        id: "ferramentas",
        label: "Ferramentas",
        element: <FerramentasSlide onOpenModal={handleOpenModal} />,
      },
      {
        id: "ganhos",
        label: "Ganhos",
        element: <GanhosSlide onOpenModal={handleOpenModal} />,
      },
      {
        id: "viabilidade",
        label: "Viabilidade",
        element: <ViabilidadeSlide onOpenModal={handleOpenModal} />,
      },
      { id: "entregaveis", label: "Entregáveis", element: <EntregaveisSlide /> },
      { id: "investimento", label: "Investimento", element: <InvestimentoSlide /> },
      { id: "faq", label: "FAQ", element: <FAQSlide /> },
      { id: "cronograma", label: "Cronograma", element: <CronogramaSlide /> },
    ],
    [handleOpenModal, scrollToIndex]
  );

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const slideWidth = containerRef.current.offsetWidth;
    const currentScrollLeft = containerRef.current.scrollLeft;
    const activeIndex = Math.max(
      0,
      Math.min(slides.length - 1, Math.round(currentScrollLeft / slideWidth))
    );
    setActiveSlide(activeIndex);
  }, [slides.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Mouse wheel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;

      const verticalScrollable = target?.closest(
        "[data-allow-vertical-scroll]"
      ) as HTMLElement | null;
      if (verticalScrollable) {
        const canScrollVertically =
          verticalScrollable.scrollHeight > verticalScrollable.clientHeight + 1;

        if (canScrollVertically) {
          const scrollingDown = event.deltaY > 0;
          const atTop = verticalScrollable.scrollTop <= 0;
          const atBottom =
            verticalScrollable.scrollTop + verticalScrollable.clientHeight >=
            verticalScrollable.scrollHeight - 1;

          const canScrollInDirection =
            (scrollingDown && !atBottom) || (!scrollingDown && !atTop);

          if (canScrollInDirection) return;
        }
      }

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (delta === 0) return;

      container.scrollLeft += delta;
      event.preventDefault();
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(activeSlide - 1);
      }
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        scrollToIndex(activeSlide + 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        scrollToIndex(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        scrollToIndex(slides.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSlide, scrollToIndex, slides.length]);

  return (
    <main className="h-screen w-screen bg-[#02040A] text-white relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        {!isModalOpen ? <Scene /> : null}
      </div>
      <div className="absolute inset-0 z-[1] bg-[#02040A]/32 pointer-events-none" />

      {/* Navigation - hidden on intro slide */}
      {activeSlide > 0 && (
        <div className="fixed bottom-8 left-0 right-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 backdrop-blur px-3 py-2 rounded-full pointer-events-auto max-w-[90vw] overflow-x-auto scrollbar-hide">
            <button
              type="button"
              onClick={() => scrollToIndex(activeSlide - 1)}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Slide anterior"
              disabled={activeSlide === 0}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    activeSlide === index
                      ? "bg-[#00FF94]"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Ir para ${slide.label}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                />
              ))}
            </div>

            <div className="text-xs uppercase tracking-[0.2em] text-white/60 hidden md:block whitespace-nowrap">
              {activeSlide + 1}/{slides.length} - {slides[activeSlide]?.label}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(activeSlide + 1)}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Próximo slide"
              disabled={activeSlide === slides.length - 1}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex flex-row h-full w-full overflow-x-scroll overflow-y-hidden snap-x snap-mandatory relative z-10 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="flex-shrink-0 w-screen h-full snap-center">
            {slide.element}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E5FF] to-[#00FF94] origin-left z-30"
        style={{ scaleX: scrollXProgress }}
      />

      {/* Agency branding - top right */}
      <div className="fixed top-6 right-6 z-30 pointer-events-none flex items-center gap-3">
        <img
          src="/branding/logo-badge-white.svg"
          alt="Convert A.I"
          className="h-5 w-auto opacity-60"
        />
      </div>

      {/* Modals */}
      {modal?.type === "agent" && (
        <AgentModal
          agent={modal.agent}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}
      {modal?.type === "crm" && (
        <CRMPreviewModal isOpen={true} onClose={handleCloseModal} />
      )}
      {modal?.type === "dashboard" && (
        <DashboardPreviewModal isOpen={true} onClose={handleCloseModal} />
      )}
      {modal?.type === "roi" && (
        <ROICalculatorModal isOpen={true} onClose={handleCloseModal} />
      )}
      {modal?.type === "costs" && (
        <CostReductionModal isOpen={true} onClose={handleCloseModal} />
      )}
      {modal?.type === "gains" && (
        <GainsModal isOpen={true} onClose={handleCloseModal} />
      )}
      {modal?.type === "intelligence" && (
        <IntelligenceModal isOpen={true} onClose={handleCloseModal} />
      )}
    </main>
  );
}
