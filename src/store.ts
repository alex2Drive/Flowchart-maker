import { create } from 'zustand';
import { Node, Edge, addEdge, Connection, EdgeChange, NodeChange, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { AgentNodeData } from './types';

interface FlowState {
  nodes: Node<AgentNodeData>[];
  edges: Edge[];
  selectedNode: Node<AgentNodeData> | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node<AgentNodeData>) => void;
  updateNode: (id: string, data: Partial<AgentNodeData>) => void;
  setSelectedNode: (node: Node<AgentNodeData> | null) => void;
  deleteNode: (id: string) => void;
  saveFlow: () => void;
  loadFlow: (data: { nodes: Node<AgentNodeData>[]; edges: Edge[] }) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge({ ...connection, type: 'smoothstep', animated: true }, get().edges),
    });
  },

  addNode: (node: Node<AgentNodeData>) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  updateNode: (id: string, data: Partial<AgentNodeData>) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
    });
  },

  setSelectedNode: (node: Node<AgentNodeData> | null) => {
    set({ selectedNode: node });
  },

  deleteNode: (id: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
    });
  },

  saveFlow: () => {
    const flow = {
      nodes: get().nodes,
      edges: get().edges,
    };
    localStorage.setItem('ai-agent-flow', JSON.stringify(flow));
  },

  loadFlow: (data: { nodes: Node<AgentNodeData>[]; edges: Edge[] }) => {
    set({
      nodes: data.nodes,
      edges: data.edges,
    });
  },
}));
