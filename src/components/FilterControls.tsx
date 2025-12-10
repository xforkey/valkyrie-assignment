import { Checkbox, Group, Text } from '@mantine/core';
import type { NodeType } from '../types/graph';

interface FilterControlsProps {
    visibleTypes: NodeType[];
    onTypeToggle: (types: NodeType[]) => void;
}

const NODE_TYPE_LABELS: Record<NodeType, string> = {
    PROJECT: 'Projects',
    PERSON: 'People',
    ORG: 'Organizations',
    DOCUMENT: 'Documents',
};

const ALL_NODE_TYPES: NodeType[] = ['PROJECT', 'PERSON', 'ORG', 'DOCUMENT'];

export default function FilterControls({ visibleTypes, onTypeToggle }: FilterControlsProps) {
    const handleChange = (values: string[]) => {
        onTypeToggle(values as NodeType[]);
    };

    return (
        <Group gap="md" align="center">
            <Text size="sm" fw={500}>Filter by type:</Text>
            <Checkbox.Group
                value={visibleTypes}
                onChange={handleChange}
            >
                <Group gap="md">
                    {ALL_NODE_TYPES.map((type) => (
                        <Checkbox
                            key={type}
                            value={type}
                            label={NODE_TYPE_LABELS[type]}
                        />
                    ))}
                </Group>
            </Checkbox.Group>
        </Group>
    );
}