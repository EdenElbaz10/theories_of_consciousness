import React, { useCallback, useState, useEffect, useMemo } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  applyNodeChanges,
  Handle,
  Position,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";

// Define claims for each theory
const theoryClaims = {
  RPT: [
    "Recurrent processing (RP) that changes network activity in sensory areas and enables perceptual organization is both necessary and sufficient for C (2)",
    "Every Function that requires RP that changes network activity will only be possible during conscious perception (3)",
    "RP allowing plasticity (potential for neuronal activity to change connectivity) is needed for C (2)",
    "System with purely FF architecture cannot be conscious (3)",
    "Functions that are based on FF processing can be performed without C (7)",
    "Information in visual short-term memory, which requires RP and does not require attention and reportability, is conscious (3)",
    "Stimulus localization is possible even if the stimulus is UCly processed (7)",
    "Base groupings/feature conjunction (e.g. combination of colour and orientation) are possible if the stimulus is UCly processed  (1)",
    "Some interference (e.g., grey dots of different luminosity appearing on bright/dark background) could be possible even if stimulus is UC (7)",
    "Feature extraction and higher level categorizations (shape, object category) are possible even if the stimulus is UCly processed  (7)",
    "Attention and availability for report are not necessary for C (4)",
    "Neural markers (RP) can serve as sufficient evidence for C, irrespective of report (5)",
    "Conscious perception overflows report, hence, perception is rich (5)",
    "Learning can take place for conscious but unattended events/stimuli (2)",
    "Perceptual organization requires RP that changes network activity, so it’s possible only during conscious perception (7)",
    "Figure-ground segregation should be possible only during conscious perception (7)",
    "Perceptual grouping (integration) should be possible only during conscious perception (7)",
    "Some inference (like Kanizsa illusion) is possible only during conscious perception (7)",
    "Inhibiting RP in sensory areas should impair perceptual organization (7)",
    "NMDA receptors, which enable cortico-cortical feedback and synaptic plasticity, are needed for C (6)",
    "Recurrency creates conditions for Hebbian learning (2)",
    "NMDA receptors activation should be precondition for large-scale RP requiring C (6)",
    "Inhibiting large-scale RP by targeting NMDA receptors should result in loss of (state) C (6)",
    "Given a discrepancy between conscious perception and physical features of the stimulus, learning should occur for the former (2)",
    "Involvement of frontal areas (which are the neural basis of attention and reportability) is not necessary for C (3)",
    "Artificial and biological systems with recurrent architecture that enables learning and perceptual organization are conscious (6;8)",
    "Only consciously perceived stimuli are accompanied by RP and have lasting impact on the brain (2)",
    "Unconscious learning should be impossible (2)",
    "NCC should not involve the PFC (3)",
    "Stimuli in change blindness and inattentional blindness paradigms are consciously perceived (3)",
  ],
  GNW: [
    "GW operates as information bottleneck: entry is gated (3; 4)",
    "Attentional processes mobilize information and broadcast it into the GW (1)",
    "GW is needed to integrate between different modules and has the capacity to influence their activity (1)",
    "GW enables maintenance of percepts over time (1)",
    "Attentional gating selects the content of C among competing representations that are inhibited  (1)",
    "Inattentional blindness should occur (1)",
    "The GW can integrate only one state (e.g., percept, thought) at a time (9)",
    "T2-induced activation should be limited to a brief bottom-up activation in specialized processors and possibly also transiently in GW neurons (4)",
    "Information in modules/specialized brain areas outside of GW is encapsulated (1)",
    "Information outside GW is processed unconsciously by separate modules in parallel (1)",
    "Novel combinations of operations should require C (1)",
    "UC information should elicit local short-lived neural responses in specialized areas or in networks configured by GW activity (14)",
    "Long-axons pyramidal neurons between the GW and the modules allow global broadcasting of information (14)",
    "Long-range and feedback connections are needed for C because they maintain information in the GW by amplifying the signal (14)",
    "Neural representations of C percepts should show stability over time (1)",
    "Items in GW are items in Working Memory (14)",
    "UC responses to stimuli are short lived (1)",
    "No trace conditioning without C (8)",
    "No detection of global violations over time without C (6)",
    "No flexible mental chaining without C (7)",
    "C states should be underpinned by prolonged and deeper activation compared to UC states (14)",
    "Complexity measures should be higher for C states (14)",
    "Consciousness is accounted for in functional terms: subjective availability of information to a global workspace of input/output systems that breaks modularity (1)",
    "Mobilization of information into the GW is signalled by ignition (sudden, coherent, exclusive activation of subset of WS neurons) (3; 14)",
    "Top-down selection determines the contents of C (1; 14)",
    "While GW is occupied by competing content X or by spontaneous activity, content Y is less likely to be perceived (3; 4)",
    "Attentional blink should occur (3; 4)",
    "Late activation differentiates between C and UC processing (14)",
    "Activation in sensory areas should include two peaks, the timing of the second follows ignition in the PFC and should be affected by feedback disruption (4)",
    "Critical NCCs should be found during later time window (e.g., starting after 200 ms post stimulus presentation), depending on evidence accumulation (8; 14)",
    "Unless the content of C is actively maintained in WM, neural activity in the GW should go back to baseline after ignition (12; 15)",
    "Onset/Offset to tag appearance and disappearance of stimulus within C, if stimulus is attended (15)",
    "Frontoparietal area, held to be involved attentional processes and global exchange of info, should be one of the areas of implementation of GW (1)",
    "Long-range synchronization (gamma/beta) should signal information sharing between PFC and category-specific areas  (1; 14)",
    "Decoding of all contents of C should be possible from PFC (15)",
    "Competing activity in frontal areas prior to stimulus presentation lowers the chance of consciously perceiving the stimulus (4)",
    "Artificial and biological systems that have a functionally equivalent global workspace are conscious (13)",
    "C processes can be long-lived (1)",
    "GW can influence UC processes, which are not all fully automatic (1; 2)",
    "Top-down attention should be needed for subliminal effects (e.g., priming) elicited by weak stimuli (2; 5)",
    "Incoming information that fails to attain the critical threshold level for triggering the GW (‘failed ignition’) should not be C (11; 15)",
    "If strong stimuli involving resonant loops within medium range connections are unattended, they remain preconscious (5)",
    "Attention should be able to trigger C perception of a stimulus even after stimulus offset (possible decoupling of C and stimulus presentation) (10)",
    "AMPA receptors modulate feedforward  connections while NMDA receptors modulate feedback connectivity, making them necessary for C (16)",
  ],
  IIT: [
    "Similarity between Φ structures should map into similarity between experiences (8)",
    "Based on introspection, every experience is essentially intrinsic, specific, unitary, definite, and structured (1; 8)",
    "CONNECTIVITY: the connections between units of a PSC determine whether it can support high φ (8)",
    "Spatiotemporal grain that matters for consciousness is the one that maximizes φ (8)",
    "Functional (extrinsic) equivalence doesn’t entail phenomenal (intrinsic) equivalence (8)",
    "ACTIVITY: changes in the state of the PSC units determine changes in CES (and therefore in experience) (8)",
    "Entire PSC (not only task-relevant activity) supports CES (= experience) (1)",
    "All units in the PSC must have the potential to be active (1)",
    "Every distinction that is consciously experienced should be manifested in the CES for as long as it is experienced (8; 9)",
    "Lattices of specialized + integrated units are well-suited to achieve high φ (7)",
    "Spatial structure of experience should map into features specified by neurons organized in non-directed grid-like networks (6)",
    "PSC needs to be both specialized and integrated to achieve high φ (5)",
    "Changes in the strength of connections within PSC should be associated with changes in experience, even if neural activity does not change (8)",
    "Posterior cortex, which has the right architecture for high integration and specialization, is the likely candidate for NCC (4)",
    "Brain Complexity measures sensitive to specialization / integration should correlate with consciousness (5)",
    "Horizontal connections within topographically organized visual areas would be needed to experience visual space (6; 7)",
    "Inactive neurons can contribute to consciousness (1)",
    "Deactivating already inactive neurons of retinotopic cortex should remove part of spatial experience (11)",
    "Experience of “pure presence” should exhibit largely inactive posterior cortex (12)",
    "Expert meditators experiencing “pure presence” should exhibit decrease in gamma band, especially in posterior areas  (12)",
    "Network that corresponds to content of C should be actively maintained for the duration of that content in C (9)",
    "There should be content specific synchronization between high-level and low-level areas in the posterior cortex (9)",
    "Local strengthening or weakening of horizontal connections in topographic areas should lead to a local distortion of experienced visual space (11)",
    "Conscious perception overflows report (1; 13)",
    "All features of a consciously perceived stimulus should be maximally decodable from posterior areas (4; 9)",
    "Reduction of transmission in callosal fibres should lead to a point at which one consciousness splits in two. (Split brain) (1)",
    "Loss and recovery of consciousness should be associated with the breakdown and recovery of the capacity for information integration. (5)",
    "Across various possible spatiotemporal grains to study the brain, the one constitutive of consciousness should be the one achieving maximal φ (3)",
    "Artificial systems, even if functionally equivalent to human brains, won’t be conscious (no high Φ) (8)",
    "Similarity judgments between experiences should map onto similarity between CESs, as reconstructed from brain states (2)",
    "Operationally, the PSC must be a maximum of irreducible, specific, intrinsic c-e power, supporting a CES (1; 8)",
    "C is extremely rich (i.e., highly structured) (13)",
    "Type of experience (e.g., spatial vs temporal) should depend on the architecture of the substrate specifying the CES (1)",
    "Only distinctions with c-e powers compatible with the c-e powers of the whole PSC contribute to C (8)",
    "When c-e powers of neuronal populations are incongruent with c-e powers of the PSC, corresponding stimulus should remain unconscious (10)",
    "Temporal structure of experience should map into features specified by neurons organized in directed grids (14)",
    "Modulation of synaptic strength/ excitability of neurons in directed grids should change properties of phenomenal flow regardless of activity levels (14)",
    "Duration of the extended present should be proportional to the number of neurons constituting a directed grid (14)",
    "Artificial activation of neurons near the “then” terminus in a directed grid should result in perceiving a stimulus as having occurred earlier (14)",
  ],
  PRM: [
    "Given background conditions, a first-order state is conscious if it is indexed, via a pointer, by a higher-order state, as reliably reflecting the world as it is now (5; 8)",
    "HOS can incorrectly index the reliability of the FOS (5)",
    "Inner awareness should correlate with implicit metacognitive abilities (1)",
    "Function of C is formation of subjectively justified beliefs about the external world (i.e., monitoring reality) (1)",
    "Given the right paradigm, discrimination performance should be the same with and without conscious perception (1)",
    "In humans, PFC, held to be involved in metacognitive abilities, is required for higher-order states (1; 5)",
    "Consciousness requires higher-order cognitive states (5)",
    "Conscious states need to be accessed (no P-c without A-c) (4; 5)",
    "Indexing reliability of FOS incorrectly leads to inflation (1)",
    "Consciousness just appears rich, though it isn’t (4; 5)",
    "Inflation should be modulated by expectations: inflation is stronger when expectations are stronger (4)",
    "Increased tendency to make false alarms in detection tasks for stimuli presented peripherally (3)",
    "Metacognitive capacities to track task performance are reduced (3)",
    "Participants should report rich phenomenology while missing details of the percept (3)",
    "Perception doesn’t overflow report (4)",
    "Imagery vividness is modulated by whether the HOS labels an internally generated FOS as more similar to noise or to an external stimulus (1)",
    "A change in HOS should lead to a change in consciousness even if the FOS remains the same (5)",
    "Manipulating the PFC should induce confusion between perception and imagery (1)",
    "In humans, PFC is necessary for conscious perception (2; 5)",
    "Some targeted changes in the prefrontal (and parietal) areas should lead to changes in consciousness (1; 5)",
    "Visual hallucinations can occur if functions of PFC are disrupted (e.g., Schizophrenia, dopaminergic drugs, direct cortical stimulation) (1)",
    "Decodability of inflated perception should be high in later stages of the visual processing hierarchy, not in primary visual cortex (4)",
    "Top-down effects of expectations on inflation should be reflected by timecourses of decodability between frontoparietal and visual areas (4)",
    "TMS stimulation of PFC and lesions should impact subjective reports of consciousness (1; 5)",
    "Given background conditions, artificial and biological systems with FOS, higher-order mechanisms, and metacognitive abilities are conscious (6; 7)",
    "FOS represent the world, HOS track the reliability of FOS (1)",
    "If you are not aware of being in a mental state, then there’s nothing it is like for you to be in that mental state (1)",
    "Impairing the functioning of DLPFC (e.g., with TMS) should change subjective report about awareness without affecting task performance (1)",
    "Inner awareness must discriminate between neural activity due to external stimulus and noise (8)",
    "HOS relies on averages to track internal noise (8)",
    "Stimuli presented when neuronal excitability is high should lead to more false alarms and higher visibility/confidence ratings (8)",
    "The function of the pointer (i.e., inner awareness) is an implicit metacognitive ability (1)",
    "Inflation should be modulated by attention: when attention is reduced, participants should be more likely to say something is there when it is not (1; 4)",
    "System tracking reliability of sensory signal might not track updated baseline neuronal excitability (8)",
    "FOS drive task performance (1; 5)",
  ],
  other: [], // Empty array for other theory
};

