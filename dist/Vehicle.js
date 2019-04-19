/**
 * Vehicle class
 * Defines size based on the Vehicle type
 */
class Vehicle {
  /**
   *
   * @param id - Number
   * @param type - VehicleType defines the size, types: VehicleType.Car (1), VehicleType.Bus (2), VehicleType.Truck (2),
   * @param maxSpeed - Topspeed of vehicle
   * @param acceleration - Acceleration of vehicle
   */
  constructor (id, size, maxSpeed, acceleration) {
    this.speed = 0
    this.id = id
    this.size = size
    this.maxSpeed = maxSpeed
    this.acceleration = acceleration
  }

  insertIntoNode (element) {
    for (let i = 0; i < element.lanes.length; i++) {
      if ((element.load[i] + this.size) <= element.capacity) {
        element.lanes[i].push(this)
        element.load[i] += this.size
      } else {
        throw new Error('Node is already full')
      }
    }
  }

  move () {
    let restart = false
    console.log('CURRENT LANES', this.currentPosition.lanes.length)
    for (let i = 0; i < this.currentPosition.lanes.length; i++) {
      const lane = this.currentPosition.lanes[i]
      if (lane.indexOf(this) === 0) {
        if (this.currentPosition.direction.length > 0) {
        // Defines next node to move and speed of movement
          let nextPosition = this.currentPosition.direction[Math.floor(Math.random() * this.currentPosition.direction.length)]

          try {
            if (nextPosition.trafficLight.state && !nextPosition.trafficLight.go) {
              this.speed = 0
            } else {
              if (this.speed < this.maxSpeed) {
                this.speed += this.acceleration
              } else {
                this.speed = this.maxSpeed
              }
              const distance = (Math.sqrt(Math.pow(this.currentPosition.x - nextPosition.x, 2) + Math.pow(this.currentPosition.y - nextPosition.y, 2))) / 10
              // eslint-disable-next-line no-undef
              const time = ((distance / this.speed) * timeFrame) * 1000
              // not sure if assignment is well done
              console.log('CURRENT:', this.currentPosition.x, this.currentPosition.y)
              setTimeout(() => {
                this.insertIntoNode(nextPosition)
                this.currentPosition.lanes[i].splice(0, 1)
                this.currentPosition.load[i] -= this.size
                this.currentPosition = nextPosition

                console.log('MOVED  :', this.currentPosition.x, this.currentPosition.y)
                this.move()
              }, time)
            }
          } catch (error) {
            console.log(error)
            restart = true
          }
        }
      } else {
        restart = true
      }
    }

    if (restart) {
      setTimeout(this.move, 600)
    }
  }
}

// eslint-disable-next-line no-unused-vars
let vehicleTypes = [
  new Vehicle('car', 1, 27, 12.04),
  new Vehicle('motos', 1, 42, 15.6),
  new Vehicle('buses', 2, 27, 6.5),
  new Vehicle('truck', 2, 20, 6)
]
