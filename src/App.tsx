import "@mantine/core/styles.css";
import AppLayout from "./components/AppLayout.tsx";
import GraphCanvas from "./components/GraphCanvas.tsx";
import { getGraphData } from './data/graphData';

export default function App() {
  const graphData = getGraphData();
  return (
    <AppLayout>
      <GraphCanvas graphData={graphData} />
    </AppLayout>
  );
}
