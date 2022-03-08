import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SavedListItem from '../components/SavedListItem';

const MyLists = (props) => {

  const listsRef = props.firestore.collection('users').doc(props.user).collection('lists');
  const query = listsRef.orderBy('createdAt', 'desc');
  const [lists] = useCollectionData(query, {idField: 'id'});

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
    });
    
  }
  
  return (
    <div>
      <p>My Lists: </p>
      <p>{props.user}</p>
      <section className='user-lists-main'>
        {lists && lists.map((list) => 
          <section className='user-list-full' key={list.id}>
            <h3>{list.title}</h3>
            {list.items.map((item) => 
              <SavedListItem 
              key={list.items.indexOf(item)}
              task={item.task} 
              importance={item.importance}
              description={item.description}
              completed={item.completed ? 'True' : 'False'}
              onComplete={() => markComplete(list.id, list.items.indexOf(item))}
              />
            )}
          </section>
        )}
      </section>
    </div>
  )
}

export default MyLists