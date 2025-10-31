import { useFlowStore } from '../store';
import { Save, Download, Upload, Trash2, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useReactFlow } from 'reactflow';

export default function Toolbar() {
  const { nodes, edges, saveFlow, loadFlow } = useFlowStore();
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleSave = () => {
    saveFlow();
    alert('Flow saved to local storage!');
  };

  const handleExport = () => {
    const flow = { nodes, edges };
    const dataStr = JSON.stringify(flow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `ai-agent-flow-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const flow = JSON.parse(event.target?.result as string);
            loadFlow(flow);
            alert('Flow imported successfully!');
          } catch (error) {
            alert('Error importing flow. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the entire canvas?')) {
      loadFlow({ nodes: [], edges: [] });
    }
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10
                    bg-gray-900 border border-gray-700 rounded-lg shadow-lg px-4 py-2">
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="p-2 hover:bg-gray-800 rounded transition-colors group"
          title="Save to Local Storage"
        >
          <Save className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>

        <button
          onClick={handleExport}
          className="p-2 hover:bg-gray-800 rounded transition-colors group"
          title="Export to JSON"
        >
          <Download className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>

        <button
          onClick={handleImport}
          className="p-2 hover:bg-gray-800 rounded transition-colors group"
          title="Import from JSON"
        >
          <Upload className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        <button
          onClick={() => zoomIn()}
          className="p-2 hover:bg-gray-800 rounded transition-colors group"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>

        <button
          onClick={() => zoomOut()}
          className="p-2 hover:bg-gray-800 rounded transition-colors group"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>

        <button
          onClick={() => fitView()}
          className="p-2 hover:bg-gray-800 rounded transition-colors group"
          title="Fit View"
        >
          <Maximize className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        <button
          onClick={handleClear}
          className="p-2 hover:bg-gray-800 rounded transition-colors group"
          title="Clear Canvas"
        >
          <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}
