import math
import networkx as nx
import matplotlib.pyplot as plt
import time

class Node:
    def __init__(self, id, p):
        self.id = id
        # Each node starts with messages for everyone else
        self.messages = {j: f"msg_{id}_to_{j}" for j in range(p) if j != id}

def draw_network(G, pos, packets, title, step):
    plt.clf()
    plt.title(f"{title} - Step {step}")
    
    # Draw nodes
    nx.draw_networkx_nodes(G, pos, node_color='lightblue', node_size=500)
    nx.draw_networkx_labels(G, pos)
    nx.draw_networkx_edges(G, pos, edge_color='gray')
    
    # Draw packets (simplistic representation as colored dots on edges or near nodes)
    # Packets is a list of tuples: (source, target)
    for src, tgt in packets:
        # Interpolate a point between src and tgt
        x0, y0 = pos[src]
        x1, y1 = pos[tgt]
        px = x0 * 0.2 + x1 * 0.8
        py = y0 * 0.2 + y1 * 0.8
        plt.plot(px, py, 'ro', markersize=8)

    plt.pause(0.5)

def simulate_ring(p):
    G = nx.cycle_graph(p)
    pos = nx.circular_layout(G)
    nodes = {i: Node(i, p) for i in range(p)}
    
    plt.figure("Ring Topology All-to-All")
    plt.ion()
    
    steps = p - 1
    for step in range(1, p):
        packets = []
        new_state = {i: {} for i in range(p)}
        
        # Each node i sends message for (i+step)%p to its right neighbor (i+1)%p
        for i in range(p):
            target = (i + step) % p
            neighbor = (i + 1) % p
            if target in nodes[i].messages:
                # In a real shift, it passes through neighbors. 
                # This simulates the pipeline step where packets shift
                packets.append((i, neighbor))
        
        draw_network(G, pos, packets, "Ring Topology", step)
    
    plt.ioff()
    plt.close()
    return steps

def simulate_mesh(p):
    side = int(math.sqrt(p))
    G = nx.grid_2d_graph(side, side)
    pos = dict((n, n) for n in G.nodes())
    
    # Map 1D idi to 2D (r,c)
    def to_2d(i): return (i // side, i % side)
    
    plt.figure("Mesh Topology All-to-All")
    plt.ion()
    
    # Phase 1: Row sweep (side - 1 steps)
    for step in range(1, side):
        packets = []
        for r in range(side):
            for c in range(side):
                neighbor = (r, (c + 1) % side)
                packets.append(((r,c), neighbor))
        draw_network(G, pos, packets, "Mesh - Phase 1 (Row Sweep)", step)
        
    # Phase 2: Column sweep (side - 1 steps)
    for step in range(1, side):
        packets = []
        for c in range(side):
            for r in range(side):
                neighbor = ((r + 1) % side, c)
                packets.append(((r,c), neighbor))
        draw_network(G, pos, packets, "Mesh - Phase 2 (Column Sweep)", step)

    plt.ioff()
    plt.close()
    return 2 * (side - 1)

def simulate_hypercube(p):
    d = int(math.log2(p))
    G = nx.hypercube_graph(d)
    pos = nx.spring_layout(G)
    
    plt.figure("Hypercube Topology All-to-All")
    plt.ion()
    
    for step in range(d):
        packets = []
        for node in G.nodes():
            # Flip the step-th bit
            neighbor = list(node)
            neighbor[step] = 1 - neighbor[step]
            packets.append((node, tuple(neighbor)))
            
        draw_network(G, pos, packets, f"Hypercube - Dimension {step} Exchange", step+1)
        
    plt.ioff()
    plt.close()
    return d

def main():
    p = 16 # Must be power of 2 and perfect square for mesh (e.g. 16)
    
    print("Simulating Ring topology...")
    ring_steps = simulate_ring(p)
    
    print("Simulating Mesh topology...")
    mesh_steps = simulate_mesh(p)
    
    print("Simulating Hypercube topology...")
    hc_steps = simulate_hypercube(p)
    
    # Summary Table
    print("\n--- Summary Table ---")
    print(f"Topology\tSteps Counted\tComplexity Logic\tWhy?")
    print(f"RING\t\t{ring_steps}\t\tLinear\t\t\tSimple but slow for many nodes.")
    print(f"MESH\t\t{mesh_steps}\t\tSquare Root\t\tSplits work into rows/columns.")
    print(f"HYPERCUBE\t{hc_steps}\t\tLogarithmic\t\tFastest steps, but high traffic.")
    
    # Bar Chart
    topologies = ['Ring', 'Mesh', 'Hypercube']
    steps = [ring_steps, mesh_steps, hc_steps]
    
    plt.figure("Performance Comparison")
    plt.bar(topologies, steps, color=['blue', 'green', 'orange'])
    plt.ylabel("Number of Communication Steps")
    plt.title(f"All-to-All Steps Comparison (p={p})")
    plt.show()

if __name__ == "__main__":
    main()
