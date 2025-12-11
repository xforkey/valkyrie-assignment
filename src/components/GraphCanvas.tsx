import { ReactFlow, Node, Edge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { GraphData } from '../types/graph';
import GraphNode from './GraphNode';
import { adaptGraphDataToReactFlow, getConnectedNodeIds } from '../data/reactFlowAdapter';

interface GraphCanvasProps {
    graphData: GraphData;
    selectedNodeId?: string;
    onNodeSelect: (nodeId: string) => void;
}

const nodeTypes = {
    custom: GraphNode,
};

export default function GraphCanvas({ graphData, selectedNodeId, onNodeSelect }: GraphCanvasProps) {
    // Use the adapter to get nodes and edges with clustered layout
    const { nodes: adaptedNodes, edges: adaptedEdges } = adaptGraphDataToReactFlow(graphData, selectedNodeId);

    // Get connected node IDs for dimming logic
    const connectedNodeIds = getConnectedNodeIds(selectedNodeId || null, adaptedEdges);

    // Apply dimming logic to nodes
    const nodes: Node[] = adaptedNodes.map(node => ({
        ...node,
        style: {
            ...node.style,
            opacity: connectedNodeIds.size === 0 || connectedNodeIds.has(node.id) ? 1 : 0.3
        }
    }));

    // Apply dimming logic to edges
    const edges: Edge[] = adaptedEdges.map(edge => ({
        ...edge,
        style: {
            ...edge.style,
            opacity: connectedNodeIds.size === 0 ||
                connectedNodeIds.has(edge.source) ||
                connectedNodeIds.has(edge.target) ? 1 : 0.3
        }
    }));

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodeClick={(_, node) => onNodeSelect(node.id)}
                fitView
                minZoom={0.1}
                maxZoom={4}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: false,
                }}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}