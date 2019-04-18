/* eslint-disable no-unused-vars */
class TrrayNode {
  constructor (id) {
    this.relationships = []
    this.direction = []
    this.id = id
  }

  /**
   * Adds a direction from current node
   * @param {TrrayNode} node - Direction to add from current node
   */
  addDirection (node) {
    node.relationships.push(this)
    this.direction.push(node)
  }

  removeDirection (node) {
    const indexToRemove = this.direction.indexOf(node)
    const relationshipIndex = node.relationships.indexOf(this)
    if (indexToRemove > -1) {
      this.direction.splice(indexToRemove, 1)
      node.relationships.splice(relationshipIndex, 1)
    } else {
      throw new Error('Direction to remove is not part of node')
    }
  }
}

class Trray {
  constructor () {
    this.nodes = []
  }

  /**
   * Adds element to Trray
   * @param {TrrayNode} element - Node to add
   */
  addElement (element) {
    this.nodes.push(element)
  }

  /**
   * Relates two nodes in one direction, (a -> b)
   * @param {TrrayNode} node - Node to be in the right side of the relationship
   * @param {TrrayNode} nodeToRelate - Direction of relationship
   */
  createRelationshipByNode (node, nodeToRelate) {
    const index = this.nodes.indexOf(node)
    const indexToRelate = this.nodes.indexOf(nodeToRelate)

    if (index > -1 && indexToRelate > -1) {
      this.nodes[index].addDirection(this.nodes[indexToRelate])
    } else {
      throw new Error('Node(s) are not in Trray')
    }
  }

  /**
   * Relates two nodes in one direction based on their index, (a -> b)
   * @param {number} index - Index of node in the right side of the relantionshop
   * @param {number} indexToRelate - Index of node to be related, direction of relationship
   */
  createRelationshipByIndex (index, indexToRelate) {
    if ((index > 0 && index < this.nodes.length) && (indexToRelate > 0 && indexToRelate < this.nodes.length)) {
      this.nodes[index].addDirection(this.nodes[indexToRelate])
    } else {
      throw new Error('Index of Node(s) are out of bounds of Trray')
    }
  }

  /**
   * Unrelates two nodes, (a -x-> b)
   * @param {TrrayNode} node - Node to be in the right side of the relationship
   * @param {TrrayNode} nodeToRemove - Direction of relationship
   */
  removeRelationshipByNode (node, nodeToRemove) {
    const index = this.nodes.indexOf(node)
    const indexToRemove = this.nodes.indexOf(nodeToRemove)

    if (index > -1 && indexToRemove > -1) {
      this.nodes[index].removeDirection(this.nodes[indexToRemove])
    } else {
      throw new Error('Node(s) are not in Trray')
    }
  }

  /**
   * Unrelates two nodes in one direction, (a -x-> b)
   * @param {TrrayNode} index - Index of node to be in the right side of the relationship
   * @param {TrrayNode} indexToRemove - Index of node to be un related, direction of relationship
   */
  removeRelationshipByIndex (index, indexToRemove) {
    if ((index > 0 && index < this.nodes.length) && (indexToRemove > 0 && indexToRemove < this.nodes.length)) {
      this.nodes[index].removeDirection(this.nodes[indexToRemove])
    } else {
      throw new Error('Index of Node(s) are out of bounds of Trray')
    }
  }

  /**
   * Returns the value of the first element in the Trray that equals element
   * @param {TrrayNode} element - Element to be compared
   */
  find (element) {
    return this.nodes.find(node => node === element)
  }

  removeElement (element) {
    const index = this.nodes.indexOf(element)

    if (index > -1) {
      for (let i = 0; i < element.relationships.length; i++) {
        element.relationships[i].removeDirection(element)
      }
      for (let i = 0; i < element.direction.length; i++) {
        element.removeDirection(element.direction[i])
      }
      this.nodes.splice(index, 1)
    } else {
      throw new Error('Node is not in Trray')
    }
  }
}
