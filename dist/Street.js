/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-undef
class StreetNode extends TrrayNode {
  constructor (id, x, y, lanes) {
    // this.direction = []
    // this.relationships = []
    // this.id = id
    super(id)

    this.capacity = []
    this.intersects = []
    this.vehicles = []
    this.output = 1
    this.input = 1
    this.x = x
    this.y = y
    for (let i = 0; i < lanes; i++) {
      this.capacity.push(2)
      this.vehicles.push([])
    }
  }
}

// eslint-disable-next-line no-undef
class Streets extends Trray {
  addElement (id, x, y, lanes) {
    const newElement = new StreetNode(id, x, y, lanes)
    this.nodes.push(newElement)
  }
}
