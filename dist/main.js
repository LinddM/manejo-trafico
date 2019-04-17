/* eslint-disable no-undef */
let pastNode
let graph = []
let nodeToDelete

for (let i = 0; i < 10; i++) {
  const streetNode = new StreetNode(i, i, i, 2)
  graph.push(streetNode)
  if (i > 0) {
    pastNode.addDirection(graph[graph.length - 1])
  }
  pastNode = streetNode
  if (i === 3) {
    nodeToDelete = streetNode
  }
}

// removing node #3
nodeToDelete.removeNode(nodeToDelete, graph)

console.log(graph)
