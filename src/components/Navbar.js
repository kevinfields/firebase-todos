import React from 'react'
import {Route, Routes, Link} from 'react-router-dom';
import CreateList from '../pages/CreateList';
import HomePage from '../pages/HomePage';
import MyLists from '../pages/MyLists';
import SignOut from '../pages/SignOut';

const Navbar = (props) => {

  return (
    <div className='user-home-nav'>
      <p>{props.user.displayName}</p>
      <section className='nav-links'>
        <p>
          <Link className='nav-link' to='/create-list'>Create List</Link>
          <Link className='nav-link' to='/my-lists'>My Lists</Link>
          <Link className='nav-link' to='/sign-out'>Sign Out</Link>
        </p>
      </section>
      <Routes>
        <Route exact path='/' element={<HomePage user={props.user} /> } />
        <Route path='/create-list' element={<CreateList user={props.user.uid} firestore={props.firestore}/>} />
        <Route path='/my-lists' element={<MyLists user={props.user.uid} firestore={props.firestore} />} />
        <Route path='/sign-out' element={<SignOut auth={props.auth} />} />
      </Routes>
    </div>
  );

}

export default Navbar