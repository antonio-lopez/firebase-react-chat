import React from 'react';
import ChatRoom from './components/ChatRoom';
import './App.css';
// firebase SDK
import firebase from 'firebase/app';
import 'firebase/firestore'; // for database
import 'firebase/auth'; // user authentication
// Hooks that make it easier to use firebase in react
import { useAuthState } from 'react-firebase-hooks/auth';

// reference made as global variables
const auth = firebase.auth();
// const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className='app'>
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>
        {/* if user is logged in, show chatroom, else, show sign in */}
        {user ? <ChatRoom auth={auth} /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  // user will click the Sign In With Google button and be provided a popup to sign in
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button className='sign-in' onClick={signInWithGoogle}>
      Sign In With Google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default App;
