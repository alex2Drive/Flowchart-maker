import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { AgentNodeData } from '../types';
import {
  Brain,
  MessageSquare,
  Wrench,
  GitBranch,
  Send,
  Code,
  Zap
} from 'lucide-react';

const iconMap: Record<string, any> = {
  input: MessageSquare,
  llm: Brain,
  tool: Wrench,
  decision: GitBranch,
  output: Send,
  function: Code,
};

const colorMap: Record<string, string> = {
  input: 'bg-blue-500',
  llm: 'bg-purple-500',
  tool: 'bg-green-500',
  decision: 'bg-yellow-500',
  output: 'bg-red-500',
  function: 'bg-indigo-500',
};

function AgentNode({ data, selected }: NodeProps<AgentNodeData>) {
  const Icon = iconMap[data.type] || Zap;
  const colorClass = colorMap[data.type] || 'bg-gray-500';

  return (
    <div
      className={`
        relative px-4 py-3 rounded-lg shadow-lg border-2 transition-all
        bg-gray-800 min-w-[180px]
        ${selected ? 'border-blue-400 shadow-blue-400/50' : 'border-gray-600'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-400 !border-2 !border-gray-600"
      />

      <div className="flex items-center gap-3">
        <div className={`${colorClass} p-2 rounded-md`}>
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1">
          <div className="font-semibold text-white text-sm">
            {data.label}
          </div>
          {data.description && (
            <div className="text-xs text-gray-400 mt-1">
              {data.description}
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400 !border-2 !border-gray-600"
      />
    </div>
  );
}

export default memo(AgentNode);
