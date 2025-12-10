import { Box, Text, Group, useMantineTheme, alpha } from '@mantine/core';
import { NodeProps } from '@xyflow/react';
import { IconFolder, IconUser, IconBuilding, IconFileText } from '@tabler/icons-react';
import type { NodeType } from '../types/graph';

export interface GraphNodeData {
    label: string;
    type: NodeType;
}

interface NodeStyle {
    color: string;
    icon: React.ComponentType<any>;
}

const BG_SHADE = 0;
const BORDER_SHADE = 5;

const NODE_STYLES: Record<NodeType, NodeStyle> = {
    PROJECT: {
        color: 'blue',
        icon: IconFolder,
    },
    PERSON: {
        color: 'green',
        icon: IconUser,
    },
    ORG: {
        color: 'violet',
        icon: IconBuilding,
    },
    DOCUMENT: {
        color: 'orange',
        icon: IconFileText,
    },
};

export default function GraphNode({ data, selected }: NodeProps) {
    const nodeData = data as unknown as GraphNodeData;
    const style = NODE_STYLES[nodeData.type];
    const Icon = style.icon;
    const theme = useMantineTheme();
    const bgColor = alpha(theme.colors[style.color][BG_SHADE], selected ? 0.5 : 0.3);
    const borderColor = theme.colors[style.color][BORDER_SHADE];

    return (
        <Box
            p="sm"
            style={{
                borderRadius: theme.radius.md,
                border: `${selected ? 3 : 2}px solid ${borderColor}`,
                boxShadow: selected ? theme.shadows.lg : undefined,
                minWidth: 140,
                cursor: 'pointer',
                backgroundColor: bgColor,
                backdropFilter: 'blur(10px)',
                transform: selected ? 'scale(1.05)' : undefined,
                transition: 'all 0.2s ease',
            }}
        >
            <Group gap="xs" justify="center">
                <Icon size={16} stroke={selected ? 2.5 : 2} style={{ color: borderColor }} />
                <Text size="sm" fw={selected ? 600 : 500}>
                    {nodeData.label}
                </Text>
            </Group>
        </Box>
    );
}