# CM Remédios — Guia do Projeto

## Visão Geral

Apresentação horizontal interativa para proposta comercial da CM Remédios, focada em Agentes de IA para Atendimento Comercial.

**Cliente:** CM Remédios
**Documento de negócio:** `public/docs/arquitetura.md`

## Stack

- Next.js 16 (App Router) + React 19.2
- Tailwind CSS v4 (`@theme inline`)
- Framer Motion (animações de slides)
- React Three Fiber + postprocessing (background 3D)
- Lucide (ícones)
- HeroUI (componentes base)

## Execução

```bash
npm install
npm run dev     # http://localhost:3001
npm run build
npm start
```

## Arquitetura

### Componentes Principais

| Arquivo | Descrição |
|---------|-----------|
| `src/app/page.tsx` | Container principal com scroll horizontal |
| `src/components/3d/Scene.tsx` | Background 3D com partículas |
| `src/components/3d/ElegantNetwork.tsx` | Rede de partículas animadas |
| `src/components/ui/SlideShell.tsx` | Wrapper padrão para slides |

### Slides

```
src/components/slides/
├── IntroSlide.tsx       # Hero com logo e título
├── DiagnosticoSlide.tsx # Métricas de cobertura
├── DesafioSlide.tsx     # Abandono e impacto
├── SolucaoSlide.tsx     # 4 agentes com órbita CSS
├── FerramentasSlide.tsx # CRM e Dashboard
├── GanhosSlide.tsx      # -60% no-show, +40% conversão
├── EntregaveisSlide.tsx # Setup e suporte
├── InvestimentoSlide.tsx # R$25k + R$2.5k/mês
└── CronogramaSlide.tsx  # 4 fases
```

## Tema e Cores

```css
--background: #02040A      /* Fundo escuro */
--accent-tech: #00E5FF     /* Cyan tecnológico */
--accent-success: #00FF94  /* Verde sucesso */
```

## SlideShell Props

```tsx
interface SlideShellProps {
  eyebrow?: string;        // Label superior (ex: "Solução")
  eyebrowColor?: "default" | "success" | "warning" | "danger";
  title: string;           // Título principal
  subtitle?: string;       // Subtítulo
  align?: "left" | "center";
  size?: "default" | "compact";
  background?: ReactNode;  // Background customizado
  children?: ReactNode;    // Conteúdo do slide
}
```

## Background 3D

- Importado dinamicamente (`ssr: false`)
- Opacity 30% + pointer-events-none
- Z-index 0 (abaixo do conteúdo)
- Overlay escuro adicional para legibilidade

## Navegação

- Scroll horizontal com CSS snap
- Keyboard: `←` `→` `Space` `Home` `End`
- Mouse wheel convertido para horizontal
- Dots clicáveis no topo
- Progress bar no rodapé

## Conteúdo de Negócio

O documento `public/docs/arquitetura.md` contém:

1. **Diagnóstico:** 6 gargalos identificados
2. **Soluções:** 4 agentes (SDR, FAQ, Anti No-Show, NPS)
3. **Ferramentas:** CRM + Dashboard
4. **Métricas:** KPIs esperados
5. **Cronograma:** 4 fases de implementação
6. **Investimento:** Setup R$25k + R$2.5k/mês

## Checklist

- [x] Slides criados (9/9)
- [x] Background 3D integrado
- [x] Navegação funcionando
- [x] Animações Framer Motion
- [x] Responsivo mobile/desktop
- [x] Órbita CSS no slide Solução
- [x] Paleta de cores aplicada
