
---

# 1. Feature Brief

## Problem Statement

Users need to explore relationships among projects, people, organizations, and documents. A 2D, interactive knowledge graph allows users to visually inspect these relationships and drill down to node-specific details. The system should render a graph from static JSON and allow basic inspection without requiring backend services or advanced navigation features.

## Scope

This feature delivers a single-page React application that:

* Loads the provided static graph JSON.
* Renders a 2D graph with visually distinguished node types.
* Allows users to click a node to view details.
* Provides a simple, intuitive exploration experience.

The output must be minimal but production-quality in structure, using TypeScript, a graph library, and at least one test.

## Assumptions

* Static JSON is the only data source;
* Node detail view is lightweight.
* No layout algorithms beyond what the chosen graph library supplies.
* No deep accessibility, theming, or responsiveness requirements.
* No routing; all interactions occur on a single view.

## Non-Goals

* Dark mode / theming
* Authentication
* API calls (use static JSON
* Multiple pages / routing
* Animations / transitions
* Accessibility audit
* Responsive design

## Risks / Dependencies

* Graph library complexity may impact development speed.
* Node detail UI must not obstruct graph navigation.

---

# 2. Primary User Story + Acceptance Criteria + Estimate

## User Story

As a user, I want to explore a knowledge graph and inspect the details of any node so that I can understand the relationships between projects, people, documents, and organizations.

## Acceptance Criteria

1. The application loads and renders the provided `sample-graph.json` as a 2D graph.
2. Nodes are visually distinguishable by type (e.g., color, shape, or icon).
3. Clicking a node opens a details view displaying at least ID, label, type, and directly connected edges.
4. The graph remains visible and usable while the details view is open.
5. Edges render with labels, directional clarity, or both (depending on library constraints).
6. Basic error handling is present for malformed or missing data.

## Story Point Estimate

**3 points**
This is a small-to-medium feature in this constrained context. The work includes integrating a graph library, defining simple TypeScript types for a known static JSON shape, wiring node selection into a Mantine-based layout, and adding one interaction test. The static data, lack of API work, and reuse of Mantine/React Flow primitives keep the complexity and unknowns low enough that this fits comfortably into a 3-point story for the purposes of this assignment.

---

# 3. Mini Implementation Plan

1. **Project Setup**

   * Initialize React + TypeScript app; add chosen graph library (e.g., React Flow) and testing framework.
   * Define TypeScript interfaces for nodes, edges, and graph payload.

2. **Data Loading & State Model**

   * Import static JSON.
   * Establish top-level state for graph data and selected node.

3. **Graph Visualization Component**

   * Render nodes and edges using the library.
   * Apply node-type-based styling (color/shape/icon).
   * Attach click handlers to nodes to update `selectedNode`.

4. **Node Detail Component**

   * Create side panel/modal/tooltip showing node metadata and related edges.
   * Handle close behavior and accessibility basics (focus management if modal).

5. **Interaction & Integration Testing**

   * Implement a test that verifies clicking a node displays the correct detail panel.
   * Add one structural test for rendering nodes based on `sample-graph.json`.

6. **README + Final Polish**

   * Add setup instructions, assumptions, limitations, and “Next Hour” section.
   * Capture screenshot or short GIF (optional per instructions).

---
