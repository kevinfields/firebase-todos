import React from 'react'
import {Route, Routes, Link} from 'react-router-dom';
import CreateList from '../pages/CreateList';
import HomePage from './HomePage';
import MyLists from '../pages/MyLists';

const Navbar = (props) => {

  return (
    <div className='user-home-nav'>
      <p>{props.user.displayName}</p>
      <section className='nav-links'>
        <p><Link className='nav-link' to='/create-list'>Create List</Link><Link className='nav-link' to='/my-lists'>My Lists</Link></p>
      </section>
      <Routes>
        <Route exact path='/' element={<HomePage user={props.user} /> } />
        <Route path='/create-list' element={<CreateList user={props.user.uid} firestore={props.firestore}/>} />
        <Route path='/my-lists' element={<MyLists user={props.user.uid} firestore={props.firestore} />} />
      </Routes>
    </div>
  );

}

export default Navbar