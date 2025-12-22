"use client";

import { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  size?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
  children: ReactNode;
}

export default function ModalWrapper({
  isOpen,
  onClose,
  title,
  subtitle,
  size = "5xl",
  children,
}: ModalWrapperProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onOpenChange={(open) => !open && onClose()}
          size={size}
          scrollBehavior="inside"
          backdrop="blur"
          hideCloseButton
          classNames={{
            base: "bg-[#0a0f1a]/95 border border-white/10 backdrop-blur-xl max-h-[90vh]",
            header: "border-b border-white/10 pb-4",
            body: "py-6",
          }}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: 20,
                opacity: 0,
                scale: 0.95,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            <ModalHeader className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-white/60 mt-1 text-sm md:text-base">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </ModalHeader>
            <ModalBody>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {children}
              </motion.div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
}
