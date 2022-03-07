import React from 'react'

const CurrentList = (props) => {


  return (
    <div className='current-list'>
      <h6 className='current-list-identifier'>Current List</h6>
      <h3 className='current-list-title'>{props.title}</h3>
      {props.items.map((item) => 
        <div className='current-item-details'>
          <p id='item-task'>Task: {item.task}</p>
          <p id='item-importance'>Importance Level: {item.importance}</p>
          <p id='item-description'>Description: {item.description}</p>
        </div>
      )}
    </div>
  )

}

export default CurrentList