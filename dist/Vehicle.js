/**
 * Vehicle class
 * Defines size based on the Vehicle type
 */
class Vehicle {
  /**
   *
   * @param id Number
   * @param type VehicleType defines the size, types: VehicleType.Car (1), VehicleType.Bus (2), VehicleType.Truck (2)
   */
  constructor (id, size, maxSpeed, acceleration) {
    this.speed = 0
    this.id = id
    this.size = size
    this.maxSpeed = maxSpeed
    this.acceleration = acceleration
  }
  /* movement () {
    for (let i = 0; i < this.currentPosition.vehicles.length; i++) {
      // Move vehicle only if it is the first in the queue
      // It checks every lane in current position to check its index
      const lane = this.currentPosition.vehicles[i]
      const index = lane.indexOf(this)
      if (index === 0) {
        if (this.currentPosition.direction.length > 0) {
          // Defines next node to move and speed of movement
          let nextPosition = this.currentPosition.direction[Math.floor(Math.random() * this.currentPosition.direction.length)]
          if (nextPosition.capacity) {
            if (nextPosition.trafficLight.go) {
              if (this.speed < this.maxSpeed) {
                this.speed += this.acceleration
              } else {
                this.speed = this.maxSpeed
              }
            }
            // Move to next node with current speed
          }
        }
      }
    }
  }
  */
  movement () {
    for (let i = 0; i < this.currentPosition.vehicles.length; i++) {
      const lane = this.currentPosition.vehicles[i]
      if (lane.indexOf(this) === 0) {
        if (this.currentPosition.direction.length > 0) {
        // Defines next node to move and speed of movement
          let nextPosition = this.currentPosition.direction[Math.floor(Math.random() * this.currentPosition.direction.length)]
          if (nextPosition.load[i] < nextPosition.capacity) {
            if (!nextPosition.trafficLight.state || nextPosition.trafficLight.go) {
              this.speed = 0
            } else {
              if (this.speed < this.maxSpeed) {
                this.speed += this.acceleration
              } else {
                this.speed = this.maxSpeed
              }
              const distance = Math.sqrt(Math.pow(this.currentPosition.x - this.nextPosition.x, 2) + Math.pow(this.currentPosition.y - this.nextPosition.y, 2))
              const time = distance / this.speed
              // not sure if assignment is well done
              setTimeout(() => {
                this.currentPosition = nextPosition
              }, time)
            }
          }
        }
      }
    }
  }
}

// eslint-disable-next-line no-unused-vars
let vehicleTypes = [
  new Vehicle('car', 1, 3.2, 10),
  new Vehicle('motos', 1, 4.1, 20),
  new Vehicle('buses', 2, 0.3, 5),
  new Vehicle('truck', 2, 0.3, 3)
]
