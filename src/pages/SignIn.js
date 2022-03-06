import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const SignIn = (props) => {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  }
  return (
      <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

export default SignIn