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
  /**
   * Adds StreetNode to Trray
   * @param {number} id - ID of streetNode to add
   * @param {number} x - Horizontal position of node in map
   * @param {number} y - Vertical position of node in map
   * @param {number} lanes - Number of lanes this point of the street has
   */
  addStreetNode (id, x, y, lanes) {
    const newElement = new StreetNode(id, x, y, lanes)
    this.nodes.push(newElement)
  }
}
