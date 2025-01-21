class Graph {
  constructor(grid) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
  }

  //   Check if the current cell is valid
  isValid(row, col) {
    return (
      row >= 0 &&
      col >= 0 &&
      row < this.rows &&
      col < this.cols &&
      this.grid[row][col] === 1
    );
  }

  dfs(row, col) {
    if (!this.isValid(row, col)) return;

    //  mark as visited
    this.grid[row][col] = 0;

    //  recursive
    const directions = [
      [-1, 0], // top
      [1, 0], // bottom
      [0, -1], // left
      [0, 1], // right
    ];

    for (const [dx, dy] of directions) {
      this.dfs(row + dx, col + dy);
    }
  }
}

function islandCount(grid) {
  if (!grid || grid.length === 0) return 0;

  const graph = new Graph(grid);
  let count = 0;

  for (let row = 0; row < graph.rows; row++) {
    for (let col = 0; col < graph.cols; col++) {
      // if the cell is an island
      if (graph.grid[row][col] === 1) {
        graph.dfs(row, col);
        count++;
      }
    }
  }

  return count;
}

// Testcase 1
console.log(
  islandCount([
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ])
); // Expected Output: 1

// Testcase 2
console.log(
  islandCount([
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1],
  ])
); // Expected Output: 3

// Testcase 3
console.log(
  islandCount([
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 1, 1],
  ])
); // Expected Output: 5

// Testcase 4
console.log(
  islandCount([
    [1, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
  ])
); // Expected Output: 4

// Testcase 5
console.log(
  islandCount([
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
  ])
); // Expected Output: 6

// Testcase 6
console.log(
  islandCount([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0],
    [1, 1, 0, 0, 0],
  ])
); // Expected Output: 2

// Testcase 7
console.log(
  islandCount([
    [1, 1, 1],
    [0, 0, 0],
    [1, 0, 1],
  ])
); // Expected Output: 3
