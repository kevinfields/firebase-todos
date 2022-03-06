import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SavedListItem from '../components/SavedListItem';

const MyLists = (props) => {

  const listsRef = props.firestore.collection('users').doc(props.user).collection('lists');
  const query = listsRef.orderBy('title');
  const [lists] = useCollectionData(query, {idField: 'id'});

  
  return (
    <div>
      <p>My Lists: </p>
      <p>{props.user}</p>
      <section className='user-lists-main'>
        {lists && lists.map((list) => 
          <section className='user-list-full'>
            <h3>{list.title}</h3>
            {list.items.map((item) => 
              <SavedListItem 
              key={list.items.indexOf(item)}
              task={item.task} 
              importance={item.importance}
              description={item.description}
              />
            )}
          </section>
        )}
      </section>
    </div>
  )
}

export default MyLists