"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, X, ZoomIn } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const iaImages: ImageData[] = [
  { src: "/comparativo/atendimentoIA1.png", alt: "Atendimento IA - Parte 1", width: 1940, height: 1318 },
  { src: "/comparativo/atendimentoIA2.png", alt: "Atendimento IA - Parte 2", width: 1940, height: 1408 },
];

const humanImages: ImageData[] = [
  { src: "/comparativo/atendimentohumano1.png", alt: "Atendimento Humano - Parte 1", width: 1940, height: 1118 },
  { src: "/comparativo/atendimentohumano2.png", alt: "Atendimento Humano - Parte 2", width: 1940, height: 1300 },
];

export default function ComparativoSlide() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  return (
    <>
      <SlideShell
        eyebrow="Comparativo"
        eyebrowColor="success"
        title="Atendimento IA vs Humano"
        subtitle="Clique nas imagens para ampliar"
        align="center"
        size="compact"
      >
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {/* IA Images */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2 justify-center">
                <div className="p-1.5 md:p-2 rounded-lg bg-[#00FF94]/20">
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-[#00FF94]" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-white">
                  Atendimento por IA
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {iaImages.map((image, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    className="relative rounded-lg md:rounded-xl overflow-hidden border border-[#00FF94]/30 bg-white/5 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={300}
                      className="w-full h-auto"
                      loading="lazy"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 md:w-8 md:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Human Images */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2 justify-center">
                <div className="p-1.5 md:p-2 rounded-lg bg-[#FF6B6B]/20">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-[#FF6B6B]" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-white">
                  Atendimento Humano
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {humanImages.map((image, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    className="relative rounded-lg md:rounded-xl overflow-hidden border border-[#FF6B6B]/30 bg-white/5 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={300}
                      className="w-full h-auto"
                      loading="lazy"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 md:w-8 md:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SlideShell>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              type="button"
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.button>

            <motion.div
              className="relative max-w-[95vw] max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                quality={90}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
