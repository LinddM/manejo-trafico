/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-undef
class StreetNode extends TrrayNode {
  constructor (id, x, y, lanes) {
    // this.direction = []
    // this.relationships = []
    // this.id = id
    super(id)

    // eslint-disable-next-line no-undef
    this.trafficLight = new TrafficLight(this)
    this.load = []
    this.capacity = 2
    this.intersects = []
    this.lanes = []
    this.output = 1
    this.input = 1
    this.x = x
    this.y = y
    for (let i = 0; i < lanes; i++) {
      this.load.push(0)
      this.lanes.push([])
    }
  }

  // eslint-disable-next-line no-undef
  generateVehicle (typeConfiguration = TypeConfiguration) {
    // eslint-disable-next-line no-undef
    const newVehicle = new Vehicle(typeConfiguration)
    try {
      newVehicle.insertIntoNode(this)
      newVehicle.currentPosition = this
      newVehicle.move()
    } catch (error) {
      console.log(error)
    }
  }

  autoGenerate (ms) {
    let x = 0
    setTimeout(() => {
      const type = Math.floor(Math.random() * vehicleTypes.length)
      this.generateVehicle(vehicleTypes[type])
      if (sim) {
        this.autoGenerate(ms)
      }
    // eslint-disable-next-line no-undef
    }, ms * timeFrame)
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

  removeIntersects (element) {
    for (let i = 0; i < element.intersects.length; i++) {
      // Comparar con dirección
      for (let d = 0; d < element.direction.length; d++) {
        for (let o = 0; o < element.direction[d].intersects.length; o++) {
          if (element.intersects[i] === element.direction[d].intersects[o]) {
            element.direction[d].intersects.splice(o, 1)
          }
        }
      }

      // Comparar con relación
      for (let r = 0; r < element.relationships.length; r++) {
        for (let o = 0; o < element.relationships[r].intersects.length; o++) {
          if (element.intersects[i] === element.relationships[r].intersects[o]) {
            element.relationships[r].intersects.splice(o, 1)
          }
        }
      }
    }
  }
}