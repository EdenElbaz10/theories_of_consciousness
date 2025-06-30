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

## Key Features

### 🔗 Connection System
- **Multiple Connection Points**: 8 connection handles per node (top, bottom, left, right)
- **Directed Edges**: Arrows show relationship direction


### 🎨 Interactive Node Management
- **Color Coding**: Assign up to 4 colors per claim using gradient backgrounds
- **Text Editing**: Double-click any claim to edit its content
- **Visual Distinction**: Custom claims are highlighted with green borders
- **Copy/Paste Colors**: Reuse color schemes across multiple claims


### 📊 Network Analysis (Color-coded circles display metric values on each node)
- **PageRank**: Measures node importance based on incoming connections
- **Local Reaching Centrality (LRC)**: Quantifies node reachability
- **Betweenness Centrality**: Identifies bridge nodes in the network
- **Reachability**: Shows how many nodes can be reached from each node


### 💾 Data Management
- **Auto-Save**: Automatic localStorage backup
- **Export/Import**: JSON format for sharing and backup
- **PNG Export**: PNG export for presentations
- **Theory Switching**: Seamless transitions between theories


## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely in the browser

### Usage

1. **Select a Theory**
   - Choose from RPT, GNW, IIT, PRM, or "other" from the dropdown
   - Each theory loads with its predefined claims

2. **Explore Claims**
   - Claims appear as colored boxes on the canvas
   - Double-click to edit claim text
   - Drag to reposition (snaps to grid)

3. **Create Connections**
   - Click and drag from one node's handle to another

4. **Customize Appearance**
   - Select a node to see color controls
   - Add up to 4 colors for gradient effects
   - Copy/paste color schemes between nodes

5. **Add Custom Claims**
   - Click "Add New Claim" to create custom nodes
   - Custom claims have green borders for identification

6. **Analyze Network**
   - Click "Analyze" to calculate network metrics
   - Select metrics from the dropdown to display on nodes
   - View network statistics

7. **Export Your Work**
   - "Download" saves as JSON for later editing
   - "Load Map" imports previously saved networks
   - "Save as PNG" creates presentation-ready images

## 📈 Network Metrics Explained

### Reachability
- Simple count of reachable nodes
- Higher reachability: The nodes are core ideas that affect most of the theory


$$\text{Reachability}(i) = \frac{\text{Number of nodes reached by } i}{N-1}$$

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


## 🔧 Technical Details

### Built With
- **React**: Modern UI framework
- **ReactFlow**: Interactive node-based editor
- **JavaScript**: Core functionality
- **CSS**: Styling and animations
- **localStorage**: Data persistence

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance
- Handles networks with 100+ nodes efficiently
- Real-time metric calculations
- Smooth animations and interactions
- Responsive design for various screen sizes

## Tips for Effective Use

### Organization
- Use consistent color schemes for related concepts
- Group related claims spatially
- Create clear connection patterns
- Use custom claims for unique insights

### Analysis
- Start with one theory to understand the interface
- Compare metrics across different theories
- Look for patterns in connection structures
- Identify central vs. peripheral claims



---

**For questions or support, please contact: edenelbaz1@mail.tau.ac.il** 
