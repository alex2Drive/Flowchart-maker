export type AgentType =
  | 'input'
  | 'llm'
  | 'tool'
  | 'decision'
  | 'output'
  | 'function';

export interface InputPort {
  id: string;
  name: string;
  type?: string;
  required?: boolean;
}

export interface OutputPort {
  id: string;
  name: string;
  type?: string;
}

export type CustomFieldType = 'text' | 'number' | 'boolean' | 'textarea' | 'select';

export interface CustomField {
  id: string;
  name: string;
  label: string;
  type: CustomFieldType;
  value: any;
  placeholder?: string;
  options?: string[]; // For select type
}

export interface AgentNodeData {
  label: string;
  type: AgentType;
  description?: string;
  instruction?: string;
  inputs?: InputPort[];
  outputs?: OutputPort[];
  fields?: CustomField[];
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
  defaultInputs?: InputPort[];
  defaultOutputs?: OutputPort[];
  defaultFields?: CustomField[];
}
