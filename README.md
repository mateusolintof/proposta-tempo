# CM Remédios — Proposta de Agentes IA

Apresentação interativa horizontal para proposta comercial da CM Remédios, com background 3D sutil e animações profissionais.

## Stack

- **Next.js 16** (App Router) + **React 19.2**
- **Tailwind CSS v4** com `@theme inline`
- **Framer Motion** para animações
- **React Three Fiber** + **@react-three/postprocessing** para background 3D
- **Lucide** para ícones
- **HeroUI** para componentes base

## Execução

```bash
# Requisitos: Node >= 20.9.0
npm install
npm run dev     # http://localhost:3001
npm run build   # Build de produção
npm start       # Servir produção
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx       # Fontes, metadata, providers
│   ├── page.tsx         # Apresentação horizontal principal
│   ├── providers.tsx    # HeroUI providers
│   ├── globals.css      # Tokens de tema e utilitários
│   └── favicon.ico
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx           # Canvas R3F com post-processing
│   │   └── ElegantNetwork.tsx  # Partículas conectadas animadas
│   ├── slides/
│   │   ├── IntroSlide.tsx
│   │   ├── DiagnosticoSlide.tsx
│   │   ├── DesafioSlide.tsx
│   │   ├── SolucaoSlide.tsx
│   │   ├── FerramentasSlide.tsx
│   │   ├── GanhosSlide.tsx
│   │   ├── EntregaveisSlide.tsx
│   │   ├── InvestimentoSlide.tsx
│   │   └── CronogramaSlide.tsx
│   └── ui/
│       ├── SlideShell.tsx      # Wrapper padrão para slides
│       ├── card.tsx
│       └── chart.tsx
└── lib/
    └── utils.ts

public/
├── branding/
│   ├── cmremedios-logo.png
│   ├── logo.svg
│   └── logo-placeholder.svg
├── docs/
│   └── arquitetura.md          # Documento de negócio detalhado
└── prints/                      # Screenshots de avaliações
```

## Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| Background | `#02040A` | Fundo principal |
| Tech Cyan | `#00E5FF` | Destaques tecnológicos |
| Success Green | `#00FF94` | Métricas positivas, CTAs |
| White | `#FFFFFF` / `rgba` | Textos e bordas |

## Slides (9 seções)

1. **Intro** — Logo, título hero, tagline
2. **Diagnóstico** — Métricas de cobertura e pain points
3. **Desafio** — 50-70% abandono, impacto na reputação
4. **Solução** — 4 agentes IA com órbita animada CSS
5. **Ferramentas** — CRM, Dashboard, histórico
6. **Ganhos** — -60% no-show, +40% conversão
7. **Entregáveis** — Setup + treinamento + suporte
8. **Investimento** — R$25k setup + R$2.5k/mês
9. **Cronograma** — 4 fases até Go-Live

## Navegação

- **Scroll horizontal** com snap
- **Setas** `←` `→` e **Space** para navegar
- **Home** / **End** para início/fim
- **Mouse wheel** convertido para scroll horizontal
- **Dots** clicáveis no topo
- **Barra de progresso** no rodapé

## Background 3D

O background usa React Three Fiber com:
- 150 partículas brancas conectadas
- Movimento orgânico baseado em noise
- Post-processing: Bloom + Vignette
- Opacity 30% para sutileza
- Dynamic import para evitar SSR

## Documento de Negócio

Ver `public/docs/arquitetura.md` para:
- Análise de gargalos (6 problemas identificados)
- Detalhamento das 4 soluções
- Fluxos operacionais
- Métricas e KPIs esperados
- Plano de implementação
- Breakdown de investimento
