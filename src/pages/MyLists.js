import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';

const MyLists = (props) => {

  const listsRef = props.firestore.collection('users').doc(props.user).collection('lists');
  const query = listsRef.orderBy('title');
  const [lists] = useCollectionData(query, {idField: 'id'});

  
  return (
    <div>
      <p>My Lists: </p>
      <p>{props.user}</p>
      <section>
        {lists && lists.map((list) => 
          <section>
            <h3>{list.title}</h3>
            {list.items.map((item) => 
              <>
              <p>Task: {item.task}</p>
              <p>Importance: {item.importance}</p>
              <p>Description: {item.description}</p>
              </>
            )}
          </section>
        )}
      </section>
    </div>
  )
}

export default MyLists