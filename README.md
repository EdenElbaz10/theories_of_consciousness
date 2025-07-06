# Consciousness Theory Mapping Platform

An interactive web-based platform for mapping and analyzing consciousness theories. Built with React and ReactFlow for academic research and educational purposes.

## Overview

This platform allows you to:
- **Visualize** prediction maps for consciousness theories
- **Add** custom claims and connections between them
- **Analyze** network properties using graph theory metrics
- **Export** networks for further analysis or presentation

## Theories Included

1. **Recurrent Processing Theory (RPT)**

2. **Global Neuronal Workspace (GNW)**

3. **Integrated Information Theory (IIT)**

4. **Predictive Processing Model (PRM)**

5. **Custom Theory**
   - Create your own theory with custom claims
   - Perfect for developing new theoretical frameworks

## 📊 Network Analysis (Color-coded circles display metric values on each node)
- **PageRank**: Measures node importance based on incoming connections
- **Local Reaching Centrality (LRC)**: Quantifies node reachability
- **Betweenness Centrality**: Identifies bridge nodes in the network
- **Reaching Centrality**: Shows how many nodes can be reached from each node

## Getting Started

### Usage

1. **Select a Theory**
   - Choose from RPT, GNW, IIT, PRM, or "other" from the dropdown
   - Each theory loads with its predefined claims

2. **Explore Claims**
   - Drag to reposition (snaps to grid)
   - Double-click to edit claim text
   - Click and drag from one node's handle to another
   - Click "Add New Claim" to create custom nodes

3. **Customize Appearance**
   - Select a node to see color controls
   - Add up to 4 colors for gradient effects
   - Copy/paste color schemes between nodes

4. **Analyze Network**
   - Click "Analyze" to calculate network metrics
   - Select metrics from the dropdown to display on nodes

7. **Export Your Work**
   - "Download" saves as JSON for later editing
   - "Load Map" imports previously saved networks
   - "Save as PNG"

## 📈 Network Metrics Explained

### Reach Centrality

- Simple count of reachable nodes
- Higher Reach Centrality: The nodes are core ideas that affect most of the theory


$$\text{Reach Centrality}(i) = \frac{\text{Number of nodes reached by } i}{N-1}$$

Where $N$ = Total number of nodes.

### Local Reaching Centrality (LRC)
- Quantifies how many other nodes can be reached
- Accounts for path distance (closer nodes weighted more)

$$\text{LRC}(i) = \frac{1}{N-1} \sum_{j \in R(i)} \frac{1}{d_{ij}}$$

Where:
- $N$ = Total number of nodes
- $R(i)$ = Set of nodes that can be reached from node $i$
- $d_{ij}$ = Shortest path length from node $i$ to node $j$
- LRC rewards nodes that can reach others in fewer steps


### Betweenness Centrality
- Measures how often a node lies on the shortest path between two other nodes in the network.
- High betweenness: the claim acts as a bridge between different parts of the theory.

$$\text{Betweenness centrality}(i) = \sum_{s \neq i \neq t} \frac{\sigma_{st}(i)}{\sigma_{st}}$$

Where:
- $\sigma_{st}$ = Total number of shortest paths from source ($s$) to target ($t$)
- $\sigma_{st}(i)$ = Number of those paths that pass through node $i$


### PageRank
- Measures node importance based on incoming connections
- High PageRank: the claim is supported by other highly important claims, making it a key part of the theory.

$$\text{PR}(i) = \frac{1-d}{N} + d \sum_{j \in \text{Predecessors}(i)} \frac{\text{PR}(j)}{L(j)}$$

Where:
- $d$ = Damping factor (0.85)
- $N$ = Total number of nodes
- $\text{Predecessors}(i)$ = Nodes that point to $i$
- $\text{PR}(j)$ = PageRank of node $j$ (importance of the claim linking to $i$)
- $L(j)$ = Number of outgoing links from node $j$ (how many claims $j$ justifies)

## Tips for Effective Use

### Organization
- Use consistent color schemes for related concepts
- Group related claims spatially
- Create clear connection patterns
- Use custom claims for unique insights

## Installation

### Option 1: Run Locally
1. Click the green `code` button, download as zip, then extract it locally (alternatively, clone the repo)
2. Install node from: https://nodejs.org/en/download
- Windows: Choose `Windows Installer (.msi)`
- Mac: Choose `macOS Installer (.pkg)`
3. Open a terminal in the folder:
- Windows: open the folder, right click on the white screen and choose `Open in Terminal`
- Mac: Open spotlight (`cmd + space`), write "terminal", open it and navigate to the folder by running:
```sh
cd Downloads/theories_of_consciousness-main
```
4. Install the app by running in the terminal:
```sh
npm install
```
5. Start the app by running in the terminal:
```sh
npm start
```

To stop the app, press in terminal `ctrl+c` (both on Windows and mac)

### Option 2: Run on Sandbox Platform
You can also run the app directly in your browser without any installation by visiting: [https://xk29y8.csb.app/](https://xk29y8.csb.app/)

---

**For questions or support, please contact: edenel0109@gmail.com** 
