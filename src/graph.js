export class Graph {
  constructor(matrix) {
    // const matrix = [[1,2,3,4,5], [1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]];
    // this.noOfVertices = noOfVertices;
    this.matrix = matrix;
    this.AdjList = new Map();
    this.createAdjListFromMatrix(matrix);
  }

  addVertex(vertex) {
    const key = JSON.stringify(vertex);
    this.AdjList.set(key, {neibours: [], value: 0});
  }

  getVertex(vertex) {
    const key = JSON.stringify(vertex);
    return this.AdjList.get(key)
  }

  isHasVertex(vertex) {
    const key = JSON.stringify(vertex);
    return this.AdjList.has(key);
  }

  addEdge(vertex, neibour) {
    this.getVertex(vertex).neibours.push(neibour);
  }

  isVertexHasNaibour(vertex, potentialNeibour) {
    const neibours = this.getVertex(vertex).neibours;
    return neibours.some(([rowIdx, colIdx]) => rowIdx === potentialNeibour[0] && colIdx === potentialNeibour[1] )
  }

  addNeibours(vertex, neibours) {
    neibours.forEach((neibour) => {
      if(!this.isVertexHasNaibour(vertex, neibour)) {
        this.addEdge(vertex, neibour);
      }
    })
  }

  createAdjListFromMatrix(arr) {
    arr.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const vertex = [rowIndex, colIndex]
        if (!this.isHasVertex(vertex)) {
          this.addVertex([rowIndex, colIndex]);
        }
        const neibours = this.getNeibours([rowIndex, colIndex], arr);
        this.addNeibours(vertex, neibours);
      })
    })
  }

  getNeibours(vertex, arr) {
    const [rowIndex, colIndex] = vertex;
    let rows = [rowIndex];
    let cols = [colIndex];
    if (rowIndex > 0) {
      rows.push(rowIndex - 1);
    };
    if (rowIndex < arr.length - 1) {
      rows.push(rowIndex + 1);
    }
    if (colIndex > 0) {
      cols.push(colIndex - 1);
    };
    if (colIndex < arr[rowIndex].length - 1) {
      cols.push(colIndex + 1);
    }

    return rows.reduce((acc, row) => {
      const newCells = cols.reduce((cellsAcc, col) => {
        if (row === rowIndex && col === colIndex) {
          return cellsAcc;
        }
        return [...cellsAcc, [row, col]]
      }, [])
      return [...acc, ...newCells]
    }, [])
  }

  traverse(vertex) {
    const visited = {};
    this.DFSUtil(vertex, visited);
    return this.matrix;
  }

  DFSUtil(vertex, visited) {
    if (visited[JSON.stringify(vertex)]) {
      return;
    }
    visited[JSON.stringify(vertex)] = true;

    const [rowIndex, colIndex] = vertex;
    if (this.matrix[rowIndex][colIndex] === 0) {
      return this.matrix[vertex[0]][vertex[1]] = 1;
    }
    const neibours = this.getVertex(vertex).neibours;
    neibours.forEach((neibourKey) => {
      this.DFSUtil(neibourKey, visited);
    });
  }

  // Main DFS method
  // dfs(startingNode)
  // {
  //
  //   var visited = {};
  //
  //   this.DFSUtil(startingNode, visited);
  // }

// Recursive function which process and explore
// all the adjacent vertex of the vertex with which it is called
//   DFSUtil(vert, visited)
//   {
//     visited[vert] = true;
//     console.log(vert);
//
//     var get_neighbours = this.AdjList.get(vert);
//
//     for (var i in get_neighbours) {
//       var get_elem = get_neighbours[i];
//       if (!visited[get_elem])
//         this.DFSUtil(get_elem, visited);
//     }
//   }

  // function to performs BFS
  // bfs(startingNode)
  // {
  //   // create a visited object
  //   var visited = {};
  //   // Create an object for queue
  //   // var q = new Queue();
  //
  //   // add the starting node to the queue
  //   visited[startingNode] = true;
  //   q.enqueue(startingNode);
  //
  //   // loop until queue is empty
  //   while (!q.isEmpty()) {
  //     // get the element from the queue
  //     var getQueueElement = q.dequeue();
  //
  //     // passing the current vertex to callback function
  //     console.log(getQueueElement);
  //
  //     // get the adjacent list for current vertex
  //     var get_List = this.AdjList.get(getQueueElement);
  //
  //     // loop through the list and add the element to the
  //     // queue if it is not processed yet
  //     for (var i in get_List) {
  //       var neigh = get_List[i];
  //
  //       if (!visited[neigh]) {
  //         visited[neigh] = true;
  //         q.enqueue(neigh);
  //       }
  //     }
  //   }
  // }

  // printGraph()
  // {
  //   // get all the vertices
  //   var get_keys = this.AdjList.keys();
  //
  //   // iterate over the vertices
  //   for (var i of get_keys)
  //   {
  //     // get the corresponding adjacency list
  //     // for the vertex
  //     var get_values = this.AdjList.get(i);
  //     var conc = "";
  //
  //     // iterate over the adjacency list
  //     // concatenate the values into a string
  //     for (var j of get_values)
  //       conc += j + " ";
  //
  //     // print the vertex and its adjacency list
  //     console.log(i + " -> " + conc);
  //   }
  // }

  // addVertex(v)
  // addEdge(v, w)
  // printGraph()

  // bfs(v)
  // dfs(v)
}

// Using the above implemented graph class
// var g = new Graph();


// adding edges
// g.addEdge('A', 'B');
// g.addEdge('A', 'D');
// g.addEdge('A', 'E');
// g.addEdge('B', 'C');
// g.addEdge('D', 'E');
// g.addEdge('E', 'F');
// g.addEdge('E', 'C');
// g.addEdge('C', 'F');

// prints all vertex and
// its adjacency list
// A -> B D E
// B -> A C
// C -> B E F
// D -> A E
// E -> A D F C
// F -> E C
// g.printGraph();
