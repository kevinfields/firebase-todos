import React, {useState, useEffect} from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SavedListItem from '../components/SavedListItem';
import SuccessMessage from '../components/SuccessMessage';
import timeToDate from '../functions/timeToDate';

const MyLists = (props) => {

  const listsRef = props.firestore.collection('users').doc(props.user).collection('lists');
  const query = listsRef.orderBy('createdAt', 'desc');
  const [lists] = useCollectionData(query, {idField: 'id'});
  const [success, setSuccess] = useState(false);
  const [newItem, setNewItem] = useState({
    task: '',
    importance: 1,
    description: '',
    open: false,
    list: '',
    title: '',
  });


  useEffect(() => {
    if (success) {
      setTimeout(() => {
       setSuccess(false); 
      }, 2000)
    }
  }, [success])

  const markComplete = async (list, index) => {

    const ref = listsRef.doc(list);
    let data;
    await ref.get().then((doc) => {
      if (doc.exists) {
        data = doc.data()
        
      } else {
        console.log('doc does not exist');
      }
    })

    let oldItems = [...data.items];
    
    if (!oldItems[index].completed) {
      oldItems[index] = {
        ...oldItems[index],
        completed: true,
      }
    } else {
      oldItems[index] = {
        ...oldItems[index],
        completed: false,
      }
    }
  
    await ref.set({
      title: data.title,
      items: [...oldItems],
      createdAt: data.createdAt,
      lastEditedAt: data.lastEditedAt ? data.lastEditedAt : {seconds: 946706400, nanoseconds: 0},
    });
    
  }

  const changeTitle = async (id) => {

    const ref = listsRef.doc(id);
    let data;
    await ref.get().then((doc) => {
      data = doc.data();
    });

    const newTitle = prompt('New Title: ', data.title);

    if (newTitle === null) {
      return;
    }

    await ref.set({
      title: newTitle,
      items: [...data.items],
      createdAt: data.createdAt,
      lastEditedAt: new Date(),
    })

  }

  const editItem = async (property, listId, index) => {

    const ref = listsRef.doc(listId);
    let data;
    await ref.get().then((doc) => {
      if (doc.exists) {
        data = doc.data();
      } else {
        console.log('doc does not exist');
      }
    })

    let oldItems = [...data.items];

    switch (property) {
      case 'task':
        const newTask = prompt('Task Name: ', data.items[index].task);
        if (newTask != null) {
          oldItems[index] = {
            ...oldItems[index],
            task: newTask,
          }
        } else {
          break;
        }
        break;
      case 'importance':
        const newImportance = prompt('Importance: ', data.items[index].importance);
        if (isNaN(newImportance) || newImportance < 1 || newImportance > 10) {
          alert('Importance must be a number 1-10');
          return;
        }
        oldItems[index] = {
          ...oldItems[index],
          importance: newImportance,
        }
        break;
      case 'description':
        const newDescription = prompt('Description: ', data.items[index].description);
          if (newDescription != null) {
            oldItems[index] = {
            ...oldItems[index],
            description: newDescription,
          }
        } else {
          break;
        }
        break;
      default:
        break;
    }

    await ref.set({
      title: data.title,
      items: [...oldItems],
      createdAt: data.createdAt,
      lastEditedAt: new Date(),
    });
  }

  const deleteList = async (listId) => {

    const ref = listsRef.doc(listId);

    if (window.confirm("Are you sure you want to delete this list? This action cannot be undone.")) {
      await ref.delete().then(() => {
        setSuccess(true);
      })
    } else {
      return;
    }

  }

  const addItem = (listId, title) => {
    setNewItem({
      ...newItem,
      open: true,
      list: listId,
      title: title,
    })
  }

  const postItem = async () => {

    const ref = listsRef.doc(newItem.list);

    let data;
    await ref.get().then((doc) => {
      data = doc.data();
    })
    const newTask = newItem.task;

    if (newTask === null || newTask === '') {
      alert('Task name cannot be blank');
      return;
    }

    let newImportance = newItem.importance;

    if (isNaN(newImportance) || 
    Number(newImportance) > 10 || 
    Number(newImportance) < 1 ) {
      alert('Importance must be a number 1-10');
      newImportance = 1;
    }

    const newDescription = newItem.description;

    await ref.set({
      title: data.title,
      items: data.items.concat({
        task: newTask,
        importance: newImportance,
        description: newDescription,
        completed: false
      }),
      createdAt: data.createdAt,
      lastEditedAt: new Date(),
    })

    setNewItem({
      task: '',
      importance: 0,
      description: '',
      open: false,
    });

  }

  const deleteItem = async (listId, itemId) => {

    const ref = listsRef.doc(listId);

    let data;

    await ref.get().then(doc => {
      data = doc.data();
    })

    let oldItems = [...data.items];
    oldItems.splice(itemId, 1);

    if (window.confirm('Are you sure you want to delete this? This action cannot be undone.')) {
      await ref.set({
        title: data.title,
        items: [...oldItems],
        createdAt: data.createdAt,
        lastEditedAt: new Date(),
      })
    } else {
      return;
    }
  }
  
    
  
  return (
    <div>
      {success ? <SuccessMessage /> : null}
      <p>My Lists </p>
      <p>User ID: {props.user}</p>
      {newItem.open ?
      <section className='new-item-screen'>
        <h3>{newItem.title}</h3>
        <label htmlFor='new-task-input'>Task Name: </label>
        <input 
        type='text' 
        name='new-task-input'
        value={newItem.task}
        onChange={(e) => setNewItem({...newItem, task: e.target.value})} 
        />
        <label htmlFor='new-importance-input'>Importance: </label>
        <input 
        type='number'
        min={1}
        max={10} 
        id='new-importance-input'
        name='new-importance-input'
        value={newItem.importance}
        onChange={(e) => setNewItem({...newItem, importance: e.target.value})} 
        />
        <label htmlFor='new-description-input'>Description: </label>
        <textarea 
        name='new-description-input'
        id='new-description-input'
        rows={5}
        value={newItem.description}
        onChange={(e) => setNewItem({...newItem, description: e.target.value})} 
        />
        <button id='add-item-screen-button' onClick={() => postItem()}>Add</button>
      </section>
      : null}
      <section className='user-lists-main'>
        {lists && lists.map((list) => 
          <div key={list.id}>
            <div className='list-header'>
              <h2>{list.title}</h2>
                <div className='times'>
                  <p className='list-created-at'>Created {timeToDate(list.createdAt.seconds, false)}</p>
                  <p className='list-edited-at'>{timeToDate(list.lastEditedAt ? list.lastEditedAt.seconds : 946706400, true)}</p>
                </div>
              <button className='change-title-button' onClick={() => changeTitle(list.id)}>Change Title</button>
              <button className='delete-list-button' onClick={() => deleteList(list.id)}>Delete List</button>
              <button className='add-item-button' onClick={() => addItem(list.id, list.title)}>Add Item</button>
            </div>
          <section className='user-list-full' key={list.id}>
            {list.items.map((item) => 
              <SavedListItem 
              key={list.items.indexOf(item)}
              task={item.task} 
              importance={item.importance}
              description={item.description}
              completed={item.completed ? 'True' : 'False'}
              onComplete={() => markComplete(list.id, list.items.indexOf(item))}
              onEdit={(property) => editItem(property, list.id, list.items.indexOf(item))}
              onDelete={() => deleteItem(list.id, list.items.indexOf(item))}
              />
            )}
          </section>
          </div>
        )}
      </section>
    </div>
  )
}

export default MyLists