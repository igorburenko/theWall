import {useState, useRef, useEffect} from 'react'
import Card from './card.js';

const initialMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
export function Wall() {
  const [matrix, setMatrix] = useState(initialMatrix)
  const matrixRef = useRef(matrix);

  useEffect(() => {
    matrixRef.current = matrix;
  }, matrix)

  const getNewMatrix = (matrixToTraverse, newValue) => {
    let hasNotOpenedCells = false;

    const newMatrix = matrixToTraverse.map((row, rowIdx) => row.map((cell, cellIdx) => {
        if (matrixToTraverse[rowIdx][cellIdx] === newValue
          || (matrixToTraverse[rowIdx + 1] && matrixToTraverse[rowIdx + 1][cellIdx] === newValue)
          || (matrixToTraverse[rowIdx - 1] && matrixToTraverse[rowIdx - 1][cellIdx] === newValue)
          || matrixToTraverse[rowIdx][cellIdx + 1] === newValue
          || matrixToTraverse[rowIdx][cellIdx - 1] === newValue
        ) {
          return newValue
        }
        hasNotOpenedCells = true;
        return matrixToTraverse[rowIdx][cellIdx];
      })
    );
    return {newMatrix, hasNotOpenedCells}
  }

  const traverse = (matrixToTraverse, newValue, firstPoint) => {
    console.log('traversr')
    matrixToTraverse = matrixRef.current;
    if (firstPoint) {
      matrixToTraverse[firstPoint.rowIdx][firstPoint.cellIdx] = newValue;
      setMatrix(matrixToTraverse);
      console.log(matrixToTraverse);
      setTimeout(() => traverse(matrixToTraverse, newValue), 50)
      return;
    }

    const {newMatrix, hasNotOpenedCells} = getNewMatrix(matrixToTraverse, newValue);
    setMatrix(newMatrix);
    if (hasNotOpenedCells) {
      setTimeout(() => traverse(newMatrix, newValue), 50)
    }
  };

  const openCards = (point) => {
    traverse(matrixRef.current, 1, point)
  }

  const closeCards = (point) => {
    traverse(matrixRef.current, 0, point);
  }

  const onClick = (e) => {
    if(e.target.dataset.name !== 'card') {
      return;
    }
    const {rowidx, cellidx} = e.target.dataset;
    const startPoint = {rowIdx: Number(rowidx), cellIdx: Number(cellidx)};
    openCards(startPoint);
    // setTimeout(() => closeCards(startPoint), 400)
  }

  return (
    <>
      <div className="wall" onClick={onClick}>
        {matrix.map((row, rowIdx) => (
            <div className="row" key={rowIdx}>
              {row.map((card, cellIdx) => (
                <Card card={card}
                      point={ { rowIdx, cellIdx }}
                      key={cellIdx + rowIdx}
                />))}
            </div>
          )
        )}

      </div>
      <button onClick={onClick}>Click</button>
    </>

  );
}
