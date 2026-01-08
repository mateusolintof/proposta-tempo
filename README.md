# Tempo Energia — Proposta de Agentes IA

Apresentacao interativa horizontal para proposta comercial da Tempo Energia, com background 3D sutil, modais interativos e animacoes profissionais.

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
│   ├── proposta/
│   │   └── page.tsx        # Pagina SPA da proposta (scroll vertical)
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
│   │   ├── SolucaoSlide.tsx       # 3 agentes com arquitetura
│   │   ├── ComparativoSlide.tsx   # Comparativo IA vs Humano
│   │   ├── FerramentasSlide.tsx   # CRM e Dashboard
│   │   ├── GanhosSlide.tsx        # Resultados + Viabilidade (ROI)
│   │   ├── EntregaveisSlide.tsx   # Setup e suporte
│   │   ├── InvestimentoSlide.tsx  # Precos e pacotes
│   │   ├── FAQSlide.tsx           # Perguntas frequentes
│   │   └── CronogramaSlide.tsx    # 4 fases de implementacao
│   ├── proposta/
│   │   ├── PropostaNav.tsx        # Navegacao sticky da proposta
│   │   ├── PropostaPage.tsx       # Pagina principal da proposta
│   │   ├── SectionWrapper.tsx     # Wrapper de secoes
│   │   └── sections/
│   │       ├── SolucoesSection.tsx      # 3 agentes detalhados
│   │       ├── InvestimentoSection.tsx  # Pacotes e precos
│   │       ├── ProcessoSection.tsx      # Cronograma 4 fases
│   │       └── FAQSection.tsx           # 6 perguntas frequentes
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
│   ├── logo-principal-white.svg
│   ├── logo.svg
│   └── ...
├── images/
│   ├── ia-conversation.png        # Imagem comparativo IA
│   └── human-conversation.png     # Imagem comparativo Humano
└── docs/
    └── arquitetura.md             # Documento de negocio detalhado
```

## Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| Background | `#02040A` | Fundo principal |
| Tech Cyan | `#00E5FF` | Destaques tecnologicos |
| Success Green | `#00FF94` | Metricas positivas, CTAs |
| Gold | `#FFD700` | Alertas, destaques |
| White | `#FFFFFF` / `rgba` | Textos e bordas |

## Rotas

| Rota | Descricao |
|------|-----------|
| `/` | Apresentacao horizontal (11 slides) |
| `/proposta` | Proposta tecnica SPA (scroll vertical) |

## Slides (11 secoes)

| # | Slide | Descricao | Modais |
|---|-------|-----------|--------|
| 1 | Intro | Logo, titulo hero, tagline | - |
| 2 | Diagnostico | Metricas de cobertura e pain points | - |
| 3 | Desafio | 50-70% abandono, impacto na reputacao | - |
| 4 | Impacto | Custo da inacao, oportunidades perdidas | - |
| 5 | Solucao | 3 agentes IA com arquitetura | AgentModal (3 tipos) |
| 6 | Comparativo | IA vs Atendimento Humano | - |
| 7 | Ferramentas | CRM, Dashboard, historico | CRMPreviewModal, DashboardPreviewModal |
| 8 | Ganhos + Viabilidade | ROI +300%, payback 3-4 meses | ROICalculatorModal, CostReductionModal |
| 9 | Entregaveis | Setup + treinamento + suporte | - |
| 10 | Investimento | Pacotes individuais e Ecossistema Full | - |
| 11 | Cronograma | 4 fases ate Go-Live | - |

## Agentes IA (3 tipos)

| Agente | Nome Completo | Funcao |
|--------|---------------|--------|
| SDR | SDR & Qualificacao | Qualificacao, leitura de faturas (OCR), handoff para vendas |
| Follow-up | Follow-up Automatico | Cadencia multicanal e recuperacao de oportunidades |
| NPS | Pos-vendas & NPS | Pesquisa NPS, reativacao e expansao da carteira |

## Pagina /proposta

Proposta tecnica em formato SPA com scroll vertical:

- **Header:** Titulo, cliente, versao
- **Navegacao:** Sticky nav com scroll spy
- **Secoes:**
  - Solucoes (3 agentes detalhados)
  - Investimento (pacotes individuais + Ecossistema Full)
  - Processo (cronograma 4 fases)
  - FAQ (6 perguntas frequentes)
- **Footer:** CTA e assinatura Convert A.I

## Investimento

### Pacotes Individuais

| Agente | Setup | Mensal |
|--------|-------|--------|
| SDR & Qualificacao | R$ 15.000 | R$ 2.000/mes |
| Follow-up Automatico | R$ 5.000 | R$ 1.000/mes |
| Pos-vendas & NPS | R$ 5.000 | R$ 1.000/mes |

### Ecossistema Full

| Item | Valor |
|------|-------|
| Setup | ~~R$ 25.000~~ **R$ 0** |
| Mensal | R$ 4.000/mes |
| Economia | 100% OFF no setup |

Inclui: 3 agentes + CRM + Dashboard + integrações + suporte continuo

## Navegacao

- **Scroll horizontal** com CSS snap (pagina principal)
- **Scroll vertical** com smooth scroll (pagina /proposta)
- **Setas** `←` `→` e **Space** para navegar
- **Home** / **End** para inicio/fim
- **Mouse wheel** convertido para scroll horizontal
- **Dots** clicaveis na barra inferior

## Background 3D

O background usa React Three Fiber com:
- 150 particulas brancas conectadas
- Movimento organico baseado em noise
- Post-processing: Bloom + Vignette
- Opacity 30% para sutileza
- Dynamic import para evitar SSR
