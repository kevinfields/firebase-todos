import React, {useState} from 'react'
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import NewListItem from './NewListItem';
import CurrentList from './CurrentList';

const NewListForm = (props) => {

  const listsRef = props.firestore.collection('users').doc(props.user).collection('lists');
  // const query = listsRef.orderBy('id');
  // const [lists] = useCollectionData(query, {idField: 'id'});
  

  const [formValues, setFormValues] = useState({
    title: 'List Title',
    items: []
  });
  

  const appendItem = (e, val) => {

    e.preventDefault();
    if (val.task === '') {
      alert('Please enter a task');
      return;
    }
    
    setFormValues({
      ...formValues,
      items: formValues.items.concat(val)
    })
  }

  const amendFormValues = (item, property, edit) => {

    if (property === 'importance' && isNaN(edit)) {
      alert('Importance must be a number');
      return;
    } 

    let screenshot = [...formValues.items];
    console.log('screenshot state 1: ' + JSON.stringify(screenshot));
    
    const oldItem = screenshot.splice(item, 1);

    let newItem = {};
    switch(property) {
      case 'task':
        newItem = {
          task: edit,
          importance: oldItem[0].importance,
          description: oldItem[0].description,
          completed: false
        }
        break;
      case 'importance':
        newItem = {
          task: oldItem[0].task,
          importance: Number(edit),
          description: oldItem[0].description,
          completed: false,
        }
        break;
      case 'description':
        newItem = {
          task: oldItem[0].task,
          importance: oldItem[0].importance,
          description: edit,
          completed: false,
        }
        break;
      default: 
        break;
    }
    setFormValues({
      ...formValues,
      items: [...screenshot, newItem]
    })
  }

  const submitList = async (e) => {
    e.preventDefault();

    await listsRef.add({
      title: formValues.title,
      items: formValues.items,
      createdAt: new Date(),
      completed: false,
    }).then(() => {
      setFormValues({
        title: '',
        items: []
      })
    })
  }

  return (
    <div className='new-list-form'>
      <CurrentList title={formValues.title} items={formValues.items} onEdit={(item, property, edit) => amendFormValues(item, property, edit)}/>
      <form className='list-title-box'>
        <label htmlFor='list-title-input'>List Title: </label>
        <input id='list-title-input' type='text' value={formValues.title} onChange={(e) => setFormValues({...formValues, title: e.target.value})} />
        <button id='submit-list-button' onClick={submitList}>Submit List</button>
      </form>
      <NewListItem appendItem={appendItem} />
    </div>
  )
}

export default NewListForm