import React from 'react';

const ControlPanel = ({ 
  pInput, setPInput, 
  qInput, setQInput, 
  onApply, 
  animationStage, 
  onStepNext, 
  onReset 
}) => {
  return (
    <div className="panel">
      <h2>Simulation Controls</h2>
      
      <div className="control-group">
        <label>Node Count (p): Perfect Square 4-64</label>
        <input 
          type="number" 
          min="4" 
          max="64" 
          value={pInput}
          onChange={(e) => setPInput(e.target.value)}
        />
      </div>

      <div className="control-group">
        <label>Shift Amount (q): 1 to p-1</label>
        <input 
          type="number" 
          min="1" 
          max={pInput - 1} 
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
        />
      </div>

      <button className="btn-primary" onClick={onApply}>
        Apply & Reset
      </button>

      <div className="btn-group">
        <button 
          className="btn-primary" 
          onClick={onStepNext}
          disabled={animationStage >= 2}
          style={{ backgroundColor: animationStage >= 2 ? 'var(--border)' : 'var(--accent)' }}
        >
          {animationStage === 0 ? 'Start Stage 1' : animationStage === 1 ? 'Start Stage 2' : 'Completed'}
        </button>
        
        <button 
          className="btn-primary" 
          onClick={onReset}
          style={{ backgroundColor: 'var(--border)' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
