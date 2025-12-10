import sampleGraphData from './sample-graph.json';
import type { GraphData } from '../types/graph';

export function getGraphData(): GraphData {
    return sampleGraphData as GraphData;
}