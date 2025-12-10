import "@mantine/core/styles.css";
import { useState, useMemo } from "react";
import AppLayout from "./components/AppLayout.tsx";
import GraphCanvas from "./components/GraphCanvas.tsx";
import NodeDetailsPanel from "./components/NodeDetailsPanel.tsx";
import { getGraphData } from './data/graphData';
import { useGraphKeyboardNavigation } from './hooks/useGraphKeyboardNavigation';

export default function App() {
  const graphData = getGraphData();
  const [selectedNodeId, setSelectedNodeId] = useState<string>();

  const selectedNode = useMemo(
    () => graphData.nodes.find((node) => node.id === selectedNodeId),
    [graphData.nodes, selectedNodeId]
  );

  useGraphKeyboardNavigation({
    nodes: graphData.nodes,
    selectedNodeId,
    onNodeSelect: setSelectedNodeId,
  });

  return (
    <AppLayout
      aside={
        <NodeDetailsPanel
          node={selectedNode}
          edges={graphData.edges}
        />
      }
    >
      <GraphCanvas
        graphData={graphData}
        selectedNodeId={selectedNodeId}
        onNodeSelect={setSelectedNodeId}
      />
    </AppLayout>
  );
}
