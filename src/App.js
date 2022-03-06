import './App.css';
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import SignIn from './pages/SignIn';
import UserHome from './pages/UserHome';

firebase.initializeApp({
  apiKey: "AIzaSyAa1EcQ1qdgwlZ-q_zNzax-NGexI4tv5Wk",
  authDomain: "todos-app-a7bbc.firebaseapp.com",
  projectId: "todos-app-a7bbc",
  storageBucket: "todos-app-a7bbc.appspot.com",
  messagingSenderId: "807244410365",
  appId: "1:807244410365:web:698fd49ae107c930003d94"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);
  console.log('user info: ' + JSON.stringify(user));

  return (
    <div className="App">
      <section className='main-screen'>
        { user ? <UserHome user={user} firestore={firestore}/> : <SignIn auth={auth}/>}
      </section>
    </div>
  );
}

export default App;
