import React from 'react'

const CurrentList = (props) => {

  const openEditor = (detail, index) => {

   const edit = prompt(`Edit ${detail}: `);
   if (edit === '' || edit === null) {
     return;
   }
   props.onEdit(index, detail, edit);
  }

  return (
    <div className='current-list'>
      <button onClick={props.onClear} className='clear-list-button'>Clear List</button>
      <p className='list-identifier'>Click any property of an item to edit it</p>
      <h3 className='current-list-title'>{props.title}</h3>
      {props.items.map((item) => 
        <div key={props.items.indexOf(item)}>
          <div className='current-item-details' key={props.items.indexOf(item)}>
            <button id='remove-item-button' onClick={() => props.onRemove(props.items.indexOf(item))}>X</button>
            <p id='item-task' onClick={() => openEditor('task', props.items.indexOf(item))}>{item.task}</p>
            <p id='item-importance' onClick={() => openEditor('importance', props.items.indexOf(item))}>Importance Level: {item.importance}</p>
            <p id='item-description' onClick={() => openEditor('description', props.items.indexOf(item))}>{item.description}</p>
          </div>
          <div ref={props.dummy}></div> 
        </div>
      )}
    </div>
  )

}

export default CurrentList