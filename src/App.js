import React, { useState, useEffect, useCallback, useRef } from "react";
import produce from "immer";
import matrix from './matrix.jpg'
const numRows = 25;
const numCols = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    } 
    setGrid((g,speed) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speed);
  }, []);
  useEffect(() => { 
    runSimulation()
  },[speed])
    return (
      <div style={{backgroundImage:`url(${matrix})`, backgroundSize: 'cover',
      marginTop: '-200px', height:'1300px'}}>
        
        
        <div
          style={{
            marginLeft: '600px',
            paddingTop: '400px',
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 20px)`
          }}
        >
  
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, gridCopy => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][k] ? "lime" : undefined,
                  border: "solid 1px lime"
                }}
              />
            ))
          )}
        </div>
        <div style={{marginLeft: '600px'}}>
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>
        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          random
        </button>
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          clear
        </button>
        <button onClick={() => {setSpeed(speed -500)}}>
          inc speed
        </button>
       
        </div>
        <h2 style={{color: 'lime', paddingTop: '25px',margin: 'auto', height: '200px', width: '400px', zIndex: '99'}}>
          Welcome to the Game of Life
        </h2>
      </div>
    );
  };

export default App;