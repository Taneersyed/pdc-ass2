import React from 'react';

const MeshGrid = ({ p, q, nodes, animationStage }) => {
  const rootP = Math.floor(Math.sqrt(p));
  
  const getStageLabel = () => {
    switch (animationStage) {
      case 0: return 'Initial State';
      case 1: return 'After Stage 1 (Row Shift)';
      case 2: return 'Final State (After Column Shift)';
      default: return 'Running...';
    }
  };

  return (
    <div className="mesh-container">
      <div className="status-badge">{getStageLabel()}</div>
      
      <div 
        className="mesh-grid" 
        style={{ 
          gridTemplateColumns: `repeat(${rootP}, 1fr)`,
          width: `${rootP * 66}px`
        }}
      >
        {nodes.map((node) => (
          <div 
            key={node.id} 
            className={`mesh-node ${animationStage > 0 && String(node.id) !== String(node.data) ? 'highlighted' : ''}`}
          >
            <span className="node-id">n{node.id}</span>
            <span className="node-data">{node.data}</span>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>Nodes: {p} ( {rootP} × {rootP} ) | Shift: {q}</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          Data values reflect current routing state. Highlighted nodes indicate data out of original place.
        </p>
      </div>
    </div>
  );
};

export default MeshGrid;
