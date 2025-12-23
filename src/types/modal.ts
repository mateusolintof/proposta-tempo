export type AgentType = "sdr" | "noshow" | "nps";

export type ModalKind =
  | { type: "agent"; agent: AgentType }
  | { type: "crm" }
  | { type: "dashboard" }
  | { type: "roi" }
  | { type: "costs" }
  | { type: "gains" }
  | { type: "intelligence" }
  | null;

export interface AgentData {
  id: AgentType;
  name: string;
  fullName: string;
  description: string;
  benefits: string[];
  metrics: { label: string; value: string }[];
  flowNodes: FlowNodeData[];
  flowEdges: FlowEdgeData[];
}

export interface FlowNodeData {
  id: string;
  label: string;
  type?: "input" | "output" | "default";
  position: { x: number; y: number };
  style?: React.CSSProperties;
}

export interface FlowEdgeData {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  label?: string;
}
