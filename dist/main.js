/* eslint-disable no-undef */

let streets = new Streets()
let lastNode

for (let i = 0; i < 5; i++) {
  streets.addStreetNode(i, i * 10, 5, 2)

  if (i > 0) {
    streets.createRelationshipByNode(lastNode, streets.nodes[streets.nodes.length - 1])
  }

  lastNode = streets.nodes[streets.nodes.length - 1]
}

console.log(streets.nodes)
