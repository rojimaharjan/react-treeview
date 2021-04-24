import React, { useEffect, useState } from 'react'
import { BsPlusCircleFill } from "react-icons/bs"
import SingleItem from './SingleItem'

function Treeview() {
  const [nodesList, setNodeList] = useState([]);

  useEffect(() => {
    const nodesList = []
    setNodeList(nodesList);
  }, [])

  //edit node
  const onEdit = (newTitle, currentItem) => {
    const newNodes = nodesList.slice()
    const currentNode = findNode(currentItem.title, currentItem.level, currentItem)
    currentNode.title = newTitle
    setNodeList(newNodes)
  }

  //delete node
  const onDelete = (currentItem) => {
    let newNodes = nodesList.slice()
    let currentNode = findNode(currentItem.title, currentItem.level, currentItem)

    let strCurrentNode = JSON.stringify(currentNode)
    const strNewNodes = JSON.stringify(newNodes)

    let removedArray = strNewNodes.replace(strCurrentNode, "")
    
    // removing dangling commas if any !!!
    removedArray = removedArray.replace(',,', ',')
    removedArray = removedArray.replace(',]', ']')
    removedArray = removedArray.replace('[,', '[')

    newNodes = JSON.parse(removedArray)
    setNodeList(newNodes)

  }

  // adding new child to nodes
  const onAddChild = (currentItem) => {
    const newNodes = nodesList.slice()
    const noOfChildren = currentItem.child.length
    const newChild = { 'title': `${currentItem.title}.${noOfChildren}`, 'child': [], 'level': currentItem.level + 1, 'showChild': true }
    const currentNode = findNode(currentItem.title, currentItem.level, currentItem)
    currentNode.child.push(newChild)
    currentNode.showChild = true
    setNodeList(newNodes)
  }

  // adding parent node
  const onAddParent = ( ) => {
    const newNodes = nodesList.slice()
    const newChild = { 'title': 'A', 'child': [], 'level': 0, 'showChild': true }
    const lastChild = newNodes.slice(-1)[0]
    if (lastChild) {
      newChild.title = `${newChild.title}${lastChild.title}`
    }
    newNodes.push(newChild)
    setNodeList(newNodes)
  }

  // HELPER METHODS
  const findNode = (title, level, currentNode) => {
    let i, currentChild, result

    if (title === currentNode.title && level === currentNode.level) {
      return currentNode
    } else {
      for (i = 0; i < currentNode.child.length; i += 1) {
        currentChild = currentNode.child[i]
        result = findNode(title, level, currentChild)
        if (result !== false) {
          return result
        }
      }
      return false
    }
  }

  //show or hide tree view on click
  const toggleShowChildren = (currentItem) => {
    const newNodes = nodesList.slice()
    const currentNode = findNode(currentItem.title, currentItem.level, currentItem)
    currentNode.showChild = !currentNode.showChild
    setNodeList(newNodes)
  }

  return (
    <div>
      <h6>
        Click to add &nbsp;
            <span onClick={onAddParent}>
          <BsPlusCircleFill className="large-icon" />
        </span>
      </h6>

      {
        (nodesList && nodesList.length > 0) &&
        nodesList.map((item, index) =>
          <SingleItem
            key={index}
            currentItem={item}
            title={item.title}
            onEdit={(newTitle, item) => onEdit(newTitle, item)}
            onDelete={onDelete}
            onAddChild={(item) => onAddChild(item, index)}
            toggleShowChildren={toggleShowChildren}
          />
        )
      }

    </div>
  )
}

export default Treeview
