// Definisi graf
const graph = {
  JKT: { BDG: 150, SMG: 450, MDN: 1800 },
  SBY: { SMG: 350, YOG: 300, MKS: 900 },
  BDG: { JKT: 150, YOG: 400 },
  YOG: { BDG: 400, SBY: 300, SMG: 130 },
  SMG: { JKT: 450, SBY: 350, YOG: 130 },
  MDN: { JKT: 1800, MKS: 2500 },
  MKS: { SBY: 900, MDN: 2500 },
};

class PriorityQueue {
  constructor() {
    this.elements = [];
  }
  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }
  dequeue() {
    return this.elements.shift().element;
  }
  isEmpty() {
    return this.elements.length === 0;
  }
}

// Fungsi Dijkstra
function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const pq = new PriorityQueue();

  // initial distances
  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;
  pq.enqueue(start, 0);

  while (!pq.isEmpty()) {
    const currentNode = pq.dequeue();

    if (currentNode === end) break;

    for (const neighbor in graph[currentNode]) {
      const distance = graph[currentNode][neighbor];
      const newDistance = distances[currentNode] + distance;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = currentNode;
        pq.enqueue(neighbor, newDistance);
      }
    }
  }

  return { distances, previous };
}

// Fungsi untuk mendapatkan jalur
function getPath(previous, start, end) {
  const path = [];
  let currentNode = end;

  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  if (path[0] === start) {
    return path;
  }
  return []; 
}

// Fungsi untuk menyelesaikan soal
function solveQuestions() {
  // TESTCASE 1. Jakarta ke Surabaya
  let { distances, previous } = dijkstra(graph, "JKT", "SBY");
  let path = getPath(previous, "JKT", "SBY");
  console.log(
    "1. Jalur terpendek Jakarta ke Surabaya:",
    path.join(" -> "),
    "dengan jarak",
    distances["SBY"],
    "km"
  );

  // TESTCASE 2. Medan ke Yogyakarta
  ({ distances, previous } = dijkstra(graph, "MDN", "YOG"));
  path = getPath(previous, "MDN", "YOG");
  console.log(
    "2. Jalur terpendek Medan ke Yogyakarta:",
    path.join(" -> "),
    "dengan jarak",
    distances["YOG"],
    "km"
  );

  // TESTCASE 3. Bandung ke Makassar
  ({ distances, previous } = dijkstra(graph, "BDG", "MKS"));
  path = getPath(previous, "BDG", "MKS");
  console.log(
    "3. Jalur terpendek Bandung ke Makassar:",
    path.join(" -> "),
    "dengan jarak",
    distances["MKS"],
    "km"
  );

  // TESTCASE 4. Menambahkan jalan baru Jakarta ke Yogyakarta dengan jarak 500KM
  graph["JKT"]["YOG"] = 500;
  graph["YOG"]["JKT"] = 500;
  ({ distances, previous } = dijkstra(graph, "JKT", "SBY"));
  path = getPath(previous, "JKT", "SBY");
  console.log(
    "4. Setelah penambahan jalan baru, jalur terpendek Jakarta ke Surabaya:",
    path.join(" -> "),
    "dengan jarak",
    distances["SBY"],
    "km"
  );

  // Tabel jarak antar kota
  console.log("5. Tabel jarak antar kota:");
  console.table(graph);
}

solveQuestions();
