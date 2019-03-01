/* eslint-disable no-undef */
var tool = new Tool()

tool.onKeyDown = (event) => {
  if (event.key === 'escape') {
    unselectNode(lastNodeSelected.object)
  }
  if (event.key === 'z') {
    if (event.event.ctrlKey && actions.length > 0) {
      const lastAction = actions[actions.length - 1]
      switch (lastAction.action) {
        case 'newNode':
          deleteNode(lastAction.value.object)
          break
        case 'relationship':
          lastAction.value.from.direction.object.splice(lastAction.value.from.direction.index, 1)
          lastAction.value.from.intersect.object.splice(lastAction.value.from.intersect.index, 1)
          lastAction.value.to.relationships.object.splice(lastAction.value.to.relationships.index, 1)

          const objs = project.activeLayer.children
          const line = objs.find(obj => obj.id === lastAction.value.to.intersect.object[lastAction.value.to.intersect.index])
          line.remove()

          lastAction.value.to.intersect.object.splice(lastAction.value.to.intersect.index, 1)
          break
      }
      actions.pop()
    }
  }
}
