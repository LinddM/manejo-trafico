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
  if (!nodeSelected) {
    newNode(event.point.x, event.point.y)
    selectNode(streets.nodes[streets.nodes.length - 1])
  }
}

let streets = new Streets()
let nodeSelected = false
let relationshipPath
let lastNodeSelected

function newNode (x, y, lanes = 1) {
  let circle = new Path.Circle({
    center: new Point(x, y),
    radius: 10 + parseInt(lanes),
    fillColor: '#333'
  })

  streets.addStreetNode(circle.id, x, y, lanes, circle)

  circle.onMouseDown = (event) => {
    if (event.event.button === 2) {
      // deleteNode(event.target)
      // openProperties({ 'target': event.target, 'node': newNode })
    } else {
      selectNode(event.target)
    }
  }
}

function selectNode (target) {
  if (!nodeSelected) {
    const thisNode = streets.nodes.find(node => node.circle === target.circle)
    console.log(thisNode)

    relationshipPath = new Path()
    relationshipPath.strokeColor = '#333'
    relationshipPath.strokeWidth = thisNode.capacity / 2 + 2
    relationshipPath.strokeCap = 'round'
    relationshipPath.strokeJoin = 'round'
    relationshipPath.add(target.position)

    target.fillColor = 'red'
    nodeSelected = true
  } else if (target === lastNodeSelected.object) {
    // unselectNode(target)
  }
}
