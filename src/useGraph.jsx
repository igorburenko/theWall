/* eslint-disable no-debugger */
/* eslint-disable comma-dangle */
import { useEffect, useRef, useState } from 'react';

export const useGraph = (initialMatrix) => {
  const [matrix, setMatrix] = useState(initialMatrix);
  const AdjListRef = useRef(new Map());

  const setVertex = (vertexCords, newVertex = { neighbors: [], value: 0 }) => {
    const key = JSON.stringify(vertexCords);
    AdjListRef.current.set(key, newVertex);
  };

  const getVertex = (vertex) => {
    const key = JSON.stringify(vertex);
    return AdjListRef.current.get(key);
  };

  const isHasVertex = (vertex) => {
    const key = JSON.stringify(vertex);
    return AdjListRef.current.has(key);
  };

  const addEdge = (vertex, neighbor) => {
    getVertex(vertex).neighbors.push(neighbor);
  };

  const isVertexHasNeighbor = (vertex, potentialNeighbor) => {
    const { neighbors } = getVertex(vertex);
    return neighbors.some(
      // eslint-disable-next-line prettier/prettier
      ([rowIdx, colIdx]) => rowIdx === potentialNeighbor[0] && colIdx === potentialNeighbor[1]
    );
  };

  const addNeighbors = (vertex, neighbors) => {
    neighbors.forEach((neighbor) => {
      if (!isVertexHasNeighbor(vertex, neighbor)) {
        addEdge(vertex, neighbor);
      }
    });
  };

  const getNeighbors = (vertex, arr) => {
    const [rowIndex, colIndex] = vertex;
    const rows = [rowIndex];
    const cols = [colIndex];
    if (rowIndex > 0) {
      rows.push(rowIndex - 1);
    }
    if (rowIndex < arr.length - 1) {
      rows.push(rowIndex + 1);
    }
    if (colIndex > 0) {
      cols.push(colIndex - 1);
    }
    if (colIndex < arr[rowIndex].length - 1) {
      cols.push(colIndex + 1);
    }

    return rows.reduce((acc, row) => {
      const newCells = cols.reduce((cellsAcc, col) => {
        if (row === rowIndex && col === colIndex) {
          return cellsAcc;
        }
        return [...cellsAcc, [row, col]];
      }, []);
      return [...acc, ...newCells];
    }, []);
  };

  function createAdjListFromMatrix(arr) {
    arr.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const vertex = [rowIndex, colIndex];
        if (!isHasVertex(vertex)) {
          setVertex([rowIndex, colIndex]);
        }
        const neighbors = getNeighbors([rowIndex, colIndex], arr);
        addNeighbors(vertex, neighbors);
      });
    });
  }

  useEffect(() => {
    createAdjListFromMatrix(initialMatrix);
  }, []);

  const getMatrixFromAdjList = () => {
    const keys = AdjListRef.current.keys();
    const newMatrix = [];
    Array.from(keys).forEach((key) => {
      const vertex = AdjListRef.current.get(key);
      const [rowIndex, colIndex] = JSON.parse(key);
      if (!newMatrix[rowIndex]) {
        newMatrix[rowIndex] = [];
      }
      newMatrix[rowIndex][colIndex] = vertex.value;
    });
    return newMatrix;
  };

  // eslint-disable-next-line no-unused-vars
  const DFSUtil = (vertexToProcess, visited, hasUnopenedCells, setHasUnopenedCells, newValue) => {
    const processedVertex = [];
    vertexToProcess.forEach((vertexCords) => {
      if (visited[JSON.stringify(vertexCords)]) {
        return;
      }
      const vertex = getVertex(vertexCords);
      const isVertexForAction = vertex.value !== newValue;
      if (isVertexForAction) {
        const newVertex = { ...vertex, value: newValue };
        setVertex(vertexCords, newVertex);
        processedVertex.push(vertexCords);
        // eslint-disable-next-line no-param-reassign
        visited[JSON.stringify(vertexCords)] = true;
      }
      const { neighbors } = vertex;
      neighbors.forEach((neighborKey) => {
        const neighborVertex = getVertex(neighborKey);
        if (!hasUnopenedCells && neighborVertex.value !== newValue) {
          setHasUnopenedCells();
        }
      });

      // eslint-disable-next-line consistent-return
      return processedVertex;
    });

    return processedVertex;
  };

  const traverse = (vertexToProcess, newValue, visitedVertex = {}) => {
    const visited = visitedVertex;
    let hasUnopenedCells = false;
    const setHasUnopenedCells = () => {
      hasUnopenedCells = true;
    };
    console.log('traverse');
    const newProcessedVertex = DFSUtil(
      vertexToProcess,
      visited,
      hasUnopenedCells,
      setHasUnopenedCells,
      newValue,
    );
    const newMatrix = getMatrixFromAdjList(AdjListRef.current);
    setMatrix(newMatrix);
    if (hasUnopenedCells === false) {
      return;
    }
    const newVertexForTraverse = newProcessedVertex.reduce((acc, vertexCords) => {
      const vertex = getVertex(vertexCords);
      return [...acc, ...vertex.neighbors];
    }, []);
    // eslint-disable-next-line no-undef
    requestAnimationFrame(() => traverse(newVertexForTraverse, newValue, visited));
  };
  return { matrix, setMatrix, traverse };
};
