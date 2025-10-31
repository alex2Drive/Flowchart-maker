import { useFlowStore } from '../store';
import { X } from 'lucide-react';

export default function PropertiesPanel() {
  const { selectedNode, updateNode, setSelectedNode, deleteNode } = useFlowStore();

  if (!selectedNode) {
    return null;
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNode(selectedNode.id, { label: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNode(selectedNode.id, { description: e.target.value });
  };

  const handleDelete = () => {
    deleteNode(selectedNode.id);
    setSelectedNode(null);
  };

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-700 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Properties</h3>
        <button
          onClick={() => setSelectedNode(null)}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Node Type
          </label>
          <div className="px-3 py-2 bg-gray-800 rounded border border-gray-700 text-sm text-gray-400">
            {selectedNode.data.type.toUpperCase()}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Label
          </label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={handleLabelChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded
                     text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter node label"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={selectedNode.data.description || ''}
            onChange={handleDescriptionChange}
            rows={4}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded
                     text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Enter node description"
          />
        </div>

        {selectedNode.data.type === 'llm' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Model Configuration
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Model (e.g., gpt-4)"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded
                         text-white text-sm focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Temperature (0-1)"
                step="0.1"
                min="0"
                max="1"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded
                         text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {selectedNode.data.type === 'decision' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Condition
            </label>
            <textarea
              rows={3}
              placeholder="Enter decision condition..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded
                       text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        )}

        <div className="pt-4 border-t border-gray-700">
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white
                     rounded font-medium transition-colors"
          >
            Delete Node
          </button>
        </div>
      </div>
    </div>
  );
}
