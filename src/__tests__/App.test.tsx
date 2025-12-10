import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import NodeDetailsPanel from '../components/NodeDetailsPanel';
import { getGraphData } from '../data/graphData';

describe('App', () => {
    it('should display selected node details in side panel when a node is selected', () => {
        const graphData = getGraphData();
        const selectedNode = graphData.nodes[0]; // Project Alpha

        // Render the NodeDetailsPanel with a selected node
        render(
            <MantineProvider>
                <NodeDetailsPanel node={selectedNode} edges={graphData.edges} />
            </MantineProvider>
        );

        // The side panel should show the node details
        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
        expect(screen.getByText('PROJECT')).toBeInTheDocument();
        expect(screen.getByText('ID: 1')).toBeInTheDocument();

        // Should show connected edges section
        expect(screen.getByText(/Connected Edges/)).toBeInTheDocument();
    });

    it('should show placeholder message when no node is selected', () => {
        const graphData = getGraphData();

        // Render the NodeDetailsPanel without a selected node
        render(
            <MantineProvider>
                <NodeDetailsPanel node={undefined} edges={graphData.edges} />
            </MantineProvider>
        );

        // Should show the placeholder message
        expect(screen.getByText('Select a node to view details')).toBeInTheDocument();
    });
});