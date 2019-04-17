/* eslint-disable no-unused-vars */
class StreetNode {
  constructor (id, x, y, lanes) {
    this.capacity = []
    this.direction = []
    this.intersects = []
    this.relationships = []
    this.vehicles = []
    this.output = 1
    this.input = 1
    this.id = id
    this.x = x
    this.y = y
    for (let i = 0; i < lanes; i++) {
      this.capacity.push(2)
      this.vehicles.push([])
    }
  }

  addDirection (node) {
    node.relationships.push(this)
    this.direction.push(node)
  }

  removeNode (node, graph) {
    node.direction[0].relationships = null
    node.relationships[0].direction = null
    graph.pop(node)
  }
}
