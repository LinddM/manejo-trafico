let nodeToEdit
// eslint-disable-next-line no-unused-vars
function openProperties (node) {
  console.log(node)
  nodeToEdit = node
  document.getElementById('prompt-wrapper').style.display = 'initial'
  document.getElementById('car-output').value = node.node.output
  document.getElementById('car-input').value = node.node.input
  document.getElementById('capacity').value = node.node.capacity / 2

  if (node.node.relationships.length <= 1) {
    document.getElementById('traffic-light').disabled = true
  }
}

// eslint-disable-next-line no-unused-vars
function closeProperties () {
  document.getElementById('prompt-wrapper').style.display = 'none'
}

// eslint-disable-next-line no-unused-vars
function saveProperties () {
  let node = nodeToEdit
  document.getElementById('prompt-wrapper').style.display = 'none'
  node.node.output = document.getElementById('car-output').value
  node.node.input = document.getElementById('car-input').value
  node.node.capacity = document.getElementById('capacity').value * 2
}