/* eslint-disable no-undef */
let vehicles = []

// eslint-disable-next-line no-unused-vars
function addVehicle () {
  if (nodeSelected) {
    type = Math.floor(Math.random() * vehicleTypes.length)
    const newVehicle = vehicleTypes[type]
    newVehicle.currentPosition = lastNodeSelected
    newVehicle.insertIntoNode(lastNodeSelected)

    vehicles.push(newVehicle)
    console.log(newVehicle)
    newVehicle.move()
  } else {
    throw new Error('No selected node to add vehicle')
  }
}
