import React, {useState} from 'react'
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import NewListItem from './NewListItem';
import CurrentList from './CurrentList';

const NewListForm = (props) => {

  const listsRef = props.firestore.collection('users').doc(props.user).collection('lists');
  // const query = listsRef.orderBy('id');
  // const [lists] = useCollectionData(query, {idField: 'id'});
  

  const [formValues, setFormValues] = useState({
    title: '',
    items: []
  });
  

  const appendItem = (e, val) => {

    e.preventDefault();
    
    setFormValues({
      ...formValues,
      items: formValues.items.concat(val)
    })
  }

  const amendFormValues = (item, property, edit) => {

    if (property === 'importance') {
      if (isNaN(edit) || edit < 1 || edit > 10) {
        alert('Importance must be a number 1-10');
        return;
      }
    } 

    let screenshot = [...formValues.items];
    
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
        console.log('we got here at least');
        newItem = {
          task: oldItem[0].task,
          importance: edit,
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
 
    screenshot.splice(item, 0, newItem);
    setFormValues({
      ...formValues,
      items: [...screenshot],
    })
  }

  const submitList = async (e) => {
    e.preventDefault();

    if (formValues.items.length < 1) {
      alert('You must include at least one item.');
      return;
    }
    await listsRef.add({
      title: formValues.title,
      items: formValues.items,
      createdAt: new Date(),
      editedAt: '',
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
        <input id='list-title-input' type='text' placeholder={'give your list a title'} value={formValues.title} onChange={(e) => setFormValues({...formValues, title: e.target.value})} />
        <button id='submit-list-button' onClick={submitList}>Submit List</button>
      </form>
      <NewListItem appendItem={appendItem} />
    </div>
  )
}

export default NewListForm