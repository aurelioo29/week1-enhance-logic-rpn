function shortestPath(friends, start, target) {
  if (start === target) return 0; // If start and target are the same, return 0

  const queue = [[start, 0]]; // Create a queue to store the friends
  const visited = new Set(); // Create a set to store the visited friends

  // Loop through the queue
  while (queue.length > 0) {
    const [current, level] = queue.shift();

    // Mark the friend as visited
    visited.add(current);

    // Explore all the friends from current
    for (const neighbor of friends[current] || []) {
      // if the neighbor is the target, return the level + 1
      if (neighbor === target) return level + 1;

      // If the neighbor is not visited, add it to the queue
      if (!visited.has(neighbor)) {
        queue.push([neighbor, level + 1]);
        visited.add(neighbor);
      }
    }
  }

  return -1;
}

// Testcase 1
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Alice",
    "David"
  )
); // Expected Output: 2

// Testcase 2
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Alice",
    "Eve"
  )
); // Expected Output: 2

// Testcase 3
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Alice",
    "Alice"
  )
); // Expected Output: 0

// Testcase 4
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "David",
    "Charlie"
  )
); // Expected Output: 3

// Testcase 5
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Eve",
    "Bob"
  )
); // Expected Output: 1

// Testcase 6
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "Charlie",
    "Alice"
  )
); // Expected Output: 1

// Testcase 7
console.log(
  shortestPath(
    {
      Alice: ["Bob", "Charlie"],
      Bob: ["Alice", "David", "Eve"],
      Charlie: ["Alice", "Eve"],
      David: ["Bob"],
      Eve: ["Bob", "Charlie"],
    },
    "David",
    "Eve"
  )
); // Expected Output: 2
