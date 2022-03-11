import React from 'react'

const HomePage = (props) => {

  console.log(JSON.stringify(props.user));

  return (
    <div>
      <h3 id='user-name-display'>{props.user.displayName}</h3>
      <p id='user-id-display'>User Id: {props.user.uid}</p>
      <p id='user-email-display'>Email: {props.user.email}</p>
    </div>
  )
}

export default HomePage