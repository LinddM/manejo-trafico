/* eslint-disable no-undef */
let background = new Path.Rectangle(new Rectangle(new Point(0, 0), new Point(800, 500)))
background.fillColor = '#EEE'

const distance = 25
let travel = 0
let latestNode

background.onMouseDown = (event) => {
  if (!nodeSelected) {
    latestNode = newNode(event.point.x, event.point.y, document.getElementById('lanes').value)
    selectNode(latestNode)
  }
}

background.onMouseDrag = (event) => {
  travel += event.delta.length
  if (travel > distance) {
    latestNode = newNode(event.point.x, event.point.y, document.getElementById('lanes').value)
    selectNode(latestNode)
    selectNode(latestNode)
    travel = 0
  }
}

background.onMouseUp = (event) => {
  unselectNode(latestNode)
}
