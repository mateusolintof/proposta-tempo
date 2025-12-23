import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "CM Remédios — Agentes de IA para Atendimento Comercial",
  description:
    "Projeto CM Remédios com agentes de IA para atendimento comercial: qualificação de leads, FAQ inteligente, follow-up automático, CRM e painel executivo.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#02040A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground font-sans"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
