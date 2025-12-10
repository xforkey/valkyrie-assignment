import { Stack, Text, Title, Badge, Divider, Group } from '@mantine/core';
import type { GraphNode, GraphEdge } from '../types/graph';

interface NodeDetailsPanelProps {
    node?: GraphNode;
    edges: GraphEdge[];
}

const nodeTypeColors: Record<string, string> = {
    PROJECT: 'blue',
    PERSON: 'green',
    ORG: 'orange',
    DOCUMENT: 'purple',
};

export default function NodeDetailsPanel({ node, edges }: NodeDetailsPanelProps) {
    if (!node) {
        return (
            <Stack p="md" h="100%">
                <Text c="dimmed" size="sm">
                    Select a node to view details
                </Text>
            </Stack>
        );
    }

    // Find edges connected to this node
    const connectedEdges = edges.filter(
        (edge) => edge.source === node.id || edge.target === node.id
    );

    return (
        <Stack p="md" gap="md">
            <div>
                <Group gap="xs" mb="xs">
                    <Title order={4}>{node.label}</Title>
                    <Badge color={nodeTypeColors[node.type]} size="sm">
                        {node.type}
                    </Badge>
                </Group>
                <Text size="xs" c="dimmed">
                    ID: {node.id}
                </Text>
            </div>

            <Divider />

            <div>
                <Title order={5} mb="sm">
                    Connected Edges ({connectedEdges.length})
                </Title>
                {connectedEdges.length === 0 ? (
                    <Text size="sm" c="dimmed">
                        No connections
                    </Text>
                ) : (
                    <Stack gap="xs">
                        {connectedEdges.map((edge, index) => {
                            const isOutgoing = edge.source === node.id;
                            const direction = isOutgoing ? '→' : '←';
                            const connectedNodeId = isOutgoing ? edge.target : edge.source;

                            return (
                                <Text key={index} size="sm">
                                    {direction} <strong>{edge.label}</strong> {direction} Node {connectedNodeId}
                                </Text>
                            );
                        })}
                    </Stack>
                )}
            </div>
        </Stack>
    );
}