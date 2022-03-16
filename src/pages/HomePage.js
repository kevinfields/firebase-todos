import React from 'react'

const HomePage = (props) => {


  return (
    <div className='no-route-screen'>
      <h2 className='home-screen-message'>Welcome! Choose one of the above tabs to get started.</h2>
      <section className='nr-user-info'>
        <p id='user-info-head'>User Info</p>
        <h3 id='user-name-display'>{props.user.displayName}</h3>
        <p id='user-id-display'>User Id: {props.user.uid}</p>
        <p id='user-email-display'>Email: {props.user.email}</p>
      </section>
    </div>
  )
}

export default HomePage