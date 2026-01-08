"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "solucoes", label: "Soluções" },
  { id: "investimento", label: "Investimento" },
  { id: "processo", label: "Processo" },
  { id: "faq", label: "FAQ" },
];

export default function PropostaNav() {
  const [activeSection, setActiveSection] = useState<string>("solucoes");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="proposta-nav sticky top-0 z-50 bg-[#02040A]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="/branding/logo-principal-white.svg"
              alt="Convert A.I"
              className="h-8 w-auto"
            />
          </a>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  activeSection === item.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-[#00E5FF]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Nav - Horizontal Scroll */}
          <div className="flex md:hidden overflow-x-auto scrollbar-hide gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-full transition-colors",
                  activeSection === item.id
                    ? "bg-[#00E5FF] text-[#02040A]"
                    : "text-white/50 hover:text-white/80"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
