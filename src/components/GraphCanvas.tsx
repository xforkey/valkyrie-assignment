import { ReactFlow, Node, Edge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { GraphData } from '../types/graph';
import GraphNode from './GraphNode';

interface GraphCanvasProps {
    graphData: GraphData;
    selectedNodeId?: string;
    onNodeSelect: (nodeId: string) => void;
}

const nodeTypes = {
    custom: GraphNode,
};

export default function GraphCanvas({ graphData, selectedNodeId, onNodeSelect }: GraphCanvasProps) {
    const nodes: Node[] = graphData.nodes.map((node, index) => ({
        id: node.id,
        data: { label: node.label, type: node.type },
        position: { x: (index % 5) * 200, y: Math.floor(index / 5) * 100 },
        type: 'custom',
        selected: node.id === selectedNodeId,
    }));

    const edges: Edge[] = graphData.edges.map((edge, index) => ({
        id: edge.id || `edge-${index}`,
        source: edge.source,
        target: edge.target,
        label: edge.label,
    }));

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodeClick={(_, node) => onNodeSelect(node.id)}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}