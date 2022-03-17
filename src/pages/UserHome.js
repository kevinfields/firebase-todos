import React from 'react'
import Navbar from '../components/Navbar';

const UserHome = (props) => {
  return (
    <div id='user-home'>
      <Navbar user={props.user} firestore={props.firestore} auth={props.auth}/>
    </div>
  )
}

export default UserHome