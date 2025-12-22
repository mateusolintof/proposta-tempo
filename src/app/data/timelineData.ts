// Timeline data extracted from CM Remedios proposal (page.tsx)

export interface TimelinePoint {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  keyPoints: string[];
  metrics?: { label: string; value: string }[];
  color: string;
  icon: string;
}

export const TIMELINE_DATA: TimelinePoint[] = [
  {
    id: 1,
    slug: 'diagnostico',
    title: 'Diagnóstico Operacional',
    subtitle: 'Principais pontos de fricção identificados',
    keyPoints: [
      'Atendimento online sobrecarregado e ineficiente',
      '61% do tempo sem cobertura humana (101h/semana)',
      'Taxa de no-show e remarcação sem conferência adequada',
    ],
    metrics: [
      { label: 'Sem cobertura', value: '61%' },
      { label: 'Leads perdidos/mês', value: '~500' },
    ],
    color: '#e74c3c',
    icon: '🔍',
  },
  {
    id: 2,
    slug: 'desafio',
    title: 'Desafio Atual',
    subtitle: 'Alto volume de leads sem atendimento adequado',
    keyPoints: [
      'Muita insatisfação e reclamações sobre atendimento',
      '50-70% dos contatos fora do horário não dão continuidade',
      'Reputação comprometida no Google e Reclame Aqui',
    ],
    metrics: [
      { label: 'Abandono', value: '50-70%' },
    ],
    color: '#e67e22',
    icon: '⚠️',
  },
  {
    id: 3,
    slug: 'impacto',
    title: 'O Impacto Real',
    subtitle: 'O custo da inação',
    keyPoints: [
      'Janela sem atendimento: leads esfriam',
      'Conversas sem follow-up: timing perdido',
      'Falta de visibilidade: gestão às cegas',
    ],
    metrics: [
      { label: 'Oportunidades perdidas', value: 'R$ milhares' },
    ],
    color: '#c0392b',
    icon: '📉',
  },
  {
    id: 4,
    slug: 'solucoes',
    title: 'Arquitetura da Solução',
    subtitle: '4 Agentes Especializados + Ecossistema de Gestão',
    keyPoints: [
      '1. SDR & Agendamento: Qualificação e integração ERP',
      '2. FAQ Inteligente: Base de conhecimento 24/7',
      '3. Anti No-Show: Confirmações e fila de espera',
      '4. Pesquisa & Satisfação: NPS e Google Reviews',
    ],
    metrics: [
      { label: 'Agentes IA', value: '4' },
      { label: 'Disponibilidade', value: '24/7' },
    ],
    color: '#c9a227',
    icon: '🤖',
  },
  {
    id: 5,
    slug: 'ferramentas',
    title: 'Ferramentas de Controle',
    subtitle: 'CRM + Dashboard Executivo',
    keyPoints: [
      'CRM: Visualização do funil de vendas',
      'Dashboard: KPIs em tempo real',
      'Histórico completo de conversas',
      'Filtros por canal, equipe e período',
    ],
    metrics: [
      { label: 'Conversão', value: '+40%' },
      { label: 'Resposta', value: 'Imediata' },
    ],
    color: '#3498db',
    icon: '📊',
  },
  {
    id: 6,
    slug: 'ganhos',
    title: 'Ganhos Esperados',
    subtitle: 'Impacto direto nos indicadores',
    keyPoints: [
      'Tempo de resposta otimizado por canal',
      'Qualificação e taxa de agendamento elevadas',
      'No-show reduzido com gestão ativa',
      'Receita e previsibilidade aumentadas',
    ],
    metrics: [
      { label: 'No-show', value: '-60%' },
      { label: 'Conversão', value: '+40%' },
    ],
    color: '#27ae60',
    icon: '📈',
  },
  {
    id: 7,
    slug: 'entregaveis',
    title: 'O Que Será Entregue',
    subtitle: 'Setup Tecnológico + Serviços',
    keyPoints: [
      'Configuração dos 4 agentes com base de conhecimento',
      'Integração ERP (Tasy) completa',
      'CRM e Dashboard configurados',
      'Treinamento + 30 dias de acompanhamento',
    ],
    metrics: [
      { label: 'Treinamento', value: '4h' },
      { label: 'Suporte', value: '30 dias' },
    ],
    color: '#9b59b6',
    icon: '📦',
  },
  {
    id: 8,
    slug: 'investimento',
    title: 'Investimento',
    subtitle: 'Ecossistema Full com desconto',
    keyPoints: [
      'Setup: R$ 25.000 (de R$ 40.000)',
      'Mensalidade: R$ 2.500/mês (economia de R$ 1.500)',
      'Inclui todos os módulos + integrações',
      'Pagamento flexível: PIX, boleto ou cartão',
    ],
    metrics: [
      { label: 'Desconto setup', value: '37%' },
      { label: 'Economia/mês', value: 'R$ 1.500' },
    ],
    color: '#c9a227',
    icon: '💰',
  },
  {
    id: 9,
    slug: 'cronograma',
    title: 'Cronograma de Execução',
    subtitle: '4 fases até o Go-Live',
    keyPoints: [
      'Fase 1: Kick-off e alinhamento',
      'Fase 2: Desenvolvimento dos fluxos',
      'Fase 3: Validação com a equipe',
      'Fase 4: Go-Live oficial',
    ],
    metrics: [
      { label: 'Fases', value: '4' },
    ],
    color: '#1abc9c',
    icon: '🚀',
  },
];

export const INTRO_DATA = {
  client: 'CM Remédios',
  title: 'Agentes Inteligentes',
  subtitle: 'Gestão Unificada',
  tagline: 'Proposta de Transformação Digital',
  date: 'Outubro 2025',
};
