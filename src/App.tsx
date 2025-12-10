import "@mantine/core/styles.css";
import { useState, useMemo } from "react";
import AppLayout from "./components/AppLayout.tsx";
import GraphCanvas from "./components/GraphCanvas.tsx";
import NodeDetailsPanel from "./components/NodeDetailsPanel.tsx";
import FilterControls from "./components/FilterControls.tsx";
import { getGraphData } from './data/graphData';
import { useGraphKeyboardNavigation } from './hooks/useGraphKeyboardNavigation';
import { useGraphFilter } from './hooks/useGraphFilter';

export default function App() {
  const graphData = getGraphData();
  const [selectedNodeId, setSelectedNodeId] = useState<string>();

  const { visibleTypes, filteredGraphData, setVisibleTypes } = useGraphFilter(graphData);

  const selectedNode = useMemo(
    () => filteredGraphData.nodes.find((node) => node.id === selectedNodeId),
    [filteredGraphData.nodes, selectedNodeId]
  );

  useGraphKeyboardNavigation({
    nodes: filteredGraphData.nodes,
    selectedNodeId,
    onNodeSelect: setSelectedNodeId,
  });

  return (
    <AppLayout
      headerControls={
        <FilterControls
          visibleTypes={visibleTypes}
          onTypeToggle={setVisibleTypes}
        />
      }
      aside={
        <NodeDetailsPanel
          node={selectedNode}
          edges={filteredGraphData.edges}
        />
      }
    >
      <GraphCanvas
        graphData={filteredGraphData}
        selectedNodeId={selectedNodeId}
        onNodeSelect={setSelectedNodeId}
      />
    </AppLayout>
  );
}
