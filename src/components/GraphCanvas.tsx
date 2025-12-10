import { ReactFlow, Node, Edge, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { GraphData } from '../types/graph';
import { Box } from '@mantine/core';

interface GraphCanvasProps {
    graphData: GraphData;
}

export default function GraphCanvas({ graphData }: GraphCanvasProps) {
    const nodes: Node[] = graphData.nodes.map((node, index) => ({
        id: node.id,
        data: { label: node.label },
        position: { x: (index % 5) * 200, y: Math.floor(index / 5) * 100 },
        type: 'default',
    }));

    const edges: Edge[] = graphData.edges.map((edge, index) => ({
        id: edge.id || `edge-${index}`,
        source: edge.source,
        target: edge.target,
        label: edge.label,
    }));

    return (
        <Box
            role="region"
            aria-label="Interactive graph visualization"
            h="100%"
            bg="gray.0"
        >
            <ReactFlow nodes={nodes} edges={edges} fitView>
                <Background />
                <Controls />
            </ReactFlow>
        </Box>
    );
}