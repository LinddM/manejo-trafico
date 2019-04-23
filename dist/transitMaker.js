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

function autoGenerate() {
  const generationSpeed = 3000 - document.getElementById('vehicleGenerationRange').value
  console.log(generationSpeed)

  lastNodeSelected.live = !lastNodeSelected.live
  lastNodeSelected.autoGenerate(generationSpeed)

  fillProperties()
  if (nodeSelected) {
    unselectNode(lastNodeSelected)
  }
}

function addTrafficLight () {
  lastNodeSelected.trafficLight.state = !lastNodeSelected.trafficLight.state
  lastNodeSelected.trafficLight.makeVehiclesMove()
  fillProperties()

  if (nodeSelected) {
    unselectNode(lastNodeSelected)
  }
}
