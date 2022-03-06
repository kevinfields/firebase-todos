import React, {useState} from 'react'

const NewListItem = (props) => {

  const [item, setItem] = useState({
    task: '',
    importance: 0,
    description: ''
  })

  const append = (e) => {
    props.appendItem(e, item);
    setItem({
      task: '',
      importance: 0,
      description: ''
    })
  }
  return (
    <div>
      <form>
        <input type='text' value={item.task} onChange={(e) => setItem({...item, task: e.target.value})} />
        <input type='number' value={item.importance} onChange={(e) => setItem({...item, importance: e.target.value})} />
        <input type='text' value={item.description} onChange={(e) => setItem({...item, description: e.target.value})} />
        <button onClick={(e) => append(e)}>Add Item</button>
      </form>
    </div>
  )
}

export default NewListItem