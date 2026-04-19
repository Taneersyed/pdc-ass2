import React from 'react';

const ComplexityPanel = ({ stats }) => {
  if (!stats) return null;

  const { ringSteps, meshSteps, rowShiftAmount, colShiftAmount } = stats;

  // For visual chart scaling
  const maxSteps = Math.max(ringSteps, meshSteps, 1);
  const meshHeight = `${(meshSteps / maxSteps) * 100}%`;
  const ringHeight = `${(ringSteps / maxSteps) * 100}%`;

  return (
    <div className="panel">
      <h2>Complexity Analysis</h2>
      
      <div className="stat-row">
        <span className="stat-label">Row Shift Amount</span>
        <span className="stat-value">{rowShiftAmount} steps</span>
      </div>
      
      <div className="stat-row">
        <span className="stat-label">Col Shift Amount</span>
        <span className="stat-value">{colShiftAmount} steps</span>
      </div>
      
      <div className="stat-row">
        <span className="stat-label">Total Comm Steps</span>
        <span className="stat-value highlight">{meshSteps} steps</span>
      </div>

      <div className="chart-container">
        <div className="chart-bar-group">
          <div className="chart-bar ring" style={{ height: ringHeight }}>
            <span className="chart-value">{ringSteps}</span>
          </div>
          <span className="chart-label">Ring<br/>Steps</span>
        </div>
        
        <div className="chart-bar-group">
          <div className="chart-bar mesh" style={{ height: meshHeight }}>
            <span className="chart-value">{meshSteps}</span>
          </div>
          <span className="chart-label">Mesh<br/>Steps</span>
        </div>
      </div>
      
      <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <strong>Formulas:</strong><br/>
        Ring = min(q, p-q)<br/>
        Mesh = (q mod √p) + ⌊q / √p⌋
      </p>
      <p style={{ marginTop: '0.8rem', fontSize: '0.8rem', color: 'var(--accent)' }}>
        Notice how Mesh utilizes 2D routing to significantly cut down routing distances compared to a flat ring.
      </p>
    </div>
  );
};

export default ComplexityPanel;
