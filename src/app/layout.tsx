import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tempo Energia — Agentes de IA para Vendas",
  description:
    "Proposta comercial Tempo Energia: agentes de IA para qualificação de leads, follow-up automático, pós-vendas, CRM e dashboard executivo.",
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
