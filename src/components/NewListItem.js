import React, {useState} from 'react'

const NewListItem = (props) => {

  const [item, setItem] = useState({
    task: '',
    importance: 0,
    description: '',
    completed: false,
  })

  const append = (e) => {

    e.preventDefault();
    if (isNaN(item.importance) || item.importance < 1 || item.importance > 10) {
      alert('Importance must be a number 1-10');
      return;
    }
    props.appendItem(e, item);
    setItem({
      task: '',
      importance: 0,
      description: '',
      completed: false,
    })
  }
  return (
    
      <form>
        <div className='new-list-item'>
        <label htmlFor='task-input'>Task: </label>
        <input id='task-input' type='text' value={item.task} onChange={(e) => setItem({...item, task: e.target.value})} />
        <label htmlFor='importance-input'>Importance: </label>
        <input id='importance-input' type='number' value={item.importance} onChange={(e) => setItem({...item, importance: e.target.value})} />
        <label htmlFor='description-input'>Description: </label>
        <textarea id='description-input' rows='4' value={item.description} onChange={(e) => setItem({...item, description: e.target.value})} />
        <button id='add-item-button' onClick={(e) => append(e)}>Add Item</button>
        </div>
      </form>
    
  )
}

export default NewListItem