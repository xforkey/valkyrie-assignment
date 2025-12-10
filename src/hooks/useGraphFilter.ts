import { useState, useMemo } from 'react';
import type { GraphData, NodeType } from '../types/graph';

const ALL_NODE_TYPES: NodeType[] = ['PROJECT', 'PERSON', 'ORG', 'DOCUMENT'];

interface UseGraphFilterResult {
    visibleTypes: NodeType[];
    filteredGraphData: GraphData;
    setVisibleTypes: (types: NodeType[]) => void;
}

export function useGraphFilter(graphData: GraphData): UseGraphFilterResult {
    const [visibleTypes, setVisibleTypesState] = useState<Set<NodeType>>(
        new Set(ALL_NODE_TYPES)
    );

    // Filter nodes based on visible types
    const filteredNodes = useMemo(
        () => graphData.nodes.filter((node) => visibleTypes.has(node.type)),
        [graphData.nodes, visibleTypes]
    );

    // Filter edges to only include those where both source and target are visible
    const filteredEdges = useMemo(() => {
        const visibleNodeIds = new Set(filteredNodes.map((node) => node.id));
        return graphData.edges.filter(
            (edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
        );
    }, [graphData.edges, filteredNodes]);

    const filteredGraphData = useMemo(
        () => ({ nodes: filteredNodes, edges: filteredEdges }),
        [filteredNodes, filteredEdges]
    );

    const setVisibleTypes = (types: NodeType[]) => {
        setVisibleTypesState(new Set(types));
    };

    return {
        visibleTypes: Array.from(visibleTypes),
        filteredGraphData,
        setVisibleTypes,
    };
}