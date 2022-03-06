import React from 'react'
import NewListForm from '../components/NewListForm'

const CreateList = (props) => {
  return (
    <div>
      <p>Create List:</p> 
      <p>{props.user}</p>
      <NewListForm firestore={props.firestore} user={props.user}/>
    </div>
  )
}

export default CreateList