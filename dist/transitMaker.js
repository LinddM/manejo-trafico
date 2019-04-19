/* eslint-disable no-undef */
let vehicles = []

// eslint-disable-next-line no-unused-vars
function addVehicle (nodeToAddVehicle) {
  type = Math.floor(Math.random() * vehicleTypes.length)
  const newVehicle = new Vehicle(vehicleTypes[type])
  newVehicle.currentPosition = nodeToAddVehicle
  newVehicle.insertIntoNode(nodeToAddVehicle)

  vehicles.push(newVehicle)
  console.log(newVehicle)
  newVehicle.move()
}

// eslint-disable-next-line no-unused-vars
function generateVehicle () {
  const heads = streets.nodes.filter(node => node.relationships.length === 0)
  for (let i = 0; i < heads.length; i++) {
    addVehicle(heads[i])
  }
}

function insertMotorcycle () {
  const nodeToAddVehicle = streets.nodes.find(node => node.relationships.length === 0)
  const newVehicle = new Vehicle(vehicleTypes[1])
  newVehicle.currentPosition = nodeToAddVehicle
  newVehicle.insertIntoNode(nodeToAddVehicle)

  vehicles.push(newVehicle)
  console.log(newVehicle)
  newVehicle.move()
}

function insertTruck () {
  const nodeToAddVehicle = streets.nodes.find(node => node.relationships.length === 0)
  const newVehicle = new Vehicle(vehicleTypes[3])
  newVehicle.currentPosition = nodeToAddVehicle
  newVehicle.insertIntoNode(nodeToAddVehicle)

  vehicles.push(newVehicle)
  console.log(newVehicle)
  newVehicle.move()
}
