import React from 'react'

const SavedListItem = (props) => {
  return (
    <div className={props.completed === 'True' ? 'list-item-com' : 'list-item-inc'}>
      <h2 id='sl-task' onClick={() => props.onEdit('task')}>{props.task}</h2>
      <p id='sl-imp' onClick={() => props.onEdit('importance')}>Importance Level: {props.importance}</p>
      <p id='sl-desc' onClick={() => props.onEdit('description')}>{props.description}</p>
      <p id='sl-comp'>{props.completed === 'True' ? 'Completed' : 'In Progress'}</p>
      <button 
      className={props.completed === 'True' ? 'mark-incomplete-button' : 'mark-complete-button'} 
      onClick={props.onComplete}>{props.completed === 'True' ? 'Incomplete' : 'Completed'}</button>
    </div>
  )
}

export default SavedListItem