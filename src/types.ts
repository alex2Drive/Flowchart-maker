export type AgentType =
  | 'input'
  | 'llm'
  | 'tool'
  | 'decision'
  | 'output'
  | 'function';

export interface AgentNodeData {
  label: string;
  type: AgentType;
  description?: string;
  config?: Record<string, any>;
  icon?: string;
}

export interface AgentTemplate {
  type: AgentType;
  label: string;
  description: string;
  icon: string;
  color: string;
  defaultConfig?: Record<string, any>;
}
