// eslint-disable-next-line no-unused-vars
class TrafficLight {
  constructor () {
    // state: node is a traffic light
    this.state = false
    // go: represents red (false) or green (true)
    this.go = true
  }
  makeVehiclesMove () {
    if (this.go) {
      this.go = false
    } else {
      this.go = true
    }
    console.log(this.go)
    setTimeout(this.makeVehiclesMove, 500)
  }
}
