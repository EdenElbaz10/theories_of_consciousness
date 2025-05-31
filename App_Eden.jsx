import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  Handle,
  Position,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";

// Define claims for each theory
const theoryClaims = {
  RPT: [
    "Recurrent processing (RP) that changes network activity in sensory areas and enables perceptual organization is both necessary and sufficient for consciousness (2)",
    "Every Function that requires RP that changes network activity will only be possible during conscious perception (3)",
    "Plasticity [potential for neuronal activity to change connectivity] is needed for consciousness (2)",
    "System with purely FF architecture cannot be conscious (3)",
    "Functions that are based on FF processing can be performed without consciousness (7)",
    "Information in visual short-term memory, which requires RP, is conscious (3)",
    "Stimulus localization is possible even if the stimulus is unconsciously processed (7)",
    "Base groupings/feature conjunction (e.g. combination of colour and orientation) are possible if the stimulus is unconsciously processed (1)",
    "Some interference (e.g., grey dots of different luminosity appearing on bright/dark background) could be possible even if stimulus is unconscious (7)",
    "Feature extraction and higher level categorizations (shape, object category) are possible even if the stimulus is unconsciously processed (7)",
    "Attention and availability for report are not necessary for C (4)",
    "Neural markers (RP) can serve as sufficient evidence for C, irrespective of report (5)",
    "Conscious perception overflows report, hence, perception is rich (5)",
    "Learning can take place for conscious but unattended events/stimuli (2)",
    "Perceptual organization requires RP that changes network activity: it's possible only during conscious perception (7)",
    "Figure-ground segregation should be possible only during conscious perception (7)",
    "Perceptual grouping (integration) should be possible only during conscious perception (7)",
    "Some inference (like Kanizsa illusion) is possible only during conscious perception (7)",
    "Inhibiting RP in sensory areas should impair perceptual organization (7)",
    "NMDA receptors, which enable cortico-cortical feedback and synaptic plasticity, are needed for consciousness (6)",
    "Recurrency creates conditions for Hebbian learning (2)",
    "NMDA receptors activation should be precondition for large-scale RP requiring consciousness (6)",
    "Inhibiting large-scale RP by targeting NMDA receptors should result in loss of (state) consciousness (6)",
    "Given a discrepancy between conscious perception and physical features of the stimulus, learning should occur for the former (2)",
    "Involvement of frontal areas is not necessary for C (3)",
    "Artificial and biological systems with recurrent architecture that enables learning and perceptual organization are conscious (6;8)",
    "Only consciously perceived stimuli evoke RP and have lasting impact on the brain (2)",
    "Unconscious learning should be impossible (2)",
    "NCC should not involve the PFC (3)",
    "Stimuli in change blindness and inattentional blindness paradigms are consciously perceived (3)",
  ],
  GNW: [
    "Decoding of all contents of consciousness should be possible from PFC",
    "Long-range synchronization (gamma/beta) should signal information sharing between PFC and category-specific areas",
    "Frontoparietal area should be one of the areas of implementation of GW",
    "Competing activity in frontal areas prior to stimulus presentation lowers the chance of consciously perceiving the stimulus",
    "T2-induced activation should be limited to a brief bottom-up activation in specialized processors and possibly also transiently in GW neurons",
    "Onset/Offset to tag appearance and disappearance of stimulus within C, if stimulus is attended",
    "Unless the content of consciousness is actively maintained in WM, neural activity in the GW should go back to baseline after ignition",
    "Critical NCCs should be found during later time window (e.g., starting after 200 ms post stimulus presentation), depending on evidence accumulation",
    "Activation in sensory areas should include two peaks, the timing of the second follows ignition in the PFC and should be affected by feedback disruption",
    "Late activation differentiates between C and UC processing",
    "Neural representations of conscious percepts should show stability over time",
    "Conscious states should be underpinned by prolonged and deeper activation compared to UC states",
    "Complexity measures should be higher for conscious states",
    "Long-range and feedback connections are needed for C because they maintain information in the GW by amplifying the signal",
    "UC information should elicit local short-lived neural responses in specialized areas or in networks configured by GW activity",
    "Long-axons pyramidal neurons between the GW and the modules allow global broadcasting of information",
    "Attentional blink should occur",
    "Artificial and biological systems that have a functionally equivalent global workspace are conscious",
    "While GW is occupied by competing content X or by spontaneous activity, content Y is less likely to be perceived",
    "Attention should be able to trigger conscious perception of a stimulus even after stimulus offset (possible decoupling of C and stimulus presentation)",
    "Top-down selection determines the contents of C",
    "Mobilization of information into the GW is signaled by ignition (sudden, coherent, exclusive activation of subset of WS neurons)",
    "Inattentional blindness should occur",
    "The GW can integrate only one state (e.g., percept, thought) at a time",
    "Attentional gating selects the content of consciousness among competing representations that are inhibited",
    "No trace conditioning without C",
    "No detection of global violations over time without C",
    "No flexible mental chaining without C",
    "Items in GW are items in Working Memory",
    "C processes can be long-lived",
    "Incoming information that fails to attain the critical threshold level for triggering the GW ('failed ignition') should not be C",
    "UC responses to stimuli are short lived",
    "If strong stimuli involving resonant loops within medium range connections are unattended, they remain preconscious",
    "Top-down attention should be needed for subliminal effects (e.g., priming) elicited by weak stimuli",
    "Information outside GW is processed unconsciously by separate modules in parallel",
    "GW can influence unconscious processes, which are not all fully automatic",
    "Novel combinations of operations should require C",
    "Information in modules/specialized brain areas outside of GW is encapsulated",
    "GW operates as information bottleneck: entry is gated",
    "Attentional processes mobilize information and broadcast it into the GW",
    "GW enables maintenance of percepts over time",
    "GW is needed to integrate between different modules and has the capacity to influence their activity",
    "Consciousness is accounted for in functional terms: subjective availability of information to a global workspace of input/output systems that breaks modularity",
  ],
  IIT: [
    "All features of a consciously perceived stimulus should be maximally decodable from posterior areas",
    "Across various possible spatiotemporal grains to study the brain, the one constitutive of consciousness should be the one achieving maximal φ",
    "Reduction of transmission in callosal fibres should lead to a point at which one consciousness splits in two. (Split brain)",
    "Loss and recovery of consciousness should be associated with the breakdown and recovery of the capacity for information integration.",
    "When c-e powers of neuronal populations are incongruent with c-e powers of the PSC, corresponding stimulus should remain unconscious",
    "Artificial systems, even if functionally equivalent to human brains, won't be conscious (no high Φ)",
    "Similarity judgments between experiences should map onto similarity between CESs, as reconstructed from brain states",
    "There should be content specific synchronization between high-level and low-level areas in the posterior cortex",
    "Network that corresponds to content of C should be actively maintained for the duration of that content in C",
    "Expert meditators experiencing 'pure presence' should exhibit decrease in gamma band, especially in posterior areas",
    "Experience of 'pure presence' should exhibit largely inactive posterior cortex",
    "Deactivating already inactive neurons of retinotopic cortex should remove part of spatial experience",
    "Altered connectivity in retinotopic cortex should lead to change in experienced space even without changes in neuronal activity",
    "Conscious perception overflows report",
    "Artificial activation of neurons near the then terminus in a directed grid should result in perceiving a stimulus as having occurred earlier",
    "Modulation of synaptic strength/excitability of neurons in directed grids should change properties of phenomenal flow regardless of activity levels",
    "Duration of the extended present should be proportional to the number of neurons constituting a directed grid",
    "Local strengthening or weakening of horizontal connections in topographic areas should lead to a local distortion of experienced visual space",
    "Posterior cortex is the likely candidate for NCC",
    "Changes in the strength of connections within PSC should be associated with changes in experience, even if neural activity does not change",
    "Brain Complexity measures sensitive to specialization / integration should correlate with consciousness",
    "Inactive neurons can contribute to consciousness",
    "Horizontal connections within topographically organized visual areas would be needed to experience visual space",
    "Spatial structure of experience should map into features specified by neurons organized in non-directed grid-like networks",
    "Temporal structure of experience should map into features specified by neurons organized in directed grids",
    "Lattices of specialized + integrated units are well-suited to achieve high φ",
    "PSC needs to be both specialized and integrated to achieve high φ",
    "Only distinctions with c-e powers compatible with the c-e powers of the whole PSC contribute to C",
    "Similarity between Φ structures should map into similarity between experiences",
    "Every distinction that is consciously experienced should be manifested in the CES for as long as it is experienced",
    "All units in the PSC must have the potential to be active",
    "C is extremely rich (i.e., highly structured)",
    "Entire PSC (not only task-relevant activity) supports CES (= experience)",
    "Type of experience (e.g., spatial vs temporal) should depend on the architecture of the substrate specifying the CES",
    "CONNECTIVITY: the connections between units of a PSC determine whether it can support high φ",
    "Spatiotemporal grain that matters for consciousness is the one that maximizes φ",
    "Functional (extrinsic) equivalence doesn't entail phenomenal (intrinsic) equivalence",
    "ACTIVITY: changes in the state of the PSC units determine changes in CES (and therefore in experience)",
    "Based on introspection, every experience is essentially intrinsic, specific, unitary, definite, and structured = Operationally, the PSC must be a maximum of irreducible, specific, intrinsic c-e power, supporting a CES",
  ],
  HOT: [
    "Given background conditions, a first-order state is conscious if it is indexed, via a pointer, by a higher-order state as reliably reflecting the world as it is now",
    "If you are not aware of being in a mental state, then there's nothing it is like for you to be in that mental state",
    "There can be a mismatch between higher order states and first order states",
    "Inner awareness should correlate with implicit metacognitive abilities",
    "Function of C is formation of subjectively justified beliefs about the external world (i.e., monitoring reality)",
    "UC processing can have most of the functional capacities of C processing, without formation of subjectively justified beliefs",
    "Given the right paradigm, discrimination performance should be the same with and without conscious perception",
    "In humans, PFC, held to be involved in metacognitive abilities, is required for higher-order states",
    "Consciousness requires higher-order cognitive states",
    "Change in FOS without update in HOS should lead to change blindness",
    "Conscious states need to be accessed (no P-c without A-c)",
    "Mismatch between FOS and HOS is related to inflation of minimally attended representations while matching discrimination performance",
    "Consciousness just appears rich, though it isn't",
    "Inflation should be modulated by expectations: inflation is stronger when expectations are higher",
    "Increased tendency to make false alarms in detection tasks for stimuli presented peripherally",
    "Reduced metacognitive capacities to track task performance on peripheral information",
    "Stronger inflation effects when subject attends to expected stimulus properties",
    "Subjects should report rich phenomenology while missing details of the percept",
    "Perception doesn't overflow report",
    "Imagery vividness is modulated by whether the HOS labels an internally generated FOS as more similar to noise or to an external stimulus",
    "A change in the higher-order state should lead to a change in consciousness even if the first-order state remains the same",
    "Manipulating the PFC should induce confusion between perception and imagery",
    "In humans, PFC is necessary for conscious perception",
    "Some targeted changes in the prefrontal (and parietal) areas should lead to changes in consciousness",
    "TMS applied to DLPFC should change subjective report about awareness of a stimulus without affecting task performance",
    "Visual hallucinations can occur if functions of PFC are disrupted (e.g., Schizophrenia, dopaminergic drugs, direct cortical stimulation)",
    "Decodability of inflated perception should be high in later stages of the visual processing hierarchy, not in primary visual cortex",
    "Top-down effects of expectations on inflation should be reflected by timecourses of decodability between frontoparietal and visual areas",
    "TMS stimulation of PFC and lesions should impact subjective reports of consciousness",
    "Given background conditions, artificial and biological systems with FOS, higher-order mechanisms, and metacognitive abilities are conscious",
    "Perceptual discrimination performance is driven by first-order states, not higher-order ones",
    "Inner awareness must discriminate between neural activity due to external stimulus and noise",
    "HOS relies on averages to track internal noise",
    "Stimuli presented when neuronal excitability is high should lead to more false alarms and higher visibility/confidence ratings",
  ],
};

