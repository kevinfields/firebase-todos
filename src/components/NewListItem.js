import React, {useState} from 'react'

const NewListItem = (props) => {

  const [item, setItem] = useState({
    task: '',
    importance: 1,
    description: '',
    completed: false,
  })

  const append = (e) => {

    e.preventDefault();
    if (item.task === null || item.task === '') {
      alert('Please enter a task');
      return;
    }
    if (isNaN(item.importance) || item.importance < 1 || item.importance > 10) {
      alert('Importance must be a number 1-10');
      return;
    }
    props.appendItem(e, item);
    setItem({
      task: '',
      importance: 1,
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
        <select id='importance-input' value={item.importance} onChange={(e) => setItem({...item, importance: e.target.value})}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        <label htmlFor='description-input'>Description: </label>
        <textarea id='description-input' rows='4' value={item.description} onChange={(e) => setItem({...item, description: e.target.value})} />
        <button id='add-item-button' onClick={(e) => append(e)}>Add Item</button>
        </div>
      </form>
    
  )
}

export default NewListItem