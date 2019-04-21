/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
function addVehicle (nodeToAddVehicle = StreetNode) {
  const type = Math.floor(Math.random() * vehicleTypes.length)
  try {
    nodeToAddVehicle.generateVehicle(vehicleTypes[type])
  } catch (error) {
  }
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
  try {
    nodeToAddVehicle.generateVehicle(vehicleTypes[1])
    console.log(vehicleTypes[1])
  } catch (error) {
  }
}

function insertTruck () {
  const nodeToAddVehicle = streets.nodes.find(node => node.relationships.length === 0)
  try {
    nodeToAddVehicle.generateVehicle(vehicleTypes[3])
    console.log(vehicleTypes[3])
  } catch (error) {
  }
}

async function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

function addTrafficLight () {
  lastNodeSelected.trafficLight.state = true
  lastNodeSelected.trafficLight.makeVehiclesMove()
}
