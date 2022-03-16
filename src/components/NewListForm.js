import React, {useEffect, useState, useRef} from 'react'
import NewListItem from './NewListItem';
import CurrentList from './CurrentList';
import useLocalStorage from '../hooks/useLocalStorage';
import listSorter from '../functions/listSorter';

const NewListForm = (props) => {

  const listsRef = props.firestore.collection('users').doc(props.user).collection('lists');
  const dummy = useRef();

  const [formValues, setFormValues] = useState({
    title: '',
    items: []
  });

  const [savedForm, setSavedForm] = useLocalStorage('formValues', {title: '', items: [{task: '', importance: '', description: '', completed: ''}]});


  useEffect(() => {

    setSavedForm({
      ...formValues
    }); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues])

  useEffect(() => {

    if (savedForm && savedForm.title !== null) {
      console.log('we got one saved')
      setFormValues({
        title: savedForm.title,
        items: savedForm.items.length > 0 ? [...savedForm.items] : [],
      });
    }
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const appendItem = (e, val) => {

    e.preventDefault();
   

    setFormValues({
      ...formValues,
      items: formValues.items.concat(val)
    })

    if (formValues.items.length > 1) {
      dummy.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
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
          completed: false,
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

  const removeItem = (index) => {
    let screenshot = [...formValues.items];
    screenshot.splice(index, 1);
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
    alert('List Saved Successfully!');
    setSavedForm([]);
    })
  }

  const sortList = (sort) => {
    let newList = listSorter(formValues.items, sort);
    setFormValues({
      ...formValues,
      items: [...newList],
    })
  }

  const clearList = () => {

    if (window.confirm('Are you sure you want to delete all items? This cannot be undone.')) {
      setFormValues({
        title: '',
        items: [],
      })
    }
  }

  return (
    <div className='new-list-form'>
      <CurrentList title={formValues.title} items={formValues.items} onEdit={(item, property, edit) => amendFormValues(item, property, edit)} onRemove={(index) => removeItem(index)} dummy={dummy} onClear={() => clearList()}/>
      <form className='list-title-box'>
        <input id='list-title-input' type='text' placeholder={'give your list a title'} value={formValues.title} onChange={(e) => setFormValues({...formValues, title: e.target.value})} />
        <button id='submit-list-button' onClick={submitList}>Submit List</button>
      </form>
      <label htmlFor='list-sort-select' id='select-label'>Sort List</label>
      <select id='list-sort-select' onChange={(e) => sortList(e.target.value)}>
        <option value='0'>Newest First</option>
        <option value='1'>Alphabetical</option>
        <option value='2'>Importance (High to Low)</option>
        <option value='3'>Oldest First</option>
        <option value='4'>Reverse Alphabetical</option>
        <option value='5'>Importance (Low to High)</option>
      </select>
      <NewListItem appendItem={appendItem}/>
    </div>
  )
}

export default NewListForm