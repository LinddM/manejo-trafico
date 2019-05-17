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
    this.speed = typeConfig.maxSpeed
    this.description = typeConfig.description
    this.size = typeConfig.size
    this.maxSpeed = typeConfig.maxSpeed
    this.acceleration = typeConfig.acceleration
  }

  insertIntoNode (element) {
    let optimal = { load: 10, index: 0 }
    for (let i = 0; i < element.lanes.length; i++) {
      if ((element.load[i] + this.size) <= element.capacity) {
        if (element.load[i] < optimal.load) {
          optimal = { load: element.load[i], index: i }
        }
      }
    }

    if (optimal.load < 10) {
      element.lanes[optimal.index].push(this)
      element.load[optimal.index] += this.size
      return optimal.index
    } else {
      throw new Error('Node is already full')
    }
  }

  async move () {
    let restart = true
    let startTime = new Date()
    const startPos = [this.currentPosition.x, this.currentPosition.y]
    // eslint-disable-next-line no-undef
    while (restart && sim) {
      for (let i = 0; i < this.currentPosition.lanes.length; i++) {
        const lane = this.currentPosition.lanes[i]
        if (lane.indexOf(this) === 0) {
          // eslint-disable-next-line no-undef
          while (this.currentPosition.direction.length > 0 && sim) {
          // restart = true
          // Defines next node to move and speed of movement
            let nextPosition = this.currentPosition.direction[Math.floor(Math.random() * this.currentPosition.direction.length)]

            if (!nextPosition.trafficLight.go) {
              this.speed = 0
              // eslint-disable-next-line no-undef
              await wait(500 * timeFrame)
            } else {
              if (this.speed < (this.maxSpeed + this.currentPosition.lanes.length * 2)) {
                this.speed += this.acceleration
              } else {
                this.speed = (this.maxSpeed + this.currentPosition.lanes.length * 2)
              }
              const distance = (Math.sqrt(Math.pow(this.currentPosition.x - nextPosition.x, 2) + Math.pow(this.currentPosition.y - nextPosition.y, 2))) / 10
              // eslint-disable-next-line no-undef
              const time = ((distance / this.speed) * timeFrame) * 1000
              // not sure if assignment is well done
              setTimeout(() => {
                const lastNode = this.currentPosition

                try {
                  const index = this.insertIntoNode(nextPosition)
                  this.currentPosition.lanes[i].splice(0, 1)
                  this.currentPosition.load[i] -= this.size
                  this.currentPosition = nextPosition
                  i = index

                  const arrSum = arr => arr.reduce((a, b) => a + b, 0)

                  const weight = (arrSum(this.currentPosition.load) / (this.currentPosition.lanes.length * 2))

                  // eslint-disable-next-line no-undef
                  if (this.currentPosition !== lastNodeSelected || !nodeSelected) {
                    // eslint-disable-next-line no-undef
                    this.currentPosition.circle.fillColor = new Color(weight, 0.66 - (weight * 0.66), 1 - weight, 0.7)
                  }
                  // eslint-disable-next-line no-undef
                  if (lastNode !== lastNodeSelected || !nodeSelected) {
                    // eslint-disable-next-line no-undef
                    lastNode.circle.fillColor = new Color(0, 0.66, 1, 0.7)
                  }
                } catch (error) {
                  this.speed = 0
                }
              }, time)
              await wait(time)
            }
          }
          this.currentPosition.lanes[i].splice(0, 1)
          this.currentPosition.load[i] -= this.size

          // eslint-disable-next-line no-undef
          if (this.currentPosition !== lastNodeSelected || !nodeSelected) {
            // eslint-disable-next-line no-undef
            this.currentPosition.circle.fillColor = new Color(0, 0.8, 1, 0.7)
          }
          // eslint-disable-next-line no-undef
          departures += 1
          let departTime = new Date()

          // eslint-disable-next-line no-undef
          exitTimes += Math.abs(departTime - startTime)
          
          const finishPos = [this.currentPosition.x, this.currentPosition.y]
          const vector = [finishPos[0] - startPos[0], finishPos[1] - startPos[1]]
          const distance = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2))
          // eslint-disable-next-line no-undef
          exitSpeeds += distance / (Math.abs(departTime - startTime) / 100)
          // eslint-disable-next-line no-undef
          carsQuantity += 1

          restart = false
        } else {
          // eslint-disable-next-line no-undef
          await wait(500 * timeFrame)
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
  new TypeConfiguration('car', 1, 14, 8.02),
  new TypeConfiguration('motos', 1, 16, 10),
  new TypeConfiguration('buses', 2, 11, 4.3),
  new TypeConfiguration('truck', 2, 12, 4)
]

async function wait (ms) {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    setTimeout(resolve, ms * timeFrame)
  })
}
