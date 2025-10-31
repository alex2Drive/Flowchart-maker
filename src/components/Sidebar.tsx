import { AgentTemplate } from '../types';
import {
  Brain,
  MessageSquare,
  Wrench,
  GitBranch,
  Send,
  Code,
} from 'lucide-react';

const agentTemplates: AgentTemplate[] = [
  {
    type: 'input',
    label: 'Input Node',
    description: 'Receives user input or external data',
    icon: 'MessageSquare',
    color: 'bg-blue-500',
    defaultOutputs: [
      { id: 'output-1', name: 'data', type: 'any' }
    ],
  },
  {
    type: 'llm',
    label: 'LLM Agent',
    description: 'Language model processing node',
    icon: 'Brain',
    color: 'bg-purple-500',
    defaultConfig: { model: 'gpt-4', temperature: 0.7 },
    defaultInputs: [
      { id: 'input-1', name: 'prompt', type: 'string', required: true }
    ],
    defaultOutputs: [
      { id: 'output-1', name: 'response', type: 'string' }
    ],
    defaultFields: [
      {
        id: 'field-1',
        name: 'model',
        label: 'Model',
        type: 'select',
        value: 'gpt-4',
        options: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'claude-3', 'claude-2']
      },
      {
        id: 'field-2',
        name: 'temperature',
        label: 'Temperature',
        type: 'number',
        value: 0.7,
        placeholder: '0.0 - 1.0'
      },
      {
        id: 'field-3',
        name: 'max_tokens',
        label: 'Max Tokens',
        type: 'number',
        value: 1000,
        placeholder: 'Maximum tokens'
      },
    ],
  },
  {
    type: 'tool',
    label: 'Tool Agent',
    description: 'Executes external tools or APIs',
    icon: 'Wrench',
    color: 'bg-green-500',
    defaultInputs: [
      { id: 'input-1', name: 'parameters', type: 'object', required: true }
    ],
    defaultOutputs: [
      { id: 'output-1', name: 'result', type: 'any' }
    ],
  },
  {
    type: 'decision',
    label: 'Decision Node',
    description: 'Conditional branching logic',
    icon: 'GitBranch',
    color: 'bg-yellow-500',
    defaultInputs: [
      { id: 'input-1', name: 'condition', type: 'boolean', required: true }
    ],
    defaultOutputs: [
      { id: 'output-1', name: 'true', type: 'any' },
      { id: 'output-2', name: 'false', type: 'any' }
    ],
  },
  {
    type: 'function',
    label: 'Function Node',
    description: 'Custom code execution',
    icon: 'Code',
    color: 'bg-indigo-500',
    defaultInputs: [
      { id: 'input-1', name: 'input', type: 'any', required: true }
    ],
    defaultOutputs: [
      { id: 'output-1', name: 'output', type: 'any' }
    ],
  },
  {
    type: 'output',
    label: 'Output Node',
    description: 'Final output or response',
    icon: 'Send',
    color: 'bg-red-500',
    defaultInputs: [
      { id: 'input-1', name: 'data', type: 'any', required: true }
    ],
  },
];

const iconComponents: Record<string, any> = {
  Brain,
  MessageSquare,
  Wrench,
  GitBranch,
  Send,
  Code,
};

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, template: AgentTemplate) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(template));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">AI Agent Flowchart</h2>
        <p className="text-sm text-gray-400">Drag agents onto the canvas</p>
      </div>

      <div className="space-y-3">
        {agentTemplates.map((template) => {
          const Icon = iconComponents[template.icon];
          return (
            <div
              key={template.type}
              draggable
              onDragStart={(e) => onDragStart(e, template)}
              className="cursor-move p-4 rounded-lg bg-gray-800 border border-gray-700
                         hover:border-gray-600 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`${template.color} p-2 rounded-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white text-sm">
                  {template.label}
                </span>
              </div>
              <p className="text-xs text-gray-400 ml-11">
                {template.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-sm font-semibold text-white mb-2">Tips</h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Drag nodes to the canvas</li>
          <li>• Connect nodes by dragging from handles</li>
          <li>• Click a node to edit properties</li>
          <li>• Use Delete key to remove nodes</li>
        </ul>
      </div>
    </div>
  );
}