// Create a function to check if a claim belongs to the current theory
const isClaimFromTheory = (claim, theory) => {
  return theoryClaims[theory]?.includes(claim) || false;
};

const getInitialNodes = (theory) => {
  if (!theory || !theoryClaims[theory]) {
    console.error('Invalid theory selected:', theory);
    return [];
  }

  return theoryClaims[theory].map((text, i) => {
    // Calculate position with maximum 10 nodes per column
    const column = Math.floor(i / 10);
    const row = i % 10;
    return {
      id: `${theory}-${i + 1}`,
      type: "custom",
      data: { 
        label: text, 
        color: "#ffffff",
        theory: theory
      },
      position: {
        x: 50 + column * 250, // Reduced spacing between columns (was 300)
        y: 50 + row * 130,    // Slightly increased spacing between rows (was 120)
      },
    };
  });
};

// Function to get initial or stored network state
const getInitialNetworkState = () => {
  try {
    const storedNetworks = localStorage.getItem('theoryNetworks');
    if (storedNetworks) {
      return JSON.parse(storedNetworks);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  
  // Return default state if nothing in localStorage
  return {
    RPT: { nodes: getInitialNodes("RPT"), edges: [] },
    GNW: { nodes: getInitialNodes("GNW"), edges: [] },
    IIT: { nodes: getInitialNodes("IIT"), edges: [] },
    HOT: { nodes: getInitialNodes("HOT"), edges: [] },
  };
};

const CustomNode = ({ id, data, selected }) => {
  const [color, setColor] = useState(data.color || "#ffffff");
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  useEffect(() => {
    setColor(data.color || "#ffffff");
  }, [data.color]);

  const onChangeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    window.updateNodeColor(id, newColor);
  };

  const onDoubleClick = () => {
    setIsEditing(true);
  };

  const onBlur = () => {
    setIsEditing(false);
    window.updateNodeLabel(id, label);
  };

  const isNewBox = !Object.values(theoryClaims).some(claims => 
    claims.includes(data.label)
  );

  // Add metric circle if metrics data is available
  const metricCircle = data.metrics && data.selectedMetric ? (
    <div
      style={{
        position: "absolute",
        top: "-25px",
        right: "-25px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: `rgb(0, ${Math.floor(150 + (data.metrics[data.selectedMetric] * 100))}, 255)`,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "11px",
        fontWeight: "bold",
        border: "2px solid white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        zIndex: 10
      }}
    >
      {data.metrics[data.selectedMetric].toFixed(2)}
    </div>
  ) : null;

  return (
    <div
      style={{
        border: `2px solid ${isNewBox ? "#4CAF50" : "#333"}`,
        borderRadius: 8,
        padding: "2px 8px",
        background: color,
        width: 220,
        minHeight: 100,
        fontSize: 12,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        boxShadow: isNewBox ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
        fontFamily: "Calibri, sans-serif",
      }}
      onDoubleClick={onDoubleClick}
    >
      {metricCircle}
      {["Top", "Right", "Bottom", "Left"].map((pos) => (
        <Handle
          key={pos}
          type="source"
          position={Position[pos]}
          id={pos.toLowerCase()}
          isConnectable={true}
          style={{
            background: "#666",
            width: "8px",
            height: "8px",
            border: "2px solid #fff",
            ...(pos === "Top" || pos === "Bottom"
              ? { left: "50%" }
              : { top: "50%" }),
          }}
        />
      ))}
      {isEditing ? (
        <textarea
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={onBlur}
          autoFocus
          style={{
            width: "90%",
            height: "80px",
            padding: "5px",
            resize: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "12px",
            fontFamily: "Calibri, sans-serif",
            fontWeight: isNewBox ? "bold" : "normal",
          }}
          className="nodrag"
        />
      ) : (
        <div
          style={{
            fontSize: "12px",
            fontFamily: "Calibri, sans-serif",
            fontWeight: isNewBox ? "bold" : "normal",
          }}
        >
          {label}
        </div>
      )}
      {selected && (
        <input
          type="color"
          value={color}
          onChange={onChangeColor}
          style={{ marginTop: 6 }}
          className="nodrag"
        />
      )}
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

const calculateNetworkMetrics = (nodes, edges) => {
  // First, identify connected nodes (nodes with at least one edge)
  const connectedNodeIds = new Set();
  edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  // Filter nodes to only include connected ones
  const connectedNodes = nodes.filter(node => connectedNodeIds.has(node.id));
  const N = connectedNodes.length; // Total number of connected nodes
  
  if (N === 0) return {
    nodeMetrics: {},
    globalMetrics: {
      networkSize: 0,
      edgeCount: 0
    }
  };

  // Create adjacency map for quick lookups
  const adjacencyMap = {};
  edges.forEach(edge => {
    if (!adjacencyMap[edge.source]) adjacencyMap[edge.source] = [];
    adjacencyMap[edge.source].push(edge.target);
  });

  // Calculate PageRank
  const calculatePageRank = () => {
    const d = 0.85; // damping factor (alpha in NetworkX)
    const epsilon = 1e-6; // NetworkX's default tolerance
    const maxIter = 100; // NetworkX's default max_iter
    let pagerank = {};
    
    // Initialize PageRank values for all nodes (1/N)
    connectedNodes.forEach(node => pagerank[node.id] = 1/N);
    
    // Get dangling nodes (nodes with no outgoing edges)
    const danglingNodes = connectedNodes
      .filter(node => !adjacencyMap[node.id] || adjacencyMap[node.id].length === 0)
      .map(node => node.id);

    // Iterate until convergence
    for (let iter = 0; iter < maxIter; iter++) {
      let newPagerank = {};
      let danglingSum = 0;
      
      // Calculate dangling sum
      danglingNodes.forEach(nodeId => {
        danglingSum += pagerank[nodeId];
      });

      // Update PageRank values
      connectedNodes.forEach(node => {
        // Initialize with damping factor distribution
        let sum = 0;
        
        // Add contribution of incoming edges
        edges.forEach(edge => {
          if (edge.target === node.id) {
            const sourceOutDegree = adjacencyMap[edge.source] ? adjacencyMap[edge.source].length : 0;
            if (sourceOutDegree > 0) {
              sum += pagerank[edge.source] / sourceOutDegree;
            }
          }
        });

        // Calculate new PageRank value
        newPagerank[node.id] = ((1 - d) / N) + 
                              d * (sum + (danglingSum / N));
      });

      // Check for convergence
      let diff = 0;
      connectedNodes.forEach(node => {
        diff += Math.abs(newPagerank[node.id] - pagerank[node.id]);
      });
      
      pagerank = {...newPagerank};
      
      if (diff < epsilon) {
        break;
      }
    }

    // Normalize to sum to 1
    let totalRank = Object.values(pagerank).reduce((a, b) => a + b, 0);
    Object.keys(pagerank).forEach(nodeId => {
      pagerank[nodeId] = pagerank[nodeId] / totalRank;
    });

    return pagerank;
  };

  // Calculate LRC (Local Reaching Centrality)
  const calculateLRC = () => {
    const lrc = {};
    
    connectedNodes.forEach(node => {
      // Implement single_source_shortest_path_length
      const distances = {};
      const queue = [[node.id, 0]];
      const visited = new Set();
      
      while (queue.length > 0) {
        const [current, dist] = queue.shift();
        if (!visited.has(current)) {
          visited.add(current);
          distances[current] = dist;
          
          if (adjacencyMap[current]) {
            adjacencyMap[current].forEach(neighbor => {
              if (!visited.has(neighbor)) {
                queue.push([neighbor, dist + 1]);
              }
            });
          }
        }
      }
      
      // Calculate LRC value
      let sum = 0;
      Object.entries(distances).forEach(([target, dist]) => {
        if (dist > 0) {
          sum += 1 / dist;
        }
      });
      
      lrc[node.id] = sum / (N - 1);
    });
    
    return lrc;
  };

  // Calculate LRC_NX (NetworkX's implementation)
  const calculateLRC_NX = () => {
    const lrc_nx = {};
    
    connectedNodes.forEach(node => {
      let reachable = 0;
      const visited = new Set();
      const queue = [node.id];
      
      while (queue.length > 0) {
        const current = queue.shift();
        if (!visited.has(current)) {
          visited.add(current);
          if (current !== node.id) reachable++;
          
          if (adjacencyMap[current]) {
            adjacencyMap[current].forEach(neighbor => {
              if (!visited.has(neighbor)) {
                queue.push(neighbor);
              }
            });
          }
        }
      }
      
      lrc_nx[node.id] = reachable / (N - 1);
    });
    
    return lrc_nx;
  };

  // Calculate Betweenness Centrality
  const calculateBetweenness = () => {
    const betweenness = {};
    connectedNodes.forEach(node => betweenness[node.id] = 0);

    // For each pair of nodes
    connectedNodes.forEach(source => {
      // Implement Brandes' algorithm
      const stack = [];
      const predecessors = {};
      const sigma = {};
      const distance = {};
      const delta = {};
      
      connectedNodes.forEach(node => {
        predecessors[node.id] = [];
        sigma[node.id] = 0;
        distance[node.id] = -1;
        delta[node.id] = 0;
      });

      sigma[source.id] = 1;
      distance[source.id] = 0;
      const queue = [source.id];
      
      while (queue.length > 0) {
        const v = queue.shift();
        stack.push(v);
        
        if (adjacencyMap[v]) {
          adjacencyMap[v].forEach(w => {
            // Path discovery
            if (distance[w] < 0) {
              queue.push(w);
              distance[w] = distance[v] + 1;
            }
            // Path counting
            if (distance[w] === distance[v] + 1) {
              sigma[w] += sigma[v];
              predecessors[w].push(v);
            }
          });
        }
      }

      // Accumulation
      while (stack.length > 0) {
        const w = stack.pop();
        predecessors[w].forEach(v => {
          delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]);
        });
        if (w !== source.id) {
          betweenness[w] += delta[w];
        }
      }
    });

    // Normalize
    const scale = (N - 1) * (N - 2);
    if (scale > 0) {
      connectedNodes.forEach(node => {
        betweenness[node.id] = betweenness[node.id] / scale;
      });
    }

    return betweenness;
  };

  // Calculate all metrics
  const pagerank = calculatePageRank();
  const lrc = calculateLRC();
  const lrc_nx = calculateLRC_NX();
  const betweenness = calculateBetweenness();

  // Initialize metrics for all nodes (including unconnected ones)
  const nodeMetrics = {};
  nodes.forEach(node => {
    if (connectedNodeIds.has(node.id)) {
      // For connected nodes, use calculated metrics
      nodeMetrics[node.id] = {
        'PageRank': pagerank[node.id],
        'LRC': lrc[node.id],
        'LRC_NX': lrc_nx[node.id],
        'Betweenness Centrality': betweenness[node.id]
      };
    } else {
      // For unconnected nodes, set all metrics to 0
      nodeMetrics[node.id] = {
        'PageRank': 0,
        'LRC': 0,
        'LRC_NX': 0,
        'Betweenness Centrality': 0
      };
    }
  });

  return {
    nodeMetrics,
    globalMetrics: {
      networkSize: N,
      edgeCount: edges.length
    }
  };
};

export default function App() {
  const [selectedTheory, setSelectedTheory] = useState(() => {
    return localStorage.getItem('selectedTheory') || "RPT";
  });
  
  const [theoryNetworks, setTheoryNetworks] = useState(getInitialNetworkState);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [selectedMetric, setSelectedMetric] = useState('PageRank');
  const [showMetrics, setShowMetrics] = useState(false);
  const [networkMetrics, setNetworkMetrics] = useState(null);

  // Load the selected theory's network
  useEffect(() => {
    setNodes(theoryNetworks[selectedTheory].nodes);
    setEdges(theoryNetworks[selectedTheory].edges);
  }, [selectedTheory]);

  // Save changes to localStorage whenever networks change
  useEffect(() => {
    try {
      localStorage.setItem('theoryNetworks', JSON.stringify(theoryNetworks));
      localStorage.setItem('selectedTheory', selectedTheory);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [theoryNetworks, selectedTheory]);

  // Save changes back to the theory networks
  useEffect(() => {
    setTheoryNetworks(prev => ({
      ...prev,
      [selectedTheory]: {
        nodes: nodes,
        edges: edges,
      }
    }));
  }, [nodes, edges, selectedTheory]);

  // Update window functions for node manipulation
  useEffect(() => {
    window.updateNodeColor = (id, newColor) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id 
            ? { 
                ...n, 
                data: { 
                  ...n.data, 
                  color: newColor 
                } 
              } 
            : n
        )
      );
    };

    window.updateNodeLabel = (id, newLabel) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id 
            ? { 
                ...n, 
                data: { 
                  ...n.data, 
                  label: newLabel 
                } 
              } 
            : n
        )
      );
    };
  }, [setNodes]);

  // Add this new useEffect to handle metric selection changes
  useEffect(() => {
    if (networkMetrics && nodes.length > 0) {
      const updatedNodes = nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          metrics: networkMetrics.nodeMetrics[node.id],
          selectedMetric: selectedMetric
        }
      }));
      setNodes(updatedNodes);
    }
  }, [selectedMetric]); // This effect runs when selectedMetric changes

  const changeTheory = (theory) => {
    if (theory !== selectedTheory) {
      // Save current state before switching
      setTheoryNetworks(prev => ({
        ...prev,
        [selectedTheory]: {
          nodes: nodes,
          edges: edges,
        }
      }));
      
      // Switch theory
      setSelectedTheory(theory);
    }
  };

  const resetLayout = () => {
    // Get initial node positions
    const initialNodes = getInitialNodes(selectedTheory);
    
    // Map current nodes to preserve their colors and custom properties, but clear metrics
    const preservedNodes = nodes.map(existingNode => {
      // Find the corresponding initial node position
      const initialNode = initialNodes.find(n => n.id === existingNode.id);
      
      if (initialNode) {
        // For theory nodes, preserve color but reset position and clear metrics
        return {
          ...existingNode,
          position: initialNode.position,
          data: {
            ...existingNode.data,
            metrics: null,
            selectedMetric: null
          }
        };
      }
      
      // For custom nodes, keep them at their current position but clear metrics
      return {
        ...existingNode,
        data: {
          ...existingNode.data,
          metrics: null,
          selectedMetric: null
        }
      };
    });
    
    setNodes(preservedNodes);
    setEdges([]);
    setShowMetrics(false);
    
    // Update the current theory's network state
    setTheoryNetworks(prev => ({
      ...prev,
      [selectedTheory]: {
        nodes: preservedNodes,
        edges: [],
      }
    }));

    // Update localStorage
    try {
      localStorage.setItem('theoryNetworks', JSON.stringify({
        ...theoryNetworks,
        [selectedTheory]: {
          nodes: preservedNodes,
          edges: [],
        }
      }));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const addNewBox = () => {
    const newId = `${selectedTheory}-custom-${Date.now()}`;
    const newNode = {
      id: newId,
      type: "custom",
      data: { 
        label: "Double click to edit", 
        color: "#ffffff",
        theory: selectedTheory
      },
      position: {
        x: Math.random() * 500 + 50,
        y: Math.random() * 500 + 50,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find(n => n.id === params.source);
      const targetNode = nodes.find(n => n.id === params.target);
      
      if (sourceNode?.data.theory !== targetNode?.data.theory) {
        console.warn('Cannot connect nodes from different theories');
        return;
      }

      const connection = {
        ...params,
        type: "smoothstep",
        animated: false,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "#222",
        },
        style: { stroke: "#222", strokeWidth: 2.5 },
      };
      setEdges((eds) => addEdge(connection, eds));
    },
    [nodes, setEdges]
  );

  const exportNetwork = () => {
    const currentNetwork = theoryNetworks[selectedTheory];
    
    // Ensure all node data including colors is properly exported
    const nodesWithColors = currentNetwork.nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        color: node.data.color || "#ffffff",
        theory: selectedTheory
      }
    }));

    const data = JSON.stringify({ 
      theory: selectedTheory,
      nodes: nodesWithColors,
      edges: currentNetwork.edges,
      exportDate: new Date().toISOString(),
      version: "1.0"
    }, null, 2);

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTheory}_network_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importNetwork = (event) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate imported data
            if (!importedData.theory || !importedData.nodes || !importedData.edges) {
              alert('Invalid map file format');
              return;
            }

            // Process nodes to ensure all data is properly structured
            const nodesWithColors = importedData.nodes.map(node => {
              // Ensure node has all required properties
              const processedNode = {
                ...node,
                data: {
                  ...node.data,
                  color: node.data.color || "#ffffff",
                  theory: importedData.theory,
                  label: node.data.label || ""
                }
              };
              
              // Log node data for debugging
              console.log('Processing node:', processedNode);
              
              return processedNode;
            });

            // Switch to the imported theory
            setSelectedTheory(importedData.theory);
            
            // Update the network with processed nodes
            const updatedNetwork = {
              nodes: nodesWithColors,
              edges: importedData.edges
            };

            // Update current view
            setNodes(nodesWithColors);
            setEdges(importedData.edges);

            // Update theory networks state
            setTheoryNetworks(prev => ({
              ...prev,
              [importedData.theory]: updatedNetwork
            }));

            // Update localStorage
            localStorage.setItem('theoryNetworks', JSON.stringify({
              ...theoryNetworks,
              [importedData.theory]: updatedNetwork
            }));
            localStorage.setItem('selectedTheory', importedData.theory);

          } catch (error) {
            console.error('Error importing map:', error);
            alert('Error importing map. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };

    fileInput.click();
  };

  const analyzeNetwork = () => {
    const metrics = calculateNetworkMetrics(nodes, edges);
    setNetworkMetrics(metrics);
    
    // Update nodes to include metrics data
    const newNodes = nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        metrics: metrics.nodeMetrics[node.id],
        selectedMetric: selectedMetric
      }
    }));

    setNodes(newNodes);
    setShowMetrics(true);
  };

  // Add this component for the metrics panel
  const MetricsPanel = () => {
    if (!showMetrics || !networkMetrics) return null;

    return (
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 10,
          zIndex: 10,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '6px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          maxWidth: '250px',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Network Metrics</h3>
        <select
          value={selectedMetric}
          onChange={(e) => {
            setSelectedMetric(e.target.value);
          }}
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '4px',
            fontSize: '12px'
          }}
        >
          <option value="PageRank">PageRank</option>
          <option value="LRC">LRC</option>
          <option value="LRC_NX">LRC (NetworkX)</option>
          <option value="Betweenness Centrality">Betweenness Centrality</option>
        </select>
        <div style={{ fontSize: '12px' }}>
          <p><strong>Nodes:</strong> {networkMetrics.globalMetrics.networkSize}</p>
          <p><strong>Edges:</strong> {networkMetrics.globalMetrics.edgeCount}</p>
        </div>
        <button
          onClick={() => setShowMetrics(false)}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            marginTop: '10px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlowProvider>
        {/* Theory selector in top middle */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <label 
            htmlFor="theory-select" 
            style={{ 
              fontSize: "11px", 
              fontWeight: "bold",
              color: "#666",
            }}
          >
            Select Theory:
          </label>
          <select 
            id="theory-select"
            value={selectedTheory} 
            onChange={(e) => changeTheory(e.target.value)}
            style={{
              padding: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              fontSize: "11px",
              width: "80px",
              height: "28px",
              cursor: "pointer",
              outline: "none",
              lineHeight: "28px",
            }}
          >
            <option value="RPT">RPT</option>
            <option value="GNW">GNW</option>
            <option value="IIT">IIT</option>
            <option value="HOT">HOT</option>
          </select>
        </div>

        {/* Action buttons in top-right */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            width: "130px",
          }}
        >
          <button 
            onClick={addNewBox}
            style={{
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
              textAlign: "left",
            }}
          >
            Add New Claim
          </button>
          <button 
            onClick={resetLayout}
            style={{
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
              textAlign: "left",
            }}
          >
            Reset Layout
          </button>
          <button 
            onClick={exportNetwork}
            style={{
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
              textAlign: "left",
            }}
          >
            Download
          </button>
          <button 
            onClick={importNetwork}
            style={{
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
              textAlign: "left",
            }}
          >
            Load Map
          </button>
          <button 
            onClick={analyzeNetwork}
            style={{
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100%",
              textAlign: "left",
            }}
          >
            Analyze
          </button>
        </div>

        {/* Add the metrics panel */}
        <MetricsPanel />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          connectionMode="loose"
          connectOnClick={true}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { strokeWidth: 2.5 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "#222",
            },
          }}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
