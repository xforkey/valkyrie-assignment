export type NodeType = 'PROJECT' | 'PERSON' | 'ORG' | 'DOCUMENT';

export interface GraphNode {
    id: string;
    label: string;
    type: NodeType;
}

export interface GraphEdge {
    id: string;
    source: string;
    target: string;
    label: string;
}

export interface GraphData {
    nodes: GraphNode[];
    edges: GraphEdge[];
}