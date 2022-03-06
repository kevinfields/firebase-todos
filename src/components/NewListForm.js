import React, {useState} from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import NewListItem from './NewListItem';

const NewListForm = (props) => {

  const listsRef = props.firestore.collection('users').doc(props.user).collection('lists');
  const query = listsRef.orderBy('id');
  const [lists] = useCollectionData(query, {idField: 'id'});
  

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

  const submitList = async (e) => {
    e.preventDefault();

    await listsRef.add({
      title: formValues.title,
      items: formValues.items
    }).then(() => {
      setFormValues({
        title: '',
        items: []
      })
    })
  }

  return (
    <div className='new-list-form'>
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