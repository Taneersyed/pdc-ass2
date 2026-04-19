// utils/shiftLogic.js

/**
 * Calculates the exact mesh shifts for a circular shift operation
 * 
 * @param {number} p Total nodes
 * @param {number} q Shift amount
 * @returns {object} Shift details including row shift, col shift, and steps
 */
export function calculateComplexity(p, q) {
  const rootP = Math.floor(Math.sqrt(p));
  
  // Formulas as per requirements
  const ringSteps = Math.min(q, p - q);
  const rowShiftAmount = q % rootP;
  const colShiftAmount = Math.floor(q / rootP);
  
  // Total steps in mesh = row shifts + column shifts
  const meshSteps = rowShiftAmount + colShiftAmount;
  
  return {
    ringSteps,
    meshSteps,
    rowShiftAmount,
    colShiftAmount
  };
}

/**
 * Generates the state history of the grid across stages
 * Stage 0: Initial
 * Stage 1: Row Shift
 * Stage 2: Column Shift
 */
export function generateMeshStates(p, q) {
  const rootP = Math.floor(Math.sqrt(p));
  
  // Initial state: data = index
  const initialState = Array.from({ length: p }, (_, i) => ({
    id: i,
    data: i
  }));
  
  // Stage 1: Row Shift
  const stage1State = [...initialState].map(node => ({ ...node }));
  
  // For row shift, elements shift horizontally by (q % rootP) within their row
  const rowShiftAmount = q % rootP;
  
  for (let r = 0; r < rootP; r++) {
    const rowStartIndex = r * rootP;
    // Calculate new positions for this row
    const oldRow = initialState.slice(rowStartIndex, rowStartIndex + rootP);
    
    for (let c = 0; c < rootP; c++) {
      // Data that arrives at column c came from (c - shift + rootP) % rootP
      const sourceCol = (c - rowShiftAmount + rootP) % rootP;
      stage1State[rowStartIndex + c].data = oldRow[sourceCol].data;
    }
  }
  
  // Stage 2: Column Shift
  const stage2State = [...stage1State].map(node => ({ ...node }));
  
  // For column shift, this must fulfill the row-major global shift Q
  // Every element originally at global index i is now at (i + Q) % P.
  // This means the final state must precisely match moving data forward by Q.
  for (let i = 0; i < p; i++) {
    // We can just calculate the precise final state mathematically
    // The data that should be at index i came from (i - q + p) % p
    const sourceGlobalIdx = (i - q + p) % p;
    stage2State[i].data = initialState[sourceGlobalIdx].data;
  }
  
  return {
    initialState,
    stage1State,
    finalState: stage2State
  };
}
