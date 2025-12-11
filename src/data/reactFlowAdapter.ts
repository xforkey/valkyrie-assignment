import type { GraphNode, GraphData } from '../types/graph';
import { Node, Edge } from '@xyflow/react';

interface ClusteredPosition {
    x: number;
    y: number;
}

/**
 * Calculate clustered position for a node based on its type and index within that type
 */
const calculateClusteredPosition = (
    node: GraphNode,
    index: number,
    nodesOfType: GraphNode[]
): ClusteredPosition => {
    // Define Y positions for each type (vertical layers)
    const typeYPositions = {
        PROJECT: 0,
        PERSON: 250,
        ORG: 500,
        DOCUMENT: 750
    };

    // Calculate horizontal position within the type group
    const groupSize = nodesOfType.length;
    const horizontalSpacing = 300;
    const startX = -(groupSize - 1) * (horizontalSpacing / 2); // Center the group
    const x = startX + (index * horizontalSpacing);
    const y = typeYPositions[node.type];

    return { x, y };
};

/**
 * Convert GraphData to React Flow nodes and edges with clustered layout
 */
export function adaptGraphDataToReactFlow(
    graphData: GraphData,
    selectedNodeId?: string
): { nodes: Node[]; edges: Edge[] } {
    // Group nodes by type
    const nodesByType = {
        PROJECT: graphData.nodes.filter(node => node.type === 'PROJECT'),
        PERSON: graphData.nodes.filter(node => node.type === 'PERSON'),
        ORG: graphData.nodes.filter(node => node.type === 'ORG'),
        DOCUMENT: graphData.nodes.filter(node => node.type === 'DOCUMENT')
    };

    // Create nodes with clustered positions
    const nodes: Node[] = graphData.nodes.map((node) => {
        const nodesOfType = nodesByType[node.type];
        const indexInType = nodesOfType.findIndex(n => n.id === node.id);
        const position = calculateClusteredPosition(node, indexInType, nodesOfType);

        return {
            id: node.id,
            data: { label: node.label, type: node.type },
            position,
            type: 'custom',
            selected: node.id === selectedNodeId,
        };
    });

    // Create edges
    const edges: Edge[] = graphData.edges.map((edge, index) => ({
        id: edge.id || `edge-${index}`,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        type: 'smoothstep',
        animated: true,
    }));

    return { nodes, edges };
}

/**
 * Get all node IDs connected to a selected node (including the selected node itself)
 */
export function getConnectedNodeIds(selectedId: string | null, edges: Edge[]): Set<string> {
    if (!selectedId) return new Set();

    const connected = new Set<string>();
    connected.add(selectedId); // Include the selected node itself

    edges.forEach(edge => {
        if (edge.source === selectedId) connected.add(edge.target);
        if (edge.target === selectedId) connected.add(edge.source);
    });

    return connected;
}