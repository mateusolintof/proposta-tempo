# CM Remedios — Proposta de Agentes IA

Apresentacao interativa horizontal para proposta comercial da CM Remedios, com background 3D sutil, modais interativos e animacoes profissionais.

## Stack

| Tecnologia | Versao | Uso |
|------------|--------|-----|
| Next.js | 16.1.1 | App Router com Webpack (Turbopack opcional) |
| React | 19.2.3 | UI Library |
| Tailwind CSS | v4 | Estilizacao com `@theme inline` |
| Framer Motion | 12.x | Animacoes de slides e modais |
| React Three Fiber | 9.x | Background 3D |
| HeroUI | 2.8.7 | Componentes base |
| Recharts | 3.6.0 | Graficos nos modais |
| XYFlow React | 12.10 | Diagramas de fluxo dos agentes |
| Lucide | 0.562 | Icones |

## Execucao

```bash
# Requisitos: Node >= 20.9.0
npm install
npm run dev             # dev with webpack on http://localhost:3001
npm run dev:turbo       # dev with Turbopack (optional)
npm run build           # production build (webpack)
npm run build:turbo     # production build with Turbopack
npm start -p 3001       # serve prod build on 3001
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Fontes, metadata, providers
│   ├── page.tsx            # Container principal com scroll horizontal
│   ├── providers.tsx       # HeroUI providers
│   ├── globals.css         # Tokens de tema e utilitarios
│   └── favicon.ico
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx              # Canvas R3F com post-processing
│   │   └── ElegantNetwork.tsx     # Particulas conectadas animadas
│   ├── slides/
│   │   ├── IntroSlide.tsx         # Hero com logo e titulo
│   │   ├── DiagnosticoSlide.tsx   # Metricas de cobertura
│   │   ├── DesafioSlide.tsx       # Abandono e impacto
│   │   ├── ImpactoSlide.tsx       # Custo da inacao
│   │   ├── SolucaoSlide.tsx       # 4 agentes com arquitetura
│   │   ├── FerramentasSlide.tsx   # CRM e Dashboard
│   │   ├── GanhosSlide.tsx        # Resultados esperados
│   │   ├── ViabilidadeSlide.tsx   # ROI e economia
│   │   ├── EntregaveisSlide.tsx   # Setup e suporte
│   │   ├── InvestimentoSlide.tsx  # Precos e pacotes
│   │   ├── FAQSlide.tsx           # Perguntas frequentes
│   │   └── CronogramaSlide.tsx    # 4 fases de implementacao
│   ├── modals/
│   │   ├── ModalWrapper.tsx       # Wrapper base para modais
│   │   ├── AgentModal.tsx         # Detalhes dos agentes IA
│   │   ├── CRMPreviewModal.tsx    # Preview interativo do CRM
│   │   ├── DashboardPreviewModal.tsx  # Preview do Dashboard
│   │   ├── ROICalculatorModal.tsx # Calculadora de ROI
│   │   ├── CostReductionModal.tsx # Simulador de economia
│   │   ├── GainsModal.tsx         # Ganhos operacionais
│   │   ├── IntelligenceModal.tsx  # Inteligencia de dados
│   │   ├── agents/
│   │   │   ├── RadialCapabilityDiagram.tsx  # Diagrama radial de capacidades
│   │   │   └── AgentFlowDiagram.tsx         # Fluxograma interativo
│   │   ├── crm/
│   │   │   ├── CRMDashboardView.tsx   # Visao geral CRM
│   │   │   ├── CRMContactsView.tsx    # Lista de contatos
│   │   │   ├── CRMPipelineView.tsx    # Pipeline de vendas
│   │   │   └── CRMInboxView.tsx       # Caixa de mensagens
│   │   └── dashboard/
│   │       ├── DashVisaoGeralView.tsx # Visao geral
│   │       ├── DashGestaoIAView.tsx   # Gestao de IA
│   │       ├── DashClientesView.tsx   # Clientes
│   │       └── DashInsightsView.tsx   # Insights
│   └── ui/
│       ├── SlideShell.tsx         # Wrapper padrao para slides
│       ├── card.tsx               # Card component
│       └── chart.tsx              # Chart components (Recharts)
├── types/
│   └── modal.ts                   # Tipos TypeScript para modais
└── lib/
    └── utils.ts                   # Utilitarios (cn, etc)

public/
├── branding/
│   ├── cmremedios-logo.png
│   ├── logo.svg
│   ├── logo-badge-white.svg
│   └── logo-placeholder.svg
└── docs/
    └── arquitetura.md             # Documento de negocio detalhado
```

## Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| Background | `#02040A` | Fundo principal |
| Tech Cyan | `#00E5FF` | Destaques tecnologicos |
| Success Green | `#00FF94` | Metricas positivas, CTAs |
| White | `#FFFFFF` / `rgba` | Textos e bordas |

## Slides (12 secoes)

| # | Slide | Descricao | Modais |
|---|-------|-----------|--------|
| 1 | Intro | Logo, titulo hero, tagline | - |
| 2 | Diagnostico | Metricas de cobertura e pain points | - |
| 3 | Desafio | 50-70% abandono, impacto na reputacao | - |
| 4 | Impacto | Custo da inacao, oportunidades perdidas | - |
| 5 | Solucao | 4 agentes IA com arquitetura | AgentModal (4 tipos) |
| 6 | Ferramentas | CRM, Dashboard, historico | CRMPreviewModal, DashboardPreviewModal |
| 7 | Ganhos | -60% abandono, +40% conversao | GainsModal, IntelligenceModal |
| 8 | Viabilidade | ROI projetado, payback | ROICalculatorModal, CostReductionModal |
| 9 | Entregaveis | Setup + treinamento + suporte | - |
| 10 | Investimento | R$25k setup + R$2.5k/mes | - |
| 11 | FAQ | Perguntas frequentes (accordion) | - |
| 12 | Cronograma | 4 fases ate Go-Live | - |

## Sistema de Modais

### Tipos de Modal

```typescript
type ModalKind =
  | { type: "agent"; agent: "sdr" | "faq" | "noshow" | "nps" }
  | { type: "crm" }
  | { type: "dashboard" }
  | { type: "roi" }
  | { type: "costs" }
  | { type: "gains" }
  | { type: "intelligence" }
  | null;
```

### Agentes IA (4 tipos)

| Agente | Nome Completo | Funcao |
|--------|---------------|--------|
| SDR | SDR & Qualificacao | Qualificacao e conversao 24/7 |
| FAQ | FAQ Inteligente | Respostas automaticas a duvidas |
| NoShow | Follow-up Automatico | Cadencia e recuperacao de conversoes |
| NPS | Pesquisa & NPS | Coleta de feedback pos-compra |

Cada agente possui:
- Diagrama radial de capacidades (RadialCapabilityDiagram)
- Fluxograma interativo (AgentFlowDiagram com XYFlow)
- Metricas e beneficios especificos

### CRM Preview

Navegacao por abas:
- Dashboard (visao geral)
- Contatos (lista de leads)
- Pipeline (funil de vendas)
- Inbox (mensagens)

### Dashboard Preview

Navegacao por abas:
- Visao Geral (KPIs principais)
- Gestao IA (metricas dos agentes)
- Clientes (base de clientes)
- Insights (recomendacoes)

## Navegacao

- **Scroll horizontal** com CSS snap
- **Setas** `←` `→` e **Space** para navegar
- **Home** / **End** para inicio/fim
- **Mouse wheel** convertido para scroll horizontal
- **Dots** clicaveis na barra inferior
- **Barra de progresso** animada no rodape

## Background 3D

O background usa React Three Fiber com:
- 150 particulas brancas conectadas
- Movimento organico baseado em noise
- Post-processing: Bloom + Vignette
- Opacity 30% para sutileza
- Dynamic import para evitar SSR

## Documento de Negocio

Ver `public/docs/arquitetura.md` para:
- Analise de gargalos (6 problemas identificados)
- Detalhamento das 4 solucoes
- Fluxos operacionais
- Metricas e KPIs esperados
- Plano de implementacao
- Breakdown de investimento
