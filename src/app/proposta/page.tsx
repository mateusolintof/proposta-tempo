import PropostaNav from "@/components/proposta/PropostaNav";
import PropostaPage from "@/components/proposta/PropostaPage";

export const metadata = {
  title: "Proposta Técnica — Tempo Energia",
  description:
    "Proposta comercial de agentes de IA para automação de vendas e atendimento da Tempo Energia.",
};

export default function Proposta() {
  return (
    <>
      <PropostaNav />
      <PropostaPage />
    </>
  );
}
