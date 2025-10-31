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
  Zap,
  ArrowDown,
  ArrowUp,
  FileText
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

  const inputs = data.inputs || [];
  const outputs = data.outputs || [];
  const fields = data.fields || [];
  const hasInstruction = data.instruction && data.instruction.trim().length > 0;

  return (
    <div
      className={`
        relative px-4 py-3 rounded-lg shadow-lg border-2 transition-all
        bg-gray-800 min-w-[220px] max-w-[300px]
        ${selected ? 'border-blue-400 shadow-blue-400/50' : 'border-gray-600'}
      `}
    >
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Top}
          id={input.id}
          style={{
            left: `${((index + 1) * 100) / (inputs.length + 1)}%`,
          }}
          className="!bg-blue-400 !border-2 !border-blue-600 !w-3 !h-3"
          title={`${input.name}${input.required ? ' (required)' : ''}`}
        />
      ))}

      <div className="flex items-center gap-3 mb-2">
        <div className={`${colorClass} p-2 rounded-md`}>
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white text-sm truncate">
            {data.label}
          </div>
          {data.description && (
            <div className="text-xs text-gray-400 mt-1 line-clamp-2">
              {data.description}
            </div>
          )}
        </div>
      </div>

      {/* Custom Fields */}
      {fields.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
          {fields.map((field) => (
            <div key={field.id} className="flex items-center justify-between text-xs">
              <span className="text-gray-400 truncate">{field.label}:</span>
              <span className="text-white font-medium ml-2 truncate max-w-[150px]" title={String(field.value)}>
                {field.type === 'boolean'
                  ? (field.value ? '✓' : '✗')
                  : String(field.value)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Module badges */}
      <div className="flex flex-wrap gap-1 mt-2">
        {inputs.length > 0 && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 rounded text-xs text-blue-300">
            <ArrowDown className="w-3 h-3" />
            <span>{inputs.length} input{inputs.length !== 1 ? 's' : ''}</span>
          </div>
        )}
        {outputs.length > 0 && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded text-xs text-green-300">
            <ArrowUp className="w-3 h-3" />
            <span>{outputs.length} output{outputs.length !== 1 ? 's' : ''}</span>
          </div>
        )}
        {hasInstruction && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 rounded text-xs text-purple-300">
            <FileText className="w-3 h-3" />
            <span>instruction</span>
          </div>
        )}
        {fields.length > 0 && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-500/20 rounded text-xs text-orange-300">
            <span>{fields.length} field{fields.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Bottom}
          id={output.id}
          style={{
            left: `${((index + 1) * 100) / (outputs.length + 1)}%`,
          }}
          className="!bg-green-400 !border-2 !border-green-600 !w-3 !h-3"
          title={output.name}
        />
      ))}
    </div>
  );
}

export default memo(AgentNode);