// Function to check if a claim belongs to a theory
const isClaimFromTheory = (claim, theory) => {
  if (theory === "other") {
    return false; // 'other' theory claims are always considered new
  }
  return theoryClaims[theory]?.includes(claim) || false;
};

// Add these constants at the top of the file, before the App component
const GRID_SIZE = {
  HORIZONTAL_GAP: 50, // For fine movement control
  VERTICAL_GAP: 35, // For fine movement control
  SNAP_THRESHOLD: 15,

  // Increase vertical spacing while keeping horizontal the same
  INITIAL_HORIZONTAL_SPACING: 250, // Keep column spacing
  INITIAL_VERTICAL_SPACING: 130, // Increased from 110 to 130 for more row spacing
  BOXES_PER_COLUMN: 11, // Keep 10 boxes per column
};

const snapToGrid = (position) => {
  const row = Math.round(position.y / GRID_SIZE.VERTICAL_GAP);
  const col = Math.round(position.x / GRID_SIZE.HORIZONTAL_GAP);
  return {
    x: col * GRID_SIZE.HORIZONTAL_GAP,
    y: row * GRID_SIZE.VERTICAL_GAP,
  };
};

const calculateNetworkMetrics = (nodes, edges) => {
  // Identify connected nodes (nodes with at least one edge)
  const connectedNodeIds = new Set();
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  // Filter nodes to only include connected ones
  const connectedNodes = nodes.filter((node) => connectedNodeIds.has(node.id));
  const N = connectedNodes.length; // Total number of connected nodes

  if (N === 0) {
    return {
      nodeMetrics: {},
      globalMetrics: {
        networkSize: 0,
        edgeCount: 0,
      },
    };
  }

  // Create adjacency map for quick lookups
  const adjacencyMap = {};
  edges.forEach((edge) => {
    if (!adjacencyMap[edge.source]) adjacencyMap[edge.source] = [];
    adjacencyMap[edge.source].push(edge.target);
  });

  // Calculate PageRank
  const calculatePageRank = () => {
    const d = 0.85; // damping factor
    const epsilon = 1e-6;
    const maxIter = 100;
    let pagerank = {};

    // Initialize PageRank values for connected nodes only
    connectedNodes.forEach((node) => (pagerank[node.id] = 1 / N));

    // Get dangling nodes (nodes with no outgoing edges)
    const danglingNodes = connectedNodes
      .filter(
        (node) => !adjacencyMap[node.id] || adjacencyMap[node.id].length === 0
      )
      .map((node) => node.id);

    for (let iter = 0; iter < maxIter; iter++) {
      let newPagerank = {};
      let danglingSum = 0;

      danglingNodes.forEach((nodeId) => {
        danglingSum += pagerank[nodeId];
      });

      connectedNodes.forEach((node) => {
        let sum = 0;
        edges.forEach((edge) => {
          if (edge.target === node.id) {
            const sourceOutDegree = adjacencyMap[edge.source]?.length || 0;
            if (sourceOutDegree > 0) {
              sum += pagerank[edge.source] / sourceOutDegree;
            }
          }
        });

        newPagerank[node.id] = (1 - d) / N + d * (sum + danglingSum / N);
      });

      let diff = 0;
      connectedNodes.forEach((node) => {
        diff += Math.abs(newPagerank[node.id] - pagerank[node.id]);
      });

      pagerank = { ...newPagerank };

      if (diff < epsilon) break;
    }

    let totalRank = Object.values(pagerank).reduce((a, b) => a + b, 0);
    Object.keys(pagerank).forEach((nodeId) => {
      pagerank[nodeId] = pagerank[nodeId] / totalRank;
    });

    return pagerank;
  };

  // Calculate Harmonic Centrality (LRC)
  const calculateLRC = () => {
    const lrc = {};

    connectedNodes.forEach((node) => {
      const distances = {};
      const queue = [[node.id, 0]];
      const visited = new Set();

      while (queue.length > 0) {
        const [current, dist] = queue.shift();
        if (!visited.has(current)) {
          visited.add(current);
          distances[current] = dist;

          if (adjacencyMap[current]) {
            adjacencyMap[current].forEach((neighbor) => {
              if (!visited.has(neighbor)) {
                queue.push([neighbor, dist + 1]);
              }
            });
          }
        }
      }

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

  // Calculate LRC (Local Reaching Centrality)
  const calculateLRC_NX = () => {
    const lrc_nx = {};

    connectedNodes.forEach((node) => {
      let reachable = 0;
      const visited = new Set();
      const queue = [node.id];

      while (queue.length > 0) {
        const current = queue.shift();
        if (!visited.has(current)) {
          visited.add(current);
          if (current !== node.id) reachable++;

          if (adjacencyMap[current]) {
            adjacencyMap[current].forEach((neighbor) => {
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
    connectedNodes.forEach((node) => (betweenness[node.id] = 0));

    connectedNodes.forEach((source) => {
      const stack = [];
      const predecessors = {};
      const sigma = {};
      const distance = {};
      const delta = {};

      connectedNodes.forEach((node) => {
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
          adjacencyMap[v].forEach((w) => {
            if (distance[w] < 0) {
              queue.push(w);
              distance[w] = distance[v] + 1;
            }
            if (distance[w] === distance[v] + 1) {
              sigma[w] += sigma[v];
              predecessors[w].push(v);
            }
          });
        }
      }

      while (stack.length > 0) {
        const w = stack.pop();
        predecessors[w].forEach((v) => {
          delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]);
        });
        if (w !== source.id) {
          betweenness[w] += delta[w];
        }
      }
    });

    const scale = (N - 1) * (N - 2);
    if (scale > 0) {
      connectedNodes.forEach((node) => {
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

  // Initialize metrics for all nodes
  const nodeMetrics = {};
  nodes.forEach((node) => {
    if (connectedNodeIds.has(node.id)) {
      nodeMetrics[node.id] = {
        PageRank: pagerank[node.id],
        LRC: lrc[node.id],
        LRC_NX: lrc_nx[node.id],
        "Betweenness Centrality": betweenness[node.id],
      };
    } else {
      // For unconnected nodes, set metrics to 0
      nodeMetrics[node.id] = {
        PageRank: 0,
        LRC: 0,
        LRC_NX: 0,
        "Betweenness Centrality": 0,
      };
    }
  });

  return {
    nodeMetrics,
    globalMetrics: {
      networkSize: N,
      edgeCount: edges.length,
    },
  };
};

export default function App() {
  const [selectedTheory, setSelectedTheory] = useState(() => {
    const stored = localStorage.getItem("selectedTheory");
    return stored && ["RPT", "GNW", "IIT", "PRM", "other"].includes(stored)
      ? stored
      : "RPT";
  });

  // Move getInitialNodes inside the component
  const getInitialNodes = useCallback((theory) => {
    if (!theory || !theoryClaims[theory]) {
      console.error("Invalid theory selected:", theory);
      return [];
    }

    if (theory === "other") {
      return [
        {
          id: "other-1",
          type: "custom",
          data: {
            label: "Double click to edit",
            colors: ["#ffffff"],
            theory: "other",
          },
          position: {
            x: GRID_SIZE.INITIAL_HORIZONTAL_SPACING,
            y: GRID_SIZE.INITIAL_VERTICAL_SPACING,
          },
        },
      ];
    }

    return theoryClaims[theory].map((text, i) => {
      const column = Math.floor(i / GRID_SIZE.BOXES_PER_COLUMN);
      const row = i % GRID_SIZE.BOXES_PER_COLUMN;
      return {
        id: `${theory}-${i + 1}`,
        type: "custom",
        data: {
          label: text,
          colors: ["#ffffff"],
          theory: theory,
        },
        position: {
          x: column * GRID_SIZE.INITIAL_HORIZONTAL_SPACING,
          y: row * GRID_SIZE.INITIAL_VERTICAL_SPACING,
        },
      };
    });
  }, []);

  const [theoryNetworks, setTheoryNetworks] = useState(() => {
    try {
      const storedNetworks = localStorage.getItem("theoryNetworks");
      if (storedNetworks) {
        const parsed = JSON.parse(storedNetworks);
        const theories = ["RPT", "GNW", "IIT", "PRM", "other"];
        const validatedNetworks = {};

        theories.forEach((theory) => {
          if (theory === "other") {
            // For 'other' theory, always use default nodes on initial load
            validatedNetworks.other = {
              nodes: getInitialNodes("other"),
              edges: [],
            };
          } else {
            // For standard theories, check if stored network exists and has valid nodes
            if (
              parsed[theory]?.nodes?.length > 0 &&
              parsed[theory].nodes.every((node) => node.data?.theory === theory)
            ) {
              validatedNetworks[theory] = parsed[theory];
            } else {
              validatedNetworks[theory] = {
                nodes: getInitialNodes(theory),
                edges: [],
              };
            }
          }
        });

        return validatedNetworks;
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }

    // Return default state if nothing in localStorage
    return {
      RPT: { nodes: getInitialNodes("RPT"), edges: [] },
      GNW: { nodes: getInitialNodes("GNW"), edges: [] },
      IIT: { nodes: getInitialNodes("IIT"), edges: [] },
      PRM: { nodes: getInitialNodes("PRM"), edges: [] },
      other: { nodes: getInitialNodes("other"), edges: [] },
    };
  });

  // Initialize nodes and edges with the selected theory's network
  const [nodes, setNodes, onNodesChange] = useNodesState(() => {
    const network = theoryNetworks[selectedTheory];
    return network?.nodes || [];
  });

  const [edges, setEdges, onEdgesChange] = useEdgesState(() => {
    const network = theoryNetworks[selectedTheory];
    return network?.edges || [];
  });

  const [selectedMetric, setSelectedMetric] = useState("None");
  const [showMetrics, setShowMetrics] = useState(false);
  const [networkMetrics, setNetworkMetrics] = useState(null);
  const [copiedColors, setCopiedColors] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const CustomNode = ({
    id,
    data,
    selected,
    copiedColors,
    setCopiedColors,
  }) => {
    const [colors, setColors] = useState(data.colors || ["#ffffff"]);
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data.label);

    useEffect(() => {
      setColors(data.colors || ["#ffffff"]);
    }, [data.colors]);

    const onChangeColor = (index, newColor) => {
      const newColors = [...colors];
      newColors[index] = newColor;
      setColors(newColors);
      window.updateNodeColors(id, newColors);
    };

    const addColor = () => {
      if (colors.length < 4) {
        const newColors = [...colors, "#ffffff"];
        setColors(newColors);
        window.updateNodeColors(id, newColors);
      }
    };

    const removeColor = (index) => {
      if (colors.length > 1) {
        const newColors = colors.filter((_, i) => i !== index);
        setColors(newColors);
        window.updateNodeColors(id, newColors);
      }
    };

    const copyColors = () => {
      setCopiedColors([...colors]);
    };

    const pasteColors = () => {
      if (copiedColors) {
        setColors([...copiedColors]);
        window.updateNodeColors(id, copiedColors);
      }
    };

    // Create gradient background style
    const gradientStyle = {
      background:
        colors.length > 1
          ? `linear-gradient(45deg, ${colors.join(", ")})`
          : colors[0],
    };

    // Remove the isNewBox logic - all boxes will look the same

    // Add metric circle if metrics data exists AND a metric is selected (not "None")
    const metricCircle =
      data.metrics && data.selectedMetric && data.selectedMetric !== "None" ? (
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            backgroundColor: (() => {
              const metricValue = data.metrics[data.selectedMetric];
              const range = data.metricRange;
              if (range && range.min !== range.max) {
                // Normalize the value to 0-1 range based on actual min/max
                const normalizedValue =
                  (metricValue - range.min) / (range.max - range.min);
                const blueIntensity = Math.floor(150 + normalizedValue * 100);
                return `rgb(0, ${blueIntensity}, 255)`;
              } else {
                // Fallback to original calculation if no range or all values are the same
                return `rgb(0, ${Math.floor(150 + metricValue * 100)}, 255)`;
              }
            })(),
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            border: "3px solid white",
            boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
            zIndex: 10,
          }}
        >
          {data.metrics[data.selectedMetric].toFixed(2)}
        </div>
      ) : null;

    // Define handle positions
    const handles = [
      // Top handles
      { id: "top-left", position: Position.Top, style: { left: "25%" } },
      { id: "top-center", position: Position.Top, style: { left: "50%" } },
      { id: "top-right", position: Position.Top, style: { left: "75%" } },

      // Bottom handles
      { id: "bottom-left", position: Position.Bottom, style: { left: "25%" } },
      {
        id: "bottom-center",
        position: Position.Bottom,
        style: { left: "50%" },
      },
      { id: "bottom-right", position: Position.Bottom, style: { left: "75%" } },

      // Side handles
      { id: "left", position: Position.Left, style: { top: "50%" } },
      { id: "right", position: Position.Right, style: { top: "50%" } },
    ];

    return (
      <div
        style={{
          border: "2px solid #333",
          borderRadius: 8,
          padding: "2px 8px",
          ...gradientStyle,
          width: 220,
          minHeight: 100,
          fontSize: 12,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          fontFamily: "Calibri, sans-serif",
        }}
        onDoubleClick={() => setIsEditing(true)}
      >
        {metricCircle}
        {handles.map((handle) => (
          <Handle
            key={handle.id}
            id={handle.id}
            type="source"
            position={handle.position}
            isConnectable={true}
            style={{
              background: "#666",
              width: "8px",
              height: "8px",
              border: "2px solid #fff",
              ...handle.style,
            }}
          />
        ))}
        {isEditing ? (
          <textarea
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              window.updateNodeLabel(id, label);
            }}
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
            }}
            className="nodrag"
          />
        ) : (
          <div
            style={{
              fontSize: "12px",
              fontFamily: "Calibri, sans-serif",
              fontWeight: "normal",
            }}
          >
            {label}
          </div>
        )}
        {selected && (
          <div style={{ marginTop: 6 }} className="nodrag">
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onChangeColor(index, e.target.value)}
                  style={{ marginRight: 4 }}
                />
                {colors.length > 1 && (
                  <button
                    onClick={() => removeColor(index)}
                    style={{
                      padding: "2px 6px",
                      fontSize: "10px",
                      marginLeft: 4,
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
              {colors.length < 4 && (
                <button
                  onClick={addColor}
                  style={{
                    padding: "2px 6px",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                >
                  + Add Color
                </button>
              )}
              <button
                onClick={copyColors}
                style={{
                  padding: "2px 6px",
                  fontSize: "10px",
                  cursor: "pointer",
                }}
              >
                Copy Colors
              </button>
              {copiedColors && (
                <button
                  onClick={pasteColors}
                  style={{
                    padding: "2px 6px",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                >
                  Paste Colors
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const nodeTypes = useMemo(
    () => ({
      custom: (props) => (
        <CustomNode
          {...props}
          copiedColors={copiedColors}
          setCopiedColors={setCopiedColors}
        />
      ),
    }),
    [copiedColors]
  );

  // Load the selected theory's network
  useEffect(() => {
    const network = theoryNetworks[selectedTheory];
    if (network?.nodes) {
      // Ensure nodes have correct theory assigned
      const updatedNodes = network.nodes.map((node) => ({
        ...node,
        data: { ...node.data, theory: selectedTheory },
      }));
      setNodes(updatedNodes);
      setEdges(network.edges || []);
    }
  }, [selectedTheory]);

  // Save changes back to the theory networks
  useEffect(() => {
    if (selectedTheory && nodes.length > 0) {
      setTheoryNetworks((prev) => ({
        ...prev,
        [selectedTheory]: {
          nodes: [...nodes],
          edges: [...edges],
        },
      }));
    }
  }, [nodes, edges, selectedTheory]);

  // Save to localStorage with debounce
  useEffect(() => {
    const saveToStorage = () => {
      try {
        localStorage.setItem("theoryNetworks", JSON.stringify(theoryNetworks));
        localStorage.setItem("selectedTheory", selectedTheory);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    };

    const timeoutId = setTimeout(saveToStorage, 1000);
    return () => clearTimeout(timeoutId);
  }, [theoryNetworks, selectedTheory]);

  // Update window functions for node manipulation
  useEffect(() => {
    window.updateNodeColors = (id, newColors) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id
            ? {
                ...n,
                data: {
                  ...n.data,
                  colors: newColors,
                },
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
                  label: newLabel,
                },
              }
            : n
        )
      );
    };
  }, [setNodes]);

  // Add this new useEffect to handle metric selection changes
  useEffect(() => {
    if (networkMetrics && nodes.length > 0) {
      // Calculate min and max values for the selected metric
      const metricValues = Object.values(networkMetrics.nodeMetrics)
        .map((nodeMetrics) => nodeMetrics[selectedMetric])
        .filter((value) => value !== undefined && !isNaN(value));

      const minValue = Math.min(...metricValues);
      const maxValue = Math.max(...metricValues);

      const updatedNodes = nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          metrics: networkMetrics.nodeMetrics[node.id],
          selectedMetric: selectedMetric,
          metricRange: { min: minValue, max: maxValue },
        },
      }));
      setNodes(updatedNodes);
    }
  }, [selectedMetric]); // This effect runs when selectedMetric changes

  const changeTheory = (theory) => {
    if (theory !== selectedTheory) {
      // Save current state before switching
      setTheoryNetworks((prev) => ({
        ...prev,
        [selectedTheory]: {
          nodes: nodes.map((node) => ({
            ...node,
            data: { ...node.data, theory: selectedTheory },
          })),
          edges: edges,
        },
      }));

      // Switch theory and ensure proper initialization
      if (theory === "other") {
        // For 'other' theory, always ensure we have the default nodes
        const otherNodes =
          theoryNetworks.other?.nodes?.length > 0
            ? theoryNetworks.other.nodes
            : getInitialNodes("other");

        setNodes(otherNodes);
        setEdges(theoryNetworks.other?.edges || []);
      } else {
        // For standard theories, use stored or initial nodes
        const network = theoryNetworks[theory];
        if (network?.nodes?.length > 0) {
          setNodes(network.nodes);
          setEdges(network.edges || []);
        } else {
          setNodes(getInitialNodes(theory));
          setEdges([]);
        }
      }

      setSelectedTheory(theory);
    }
  };

  const resetLayout = () => {
    // Get initial node positions
    const initialNodes = getInitialNodes(selectedTheory);

    // Map current nodes to preserve their properties, but reset colors to white and clear metrics
    const preservedNodes = nodes.map((existingNode) => {
      // Find the corresponding initial node position
      const initialNode = initialNodes.find((n) => n.id === existingNode.id);

      if (initialNode) {
        // For theory nodes, reset color to white and reset position
        return {
          ...existingNode,
          position: initialNode.position,
          data: {
            ...existingNode.data,
            colors: ["#ffffff"],
            metrics: null,
            selectedMetric: null,
          },
        };
      }

      // For custom nodes, keep them at their current position but reset colors
      return {
        ...existingNode,
        data: {
          ...existingNode.data,
          colors: ["#ffffff"],
          metrics: null,
          selectedMetric: null,
        },
      };
    });

    setNodes(preservedNodes);
    setEdges([]);
    setShowMetrics(false);

    // Update the current theory's network state
    setTheoryNetworks((prev) => ({
      ...prev,
      [selectedTheory]: {
        nodes: preservedNodes,
        edges: [],
      },
    }));

    // Update localStorage
    try {
      localStorage.setItem(
        "theoryNetworks",
        JSON.stringify({
          ...theoryNetworks,
          [selectedTheory]: {
            nodes: preservedNodes,
            edges: [],
          },
        })
      );
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const addNewBox = () => {
    const newId = `${selectedTheory}-custom-${Date.now()}`;
    const newNode = {
      id: newId,
      type: "custom",
      data: {
        label: "Double click to edit",
        colors: ["#ffffff"],
        theory: selectedTheory,
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
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      if (sourceNode?.data.theory !== targetNode?.data.theory) {
        console.warn("Cannot connect nodes from different theories");
        return;
      }

      const connection = {
        ...params,
        type: "smoothstep",
        animated: false,
        style: {
          stroke: "#2a2a2a",
          strokeWidth: 3.5,
          opacity: 0.9,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 15,
          height: 15,
          color: "#2a2a2a",
        },
      };
      setEdges((eds) => addEdge(connection, eds));
    },
    [nodes, setEdges]
  );

  const exportNetwork = () => {
    const currentNetwork = theoryNetworks[selectedTheory];

    // Clean up nodes before export by removing metrics data
    const cleanedNodes = currentNetwork.nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        metrics: null,
        selectedMetric: null,
        color: node.data.color || "#ffffff",
        colors: node.data.colors || ["#ffffff"],
        theory: selectedTheory,
      },
    }));

    const data = JSON.stringify(
      {
        theory: selectedTheory,
        nodes: cleanedNodes,
        edges: currentNetwork.edges,
        exportDate: new Date().toISOString(),
        version: "1.0",
      },
      null,
      2
    );

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTheory}_network_${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importNetwork = (event) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedData = JSON.parse(e.target.result);

            // Validate imported data
            if (
              !importedData.theory ||
              !importedData.nodes ||
              !importedData.edges
            ) {
              alert("Invalid map file format");
              return;
            }

            // Process nodes to ensure all data is properly structured
            const processedNodes = importedData.nodes.map((node) => {
              // Clear any existing metrics data
              return {
                ...node,
                data: {
                  ...node.data,
                  color: node.data.color || "#ffffff",
                  colors: node.data.colors || ["#ffffff"],
                  theory: importedData.theory,
                  label: node.data.label || "",
                  metrics: null,
                  selectedMetric: null,
                },
              };
            });

            // Switch to the imported theory
            setSelectedTheory(importedData.theory);

            // Update current view with processed nodes
            setNodes(processedNodes);
            setEdges(importedData.edges);
            setShowMetrics(false);
            setNetworkMetrics(null);

            // Update theory networks state
            setTheoryNetworks((prev) => ({
              ...prev,
              [importedData.theory]: {
                nodes: processedNodes,
                edges: importedData.edges,
              },
            }));

            // Update localStorage
            localStorage.setItem(
              "theoryNetworks",
              JSON.stringify({
                ...theoryNetworks,
                [importedData.theory]: {
                  nodes: processedNodes,
                  edges: importedData.edges,
                },
              })
            );
            localStorage.setItem("selectedTheory", importedData.theory);
          } catch (error) {
            console.error("Error importing map:", error);
            alert("Error importing map. Please check the file format.");
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

    // Update nodes to include metrics data but don't show any metric by default
    const newNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        metrics: metrics.nodeMetrics[node.id],
        selectedMetric: "None", // Set to None by default
        metricRange: null, // Will be set when a metric is selected
      },
    }));

    setNodes(newNodes);
    setShowMetrics(true);
  };

  const exportAsPNG = () => {
    if (!reactFlowInstance) return;

    // Hide the minimap and controls before export
    setShowMiniMap(false);
    setShowControls(false);

    // Get all nodes to calculate the content bounds
    const nodes = reactFlowInstance.getNodes();
    if (!nodes.length) {
      setShowMiniMap(true);
      setShowControls(true);
      return;
    }

    // Calculate the bounds of all nodes
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    nodes.forEach((node) => {
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + 250);
      maxY = Math.max(maxY, node.position.y + 150);
    });

    // Add padding
    const padding = 50;
    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;

    // Calculate dimensions
    const width = maxX - minX;
    const height = maxY - minY;

    // Fit view to include all nodes
    reactFlowInstance.setViewport({
      x: -minX,
      y: -minY,
      zoom: 1,
    });

    // Small delay to ensure components are hidden
    setTimeout(() => {
      // Load dom-to-image from CDN
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js";
      script.onload = () => {
        const reactFlowElement = document.querySelector(".react-flow");
        if (!reactFlowElement) {
          setShowMiniMap(true);
          setShowControls(true);
          return;
        }

        // Hide ReactFlow attribution before capture
        const attribution = reactFlowElement.querySelector(
          ".react-flow__attribution"
        );
        if (attribution) {
          attribution.style.display = "none";
        }

        const scale = 2;
        const param = {
          height: height * scale,
          width: width * scale,
          quality: 1,
          style: {
            transform: "scale(" + scale + ")",
            transformOrigin: "top left",
            width: width + "px",
            height: height + "px",
            backgroundColor: "white",
          },
        };

        window.domtoimage
          .toPng(reactFlowElement, param)
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `${selectedTheory}_map_${
              new Date().toISOString().split("T")[0]
            }.png`;
            link.href = dataUrl;
            link.click();

            // Reset viewport and show components after small delay
            setTimeout(() => {
              reactFlowInstance.fitView({ padding: 0.2 });
              setShowMiniMap(true);
              setShowControls(true);
              // Show attribution again
              if (attribution) {
                attribution.style.display = "";
              }
            }, 100);
          })
          .catch((error) => {
            console.error("Error capturing image:", error);
            // Reset viewport and show components even if there's an error
            reactFlowInstance.fitView({ padding: 0.2 });
            setShowMiniMap(true);
            setShowControls(true);
            // Show attribution again
            if (attribution) {
              attribution.style.display = "";
            }
          });
      };
      document.body.appendChild(script);
    }, 100);
  };

  // Modify the MetricsPanel component
  const MetricsPanel = () => {
    if (!showMetrics || !networkMetrics) return null;

    return (
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 10,
          zIndex: 10,
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "6px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          maxWidth: "250px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
          Network Metrics
        </h3>
        <select
          value={selectedMetric}
          onChange={(e) => {
            setSelectedMetric(e.target.value);
            // Update nodes to show/hide metrics
            const newNodes = nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                metrics: networkMetrics.nodeMetrics[node.id],
                selectedMetric: e.target.value,
              },
            }));
            setNodes(newNodes);
          }}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "4px",
            fontSize: "12px",
          }}
        >
          <option value="None">None</option>
          <option value="LRC_NX">LRC</option>
          <option value="LRC">Harmonic Centrality</option>
          <option value="Betweenness Centrality">Betweenness Centrality</option>
          <option value="PageRank">PageRank</option>
        </select>
        <div style={{ fontSize: "12px" }}>
          <p>
            <strong>Nodes:</strong> {networkMetrics.globalMetrics.networkSize}
          </p>
          <p>
            <strong>Edges:</strong> {networkMetrics.globalMetrics.edgeCount}
          </p>
        </div>
        <button
          onClick={() => {
            setShowMetrics(false);
            // Don't reset the metrics when closing
          }}
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    );
  };

  // Custom node change handler with grid snapping
  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);

      // After the default node changes are applied, handle grid snapping
      changes.forEach((change) => {
        if (change.type === "position" && change.dragging === false) {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === change.id) {
                // Snap the node to the nearest grid position
                const snappedPosition = snapToGrid(node.position);
                return {
                  ...node,
                  position: snappedPosition,
                };
              }
              return node;
            })
          );
        }
      });
    },
    [onNodesChange, setNodes]
  );

  // Add visual grid helper
  const CustomBackground = () => (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      <svg
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <pattern
            id="grid"
            width={GRID_SIZE.HORIZONTAL_GAP}
            height={GRID_SIZE.VERTICAL_GAP}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={GRID_SIZE.HORIZONTAL_GAP}
              height={GRID_SIZE.VERTICAL_GAP}
              fill="none"
              stroke="#ddd"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5" // Increased from 0.3 to 0.5 for better visibility
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );

  // Shared button style for sidebar
  const sidebarButtonStyle = {
    padding: "8px 12px",
    fontSize: "12px",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "6px",
    width: "100%",
    textAlign: "center",
    transition: "all 0.2s ease",
  };

  const handleButtonHover = (e, isHovering) => {
    e.target.style.backgroundColor = isHovering ? "rgba(0,0,0,0.04)" : "transparent";
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlowProvider>



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
            <option value="PRM">PRM</option>
            <option value="other">other</option>
          </select>
        </div>

        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            backgroundColor: "white",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "140px",
          }}
        >
          <img
            src="/lab_logo.png"
            alt="Lab Logo"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              marginBottom: "4px",
            }}
          />
          <button
            onClick={addNewBox}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            style={sidebarButtonStyle}
          >
            Add New Claim
          </button>
          <button
            onClick={resetLayout}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            style={sidebarButtonStyle}
          >
            Reset Layout
          </button>
          <button
            onClick={exportNetwork}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            style={sidebarButtonStyle}
          >
            Download
          </button>
          <button
            onClick={importNetwork}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            style={sidebarButtonStyle}
          >
            Load Map
          </button>
          <button
            onClick={analyzeNetwork}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            style={sidebarButtonStyle}
          >
            Analyze
          </button>
          <button
            onClick={exportAsPNG}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            style={sidebarButtonStyle}
          >
            Save as PNG
          </button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          fitView
          nodeTypes={nodeTypes}
          connectionMode="loose"
          connectOnClick={true}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: {
              strokeWidth: 3.5,
              stroke: "#2a2a2a",
              opacity: 0.9,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 30,
              height: 30,
              color: "#2a2a2a",
            },
          }}
          snapToGrid={true}
          snapGrid={[GRID_SIZE.HORIZONTAL_GAP, GRID_SIZE.VERTICAL_GAP]}
          proOptions={{ hideAttribution: true }}
        >
          <CustomBackground />
          {showMiniMap && (
            <MiniMap
              nodeColor={(node) => {
                return node.data?.colors?.[0] || "#ffffff";
              }}
              maskColor="rgba(255, 255, 255, 0.8)"
              style={{
                backgroundColor: "#f8f8f8",
                border: "1px solid #ddd",
              }}
            />
          )}
          {showControls && (
            <Controls
              style={{
                button: {
                  backgroundColor: "#ffffff",
                  border: "1px solid #ddd",
                  color: "#333",
                },
                buttonActive: {
                  backgroundColor: "#f0f0f0",
                },
              }}
            />
          )}
          <Background color="#aaa" gap={16} />
        </ReactFlow>

        <MetricsPanel />
      </ReactFlowProvider>
    </div>
  );
}
