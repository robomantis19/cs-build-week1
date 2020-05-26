import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


const numRows = 25
const numCols = 25
function App() {
  const [grid, setGrid] = useState(() => { 
    const rows = []; 
    for (let i = 0; i < numRows; i++){
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  })
  return (
    <div style={{
      display: 'grid', 
      gridTemplateColumns: `repeat(${numCols}, 20px)`
    }}>
      {grid.map((rows, i) => 
        rows.map((col,k) => 
          <div 
          key={`${i}-${k}`}
          style = {{ width: 20, 
          height: 20, backgroundColor: grid[i][k] ? 'lime': undefined,
          border: '1px solid lime'
          }}
          />
        ))
      }

    </div>
  );
}

export default App;
