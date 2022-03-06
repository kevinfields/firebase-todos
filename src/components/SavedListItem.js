import React from 'react'

const SavedListItem = (props) => {
  return (
    <div className='saved-list-item'>
      <p>Task: {props.task}</p>
      <p>Importance: {props.importance}</p>
      <p>Description: {props.description}</p>
    </div>
  )
}

export default SavedListItem