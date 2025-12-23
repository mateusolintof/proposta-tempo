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
  children: ReactNode;
}

export default function ModalWrapper({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: ModalWrapperProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onOpenChange={(open) => !open && onClose()}
          size="full"
          scrollBehavior="inside"
          backdrop="blur"
          hideCloseButton
          classNames={{
            base: "bg-[#02040A] border-none backdrop-blur-xl h-screen max-h-screen rounded-none",
            wrapper: "overflow-hidden",
            header: "border-b border-white/10 pb-4 px-5 sm:px-6 md:px-8 pt-6",
            body: "py-6 px-5 sm:px-6 md:px-8 overflow-y-auto",
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
          <ModalContent className="h-full flex flex-col">
            <ModalHeader className="flex items-start justify-between gap-4 flex-shrink-0">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-white/60 mt-2 text-base md:text-lg">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                aria-label="Fechar"
              >
                <X className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
              </button>
            </ModalHeader>
            <ModalBody className="flex-1 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="h-full"
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
