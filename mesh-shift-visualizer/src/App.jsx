import React, { useState, useEffect } from 'react';
import MeshGrid from './components/MeshGrid';
import ControlPanel from './components/ControlPanel';
import ComplexityPanel from './components/ComplexityPanel';
import { calculateComplexity, generateMeshStates } from './utils/shiftLogic';
import './index.css';

function App() {
  const [pInput, setPInput] = useState(16);
  const [qInput, setQInput] = useState(5);
  
  const [p, setP] = useState(16);
  const [q, setQ] = useState(5);
  
  const [animationStage, setAnimationStage] = useState(0); // 0: Init, 1: Row, 2: Col
  const [states, setStates] = useState(null);
  const [stats, setStats] = useState(null);
  const [currentNodes, setCurrentNodes] = useState([]);

  // Initialize and validate on Apply
  const handleApply = () => {
    let newP = parseInt(pInput, 10);
    let newQ = parseInt(qInput, 10);
    
    // Validation
    if (isNaN(newP) || newP < 4) newP = 4;
    if (newP > 64) newP = 64;
    
    // Enforce perfect square
    const root = Math.round(Math.sqrt(newP));
    newP = root * root;
    if (newP === 0) newP = 4;
    
    setPInput(newP); // Update input to show corrected value
    setP(newP);
    
    if (isNaN(newQ) || newQ < 1) newQ = 1;
    if (newQ >= newP) newQ = newP - 1;
    
    setQInput(newQ);
    setQ(newQ);
    
    resetState(newP, newQ);
  };

  const resetState = (activeP = p, activeQ = q) => {
    setAnimationStage(0);
    const newStats = calculateComplexity(activeP, activeQ);
    const newStates = generateMeshStates(activeP, activeQ);
    
    setStats(newStats);
    setStates(newStates);
    setCurrentNodes(newStates.initialState);
  };

  // Initial load
  useEffect(() => {
    resetState();
  }, []);

  const handleNextStep = () => {
    if (!states) return;
    
    if (animationStage === 0) {
      setAnimationStage(1);
      setCurrentNodes(states.stage1State);
    } else if (animationStage === 1) {
      setAnimationStage(2);
      setCurrentNodes(states.finalState);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Mesh Circular Shift Visualizer</h1>
        <p>Interactive Topographic Permutation Algorithm Simulation</p>
      </div>

      <div className="main-content">
        <MeshGrid 
          p={p} 
          q={q} 
          nodes={currentNodes} 
          animationStage={animationStage} 
        />
      </div>

      <div className="sidebar">
        <ControlPanel 
          pInput={pInput} setPInput={setPInput}
          qInput={qInput} setQInput={setQInput}
          onApply={handleApply}
          animationStage={animationStage}
          onStepNext={handleNextStep}
          onReset={() => resetState()}
        />
        
        <ComplexityPanel stats={stats} />
      </div>
    </div>
  );
}

export default App;
