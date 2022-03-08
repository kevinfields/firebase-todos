import React from 'react'

const SavedListItem = (props) => {
  return (
    <div className={props.completed === 'True' ? 'list-item-com' : 'list-item-inc'}>
      <p id='sl-task'><label htmlFor='sl-task' onClick={() => props.onEdit('task')}>Task: </label>{props.task}</p>
      <p id='sl-imp'><label htmlFor='sl-imp' onClick={() => props.onEdit('importance')}>Importance: </label>{props.importance}</p>
      <p id='sl-desc'><label htmlFor='sl-desc' onClick={() => props.onEdit('description')}>Description: </label>{props.description}</p>
      <p id='sl-comp'><label htmlFor='sl-comp'>Completed: </label>{props.completed}</p>
      <button 
      className={props.completed === 'True' ? 'mark-incomplete-button' : 'mark-complete-button'} 
      onClick={props.onComplete}>{props.completed === 'True' ? 'Incomplete' : 'Completed'}</button>
    </div>
  )
}

export default SavedListItem