import React, { useState } from 'react'
import { Button, ButtonGroup, Col, Form } from 'react-bootstrap'
import { RiEdit2Line, RiDeleteBin6Line, RiMenuAddLine } from 'react-icons/ri'
import {
  CSSTransition
} from 'react-transition-group';

function SingleItem({ title, currentItem, onEdit, onDelete, onAddChild, toggleShowChildren }) {

  const [editDisabled, setEditDisabled] = useState(true)
  const nodeRef = React.useRef(null)

  // Current node methods
  
  const handleEdit = () => setEditDisabled(false)

  const handleDelete = () => {
    setEditDisabled(true)
    onDelete(currentItem)
  }

  const handleAddChild = () => {
    setEditDisabled(true)
    onAddChild(currentItem)
  }

  const onEditChange = (event) => onEdit(event.target.value, currentItem)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setEditDisabled(true)
    }
  }

  // child of current node methods.

  const onChildEdit = (newTitle, currentItem) => {
    onEdit(newTitle, currentItem)
  }

  const onChildDelete = (currentItem) => {
    setEditDisabled(true)
    onDelete(currentItem)
  }

  const onChildAdd = (currentItem) => {
    setEditDisabled(true)
    onAddChild(currentItem)
  }

  return (
    <div>
      <Form.Row>
        <Col sm="8" onClick={() => toggleShowChildren(currentItem)}>
          <Button variant="outline-light" style={{ border: 0 }}>
            <Form.Control type="text" value={title} onChange={onEditChange} onKeyPress={handleKeyPress} disabled={editDisabled} />
          </Button>
        </Col>
        <Col sm="4" style={{ paddingTop: 6 }}>
          <ButtonGroup aria-label="Basic example">
            <Button variant="outline-primary" size="sm" onClick={handleEdit} ><RiEdit2Line /></Button>
            <Button variant="outline-danger" size="sm" onClick={handleDelete}><RiDeleteBin6Line /></Button>
            <Button variant="outline-success" size="sm" onClick={handleAddChild}><RiMenuAddLine /></Button>
          </ButtonGroup>
        </Col>
      </Form.Row>
      <CSSTransition nodeRef={nodeRef} in={currentItem.showChild} timeout={100} classNames="list-transition" unmountOnExit>
        <div ref={nodeRef}>
          {
            currentItem.child.map((item, index) =>
              <div style={{ paddingLeft: 30 }} key={index}>
                <SingleItem
                  currentItem={item}
                  title={item.title}
                  onEdit={(_newTitle, _item) => { onChildEdit(_newTitle, _item) }}
                  onDelete={(_item) => { onChildDelete(_item) }}
                  onAddChild={(_item) => { onChildAdd(_item) }}
                  toggleShowChildren={(_item) => { toggleShowChildren(_item) }}
                />
              </div>
            )
          }
        </div>
      </CSSTransition>
    </div>
  )
}

export default SingleItem