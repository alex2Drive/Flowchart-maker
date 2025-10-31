import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowStore } from './store';
import AgentNode from './components/AgentNode';
import Sidebar from './components/Sidebar';
import PropertiesPanel from './components/PropertiesPanel';
import Toolbar from './components/Toolbar';
import { AgentTemplate } from './types';

const nodeTypes: NodeTypes = {
  agentNode: AgentNode,
};

function FlowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNode,
    loadFlow,
  } = useFlowStore();

  const { screenToFlowPosition } = useReactFlow();

  // Load saved flow on mount
  useEffect(() => {
    const savedFlow = localStorage.getItem('ai-agent-flow');
    if (savedFlow) {
      try {
        const flow = JSON.parse(savedFlow);
        loadFlow(flow);
      } catch (error) {
        console.error('Error loading saved flow:', error);
      }
    }
  }, [loadFlow]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const templateData = event.dataTransfer.getData('application/reactflow');
      if (!templateData) return;

      const template: AgentTemplate = JSON.parse(templateData);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${template.type}-${Date.now()}`,
        type: 'agentNode',
        position,
        data: {
          label: template.label,
          type: template.type,
          description: template.description,
          instruction: '',
          inputs: template.defaultInputs || [],
          outputs: template.defaultOutputs || [],
          config: template.defaultConfig,
        },
      };

      addNode(newNode);
    },
    [screenToFlowPosition, addNode]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: any) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Save on Ctrl/Cmd + S
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        useFlowStore.getState().saveFlow();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />

      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-950"
          deleteKeyCode="Delete"
        >
          <Background className="bg-gray-950" />
          <Controls className="bg-gray-900 border-gray-700" />
          <MiniMap
            className="bg-gray-900 border border-gray-700"
            nodeColor={(node) => {
              const colorMap: Record<string, string> = {
                input: '#3b82f6',
                llm: '#8b5cf6',
                tool: '#10b981',
                decision: '#f59e0b',
                output: '#ef4444',
                function: '#6366f1',
              };
              return colorMap[node.data.type] || '#6b7280';
            }}
          />
          <Toolbar />
        </ReactFlow>
      </div>

      <PropertiesPanel />
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}

export default App;
