// eslint-disable-next-line no-unused-vars
class TrafficLight {
  constructor (parentNode) {
    // state: node is a traffic light
    this.state = false
    // go: represents red (false) or green (true)
    this.go = true
    this.parentNode = parentNode
  }
  makeVehiclesMove (street = 0) {
    if (this.state) {
      setTimeout(() => {
      // debugger
        for (let i = 0; i < this.parentNode.relationships.length; i++) {
          const node = this.parentNode.relationships[i]
          if (i === street) {
            node.trafficLight.go = true
            console.log('VERDE A', i)
          } else {
            node.trafficLight.go = false
            console.log('ROJO A', i)
          }
        }
        street = (street += 1) % this.parentNode.relationships.length
        this.makeVehiclesMove(street)
        // eslint-disable-next-line no-undef
      }, 5000 * timeFrame)
    } else {
      for (let i = 0; i < this.parentNode.relationships.length; i++) {
        const node = this.parentNode.relationships[i]
        node.trafficLight.go = true
      }
    }
  }
}
