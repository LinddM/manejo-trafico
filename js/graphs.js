/* eslint-disable no-undef */
const canvas = document.getElementById('map')
canvas.width = 800
canvas.height = 500

let nodes = []

paper.setup(canvas)

let relationshipPath
let nodeSelected = false
let lastNodeSelected

let actions = []

/**
 * Creates a new node on a coordinate
 * @param {*} x - X coordinate of new node, X is an integer
 * @param {*} y - Y coordniate of new node, Y is an integer
 * @param {*} lanes - (Optional) Capacity of node, node capacity is defined by 2 cars per lane. lanes is an integer.
 */
// eslint-disable-next-line no-unused-vars
function newNode (x, y, lanes = 1) {
  let circle = new Path.Circle({
    center: new Point(x, y),
    radius: 10 + parseInt(lanes),
    fillColor: '#333'
  })

  let newNode = {
    'id': circle.id,
    'x': x,
    'y': y,
    'capacity': lanes * 2,
    'stored': lanes * 2,
    'direction': [],
    'intersects': [],
    'relationships': [],
    'vehicules': [],
    'output': 0,
    'input': 1,
    target: circle
  }
  nodes.push(newNode)

  circle.onMouseDown = (event) => {
    if (event.event.button === 2) {
      // deleteNode(event.target)
      openProperties({ 'target': event.target, 'node': newNode })
    } else {
      if (document.getElementById('eraser').checked) {
        deleteNode(event.target)
      } else {
        selectNode(event.target)
      }
    }
  }

  actions.push({
    action: 'newNode',
    value: {
      object: circle
    }
  })
  return circle
}

/**
 * Selects a node for a new relationship, if a node is already selected then selecting a new node will create a relationship
 * @param {*} target - Node to select, target is a Paper.js path
 */
function selectNode (target) {
  if (!nodeSelected) {
    const thisNode = nodes.find(node => node.id === target.id)
    relationshipPath = new Path()
    relationshipPath.strokeColor = '#333'
    relationshipPath.strokeWidth = thisNode.capacity / 2 + 2
    relationshipPath.strokeCap = 'round'
    relationshipPath.strokeJoin = 'round'
    relationshipPath.add(target.position)

    lastNodeSelected = {
      'object': target,
      'node': target.id
    }
    target.fillColor = 'red'
    nodeSelected = true
  } else if (target === lastNodeSelected.object) {
    unselectNode(target)
  } else {
    relationshipPath.add(target.position)

    const obj = lastNodeSelected.object
    const point = {
      x: obj.position.x - target.position.x,
      y: target.position.y - obj.position.y
    }

    const h = Math.sqrt(point.x * point.x + point.y * point.y)
    const angle = Math.asin(point.y / h)

    const arrowAngle = Math.PI / 4

    let newPoint = {
      x: 15 * Math.cos(angle + arrowAngle),
      y: 15 * Math.sin(angle + arrowAngle)
    }

    if (target.position.x < obj.position.x) {
      newPoint.x = newPoint.x * -1
    }
    relationshipPath.add(new Point(target.position.x - newPoint.x, target.position.y - newPoint.y))
    relationshipPath.add(target.position)

    newPoint = {
      x: 15 * Math.cos(angle - arrowAngle),
      y: 15 * Math.sin(angle - arrowAngle)
    }

    if (target.position.x < obj.position.x) {
      newPoint.x = newPoint.x * -1
    }
    relationshipPath.add(new Point(target.position.x - newPoint.x, target.position.y - newPoint.y))

    const lastNode = nodes.find(node => node.id === lastNodeSelected.node)

    lastNodeSelected.object.fillColor = new Color(0, 0.66, 1, 0.7)
    lastNode.intersects.push(relationshipPath.id)
    lastNode.direction.push(target.id)

    const currentNode = nodes.find(node => node.id === target.id)

    target.fillColor = new Color(0, 0.8, 1, 0.7)
    target.insertBelow(relationshipPath)
    currentNode.intersects.push(relationshipPath.id)
    currentNode.relationships.push(lastNodeSelected.node)

    nodeSelected = false

    actions.push({
      action: 'relationship',
      value: {
        from: {
          intersect: {
            object: lastNode.intersects,
            index: lastNode.intersects.length - 1
          },
          direction: {
            object: lastNode.direction,
            index: lastNode.direction.length - 1
          }
        },
        to: {
          intersect: {
            object: currentNode.intersects,
            index: currentNode.intersects.length - 1
          },
          relationships: {
            object: currentNode.relationships,
            index: currentNode.relationships.length - 1
          }
        },
        object: relationshipPath
      }
    })
  }
}

/**
 * Cancels the selection of a node
 * @param {*} target - Node to unselect, target is a Paper.js path
 */
// eslint-disable-next-line no-unused-vars
function unselectNode (target) {
  if (nodeSelected) {
    relationshipPath.remove()
    target.fillColor = '#333'
    nodeSelected = false
  }
}

/**
 * Deletes a node, its related relationships and strokes
 * @param {*} target - Node to unselect, target is a Paper.js path
 */
function deleteNode (target) {
  const node = nodes.find(node => node.id === target.id)
  for (let i = 0; i < node.relationships.length; i++) {
    const beforeNode = nodes.find(beforeNode => beforeNode.id === node.relationships[i])
    beforeNode.direction.splice(beforeNode.direction.indexOf(node.id), 1)

    for (let i = 0; i < beforeNode.intersects.length; i++) {
      for (let o = 0; o < node.intersects.length; o++) {
        if (beforeNode.intersects[i] === node.intersects[o]) {
          beforeNode.intersects.splice(i, 1)
        }
      }
    }
  }

  for (let i = 0; i < node.direction.length; i++) {
    const afterNode = nodes.find(afterNode => afterNode.id === node.direction[i])
    afterNode.relationships.splice(afterNode.relationships.indexOf(node.id), 1)

    for (let i = 0; i < afterNode.intersects.length; i++) {
      for (let o = 0; o < node.intersects.length; o++) {
        if (afterNode.intersects[i] === node.intersects[o]) {
          afterNode.intersects.splice(i, 1)
        }
      }
    }
  }

  for (let i = 0; i < node.intersects.length; i++) {
    objs = project.activeLayer.children
    const line = objs.find(obj => obj.id === node.intersects[i])
    line.remove()
  }

  nodes.splice(nodes.indexOf(node), 1)
  target.remove()
  if (nodeSelected) {
    nodeSelected = false
    relationshipPath.remove()
  }
}
