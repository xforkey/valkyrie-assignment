import "@mantine/core/styles.css";
import { useState } from "react";
import AppLayout from "./components/AppLayout.tsx";
import GraphCanvas from "./components/GraphCanvas.tsx";
import { getGraphData } from './data/graphData';

export default function App() {
  const graphData = getGraphData();
  const [selectedNodeId, setSelectedNodeId] = useState<string>();

  return (
    <AppLayout>
      <GraphCanvas
        graphData={graphData}
        selectedNodeId={selectedNodeId}
        onNodeSelect={setSelectedNodeId}
      />
    </AppLayout>
  );
}
