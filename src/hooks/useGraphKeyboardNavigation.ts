import { useHotkeys } from "@mantine/hooks";
import type { GraphNode } from "../types/graph";

interface UseGraphKeyboardNavigationProps {
    nodes: GraphNode[];
    selectedNodeId?: string;
    onNodeSelect: (nodeId: string) => void;
    columns?: number;
}

export function useGraphKeyboardNavigation({
    nodes,
    selectedNodeId,
    onNodeSelect,
    columns = 5,
}: UseGraphKeyboardNavigationProps) {
    const totalNodes = nodes.length;

    const navigateGrid = (direction: 'up' | 'down' | 'left' | 'right') => {
        if (totalNodes === 0) return;

        const currentIndex = selectedNodeId
            ? nodes.findIndex(n => n.id === selectedNodeId)
            : -1;

        let newIndex = currentIndex;

        switch (direction) {
            case 'right':
                if ((currentIndex + 1) % columns !== 0 && currentIndex + 1 < totalNodes) {
                    newIndex = currentIndex + 1;
                }
                break;
            case 'left':
                if (currentIndex % columns !== 0) {
                    newIndex = currentIndex - 1;
                }
                break;
            case 'down':
                if (currentIndex + columns < totalNodes) {
                    newIndex = currentIndex + columns;
                }
                break;
            case 'up':
                if (currentIndex - columns >= 0) {
                    newIndex = currentIndex - columns;
                }
                break;
        }

        const targetIndex = newIndex === -1 ? 0 : newIndex;
        if (targetIndex !== currentIndex) {
            onNodeSelect(nodes[targetIndex].id);
        }
    };

    useHotkeys([
        ['ArrowRight', () => navigateGrid('right')],
        ['ArrowDown', () => navigateGrid('down')],
        ['ArrowLeft', () => navigateGrid('left')],
        ['ArrowUp', () => navigateGrid('up')],
    ]);
}