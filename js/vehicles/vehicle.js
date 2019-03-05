/* eslint-disable no-undef */

function simulate () {
  setTimeout(simulate, 1000)
  newCar()
  moveCar()
}

simulate()

function newCar () {
  const first = nodes.filter(node => node.relationships.length === 0)
  for (let i = 0; i < first.length; i++) {
    console.log('TEST', first)
    let newVehicle = {
      type: 'car',
      capacity: 1
    }
    if (first[i].stored > 0) {
      first[i].vehicules.push(newVehicle)
      first[i].stored -= newVehicle.capacity

      first[i].target.fillColor = new Color((first[i].stored + first[i].capacity * 0.5) / first[i].capacity, 0, 0)
    }
  }
}

function moveCar () {
  for (let i = 0; i < nodes.length; i++) {
    setTimeout(() => {
      if (nodes[i].direction.length === 0) {
        nodes[i].vehicules.slice(0, 1)
      } else {
        const random = Math.floor(Math.random() * (nodes[i].direction.length))
        const nextNode = nodes.find(node => node.id === nodes[i].direction[random])
        const vehicle = nodes[i].vehicules[0]

        if (nextNode.stored > vehicle.capacity) {
          nextNode.vehicules.push(vehicle)
          nodes[i].vehicules.slice(0, 1)
          nodes[i].stored -= vehicle.capacity

          nodes[i].target.fillColor = new Color((nodes[i].stored + nodes[i].capacity * 0.5) / nodes[i].capacity, 0, 0)
        }
      }
    }, 500 )
  }
}
