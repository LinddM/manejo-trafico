// eslint-disable-next-line no-unused-vars
class Vehicle {
  /**
   *
   * @param id - Number
   * @param type - VehicleType defines the size, types: VehicleType.Car (1), VehicleType.Bus (2), VehicleType.Truck (2),
   * @param maxSpeed - Topspeed of vehicle
   * @param acceleration - Acceleration of vehicle
   */
  constructor (typeConfig = TypeConfiguration) {
    this.speed = 0
    this.description = typeConfig.description
    this.size = typeConfig.size
    this.maxSpeed = typeConfig.maxSpeed
    this.acceleration = typeConfig.acceleration
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

  async move () {
    let restart = true
    while (restart) {
      for (let i = 0; i < this.currentPosition.lanes.length; i++) {
        const lane = this.currentPosition.lanes[i]
        if (lane.indexOf(this) === 0) {
          while (this.currentPosition.direction.length > 0) {
          // restart = true
          // Defines next node to move and speed of movement
            let nextPosition = this.currentPosition.direction[Math.floor(Math.random() * this.currentPosition.direction.length)]

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
              setTimeout(() => {
                const lastNode = this.currentPosition

                try {
                  this.insertIntoNode(nextPosition)
                  this.currentPosition.lanes[i].splice(0, 1)
                  this.currentPosition.load[i] -= this.size
                  this.currentPosition = nextPosition

                  // eslint-disable-next-line no-undef
                  this.currentPosition.circle.fillColor = new Color(0, 0.3, 0.5, 0.7)
                  // eslint-disable-next-line no-undef
                  lastNode.circle.fillColor = new Color(0, 0.8, 1, 0.7)
                } catch (error) {
                  console.log('caca')
                }
              }, time)
              await wait(time + 1)
            }
          }
          this.currentPosition.lanes[i].splice(0, 1)
          this.currentPosition.load[i] -= this.size
          // eslint-disable-next-line no-undef
          this.currentPosition.circle.fillColor = new Color(0, 0.8, 1, 0.7)

          restart = false
        }
      }
    }
  }
}

class TypeConfiguration {
  /**
   *
   * @param description - Description of new vehicle configuration
   * @param size - Units of load vehicles occupies
   * @param maxSpeed - Topspeed of vehicle
   * @param acceleration - Acceleration of vehicle
   */
  constructor (description, size, maxSpeed, acceleration) {
    this.description = description
    this.size = size
    this.maxSpeed = maxSpeed
    this.acceleration = acceleration
  }
}

// eslint-disable-next-line no-unused-vars
let vehicleTypes = [
  new TypeConfiguration('car', 1, 27, 12.04),
  new TypeConfiguration('motos', 1, 42, 15.6),
  new TypeConfiguration('buses', 2, 27, 6.5),
  new TypeConfiguration('truck', 2, 20, 6)
]

async function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
