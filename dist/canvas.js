/* eslint-disable no-undef */
// Canvas setup
const canvas = document.getElementById('map')
canvas.width = 800
canvas.height = 500

paper.setup(canvas)

let background = new Path.Rectangle(new Rectangle(new Point(0, 0), new Point(800, 500)))
background.fillColor = '#EEE'

// Drawing of street
background.onMouseDown = (event) => {
  // If gray background is pressend and no node is selected then create a new node
  if (!nodeSelected) {
    newNode(event.point.x, event.point.y)
    selectNode(streets.nodes[streets.nodes.length - 1].circle)
  }
}

// Trray structure for all street nodes
let streets = new Streets()

// Checks if any circle is selected on the canvas
let nodeSelected = false

// Arrows that point from one circle to another
let relationshipPath

// Self-explaining, last circle that was selected
// Useful to make the arrows between circles
let lastNodeSelected

/**
 * Creates a circle in the canvas a new node in the streets model
 * @param {number} x - Horizontal position in the canvas
 * @param {number} y - Vertical position in the canvas
 * @param {number} lanes - (Optional) Number of lanes in the streets model and width of line in relationships, defaults at 1
 */
function newNode (x, y, lanes = 1) {
  // Circle path, this is the visual representation of a node in the canvas
  let circle = new Path.Circle({
    center: new Point(x, y),
    radius: 10 + parseInt(lanes),
    fillColor: '#333'
  })

  // Adds streetNode to the streets model with the ID of the Node equal to the ID of the circle
  // Having an ID can make it useful to compare which circle refereces to each StreetNode
  streets.addStreetNode(circle.id, x, y, lanes)
  // Sets a property "circle" on the StreetNode to the circle canvas object
  streets.nodes[streets.nodes.length - 1].circle = circle

  circle.onMouseDown = (event) => {
    if (event.event.button === 2) {
      // deleteNode(event.target)
      // openProperties({ 'target': event.target, 'node': newNode })
    } else {
      selectNode(event.target)
    }
  }
}

/**
 * Selects a circle and creates relationships between nodes
 * An arrow in the canvas is created with the relantionship between StreetNodes
 * @param {Path} target Circle path that is been selected
 */
function selectNode (target) {
  if (!nodeSelected) {
    // If no node is selected then select this node and
    // create a new path to form an arrow.

    const thisNode = streets.nodes.find(node => node.circle === target)

    relationshipPath = new Path()
    relationshipPath.strokeColor = '#333'
    relationshipPath.strokeWidth = thisNode.capacity[0] / 2 + 2
    relationshipPath.strokeCap = 'round'
    relationshipPath.strokeJoin = 'round'
    relationshipPath.add(target.position)

    target.fillColor = 'red'

    lastNodeSelected = thisNode
    nodeSelected = true
  } else if (target === lastNodeSelected.circle) {
    // unselectNode(target)
    nodeSelected = false
  } else {
    relationshipPath.add(target.position)

    const point = {
      x: lastNodeSelected.x - target.position.x,
      y: target.position.y - lastNodeSelected.y
    }

    const h = Math.sqrt(point.x * point.x + point.y * point.y)
    const angle = Math.asin(point.y / h)

    const arrowAngle = Math.PI / 4

    let newPoint = {
      x: 15 * Math.cos(angle + arrowAngle),
      y: 15 * Math.sin(angle + arrowAngle)
    }

    if (target.position.x < lastNodeSelected.x) {
      newPoint.x = newPoint.x * -1
    }
    relationshipPath.add(new Point(target.position.x - newPoint.x, target.position.y - newPoint.y))
    relationshipPath.add(target.position)

    newPoint = {
      x: 15 * Math.cos(angle - arrowAngle),
      y: 15 * Math.sin(angle - arrowAngle)
    }

    if (target.position.x < lastNodeSelected.x) {
      newPoint.x = newPoint.x * -1
    }
    relationshipPath.add(new Point(target.position.x - newPoint.x, target.position.y - newPoint.y))

    lastNodeSelected.circle.fillColor = new Color(0, 0.66, 1, 0.7)

    const thisNode = streets.nodes.find(node => node.circle === target)

    lastNodeSelected.intersects.push(relationshipPath)
    streets.createRelationshipByNode(lastNodeSelected, thisNode)

    target.fillColor = new Color(0, 0.8, 1, 0.7)
    target.insertBelow(relationshipPath)

    thisNode.intersects.push(relationshipPath)

    nodeSelected = false
  }
}
