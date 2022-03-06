import React from 'react'
import Navbar from '../components/Navbar'

const UserHome = (props) => {
  return (
    <div>
      <Navbar user={props.user} firestore={props.firestore}/>
    </div>
  )
}

export default UserHome