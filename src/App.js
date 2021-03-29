import React, { useRef, useState } from 'react';
// firebase SDK
import firebase from 'firebase/app';
import firestore from './firebase';
import 'firebase/firestore'; // for database
import 'firebase/auth'; // user authentication
import './App.css';

// Hooks that make it easier to use firebase in react
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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
        {user ? <ChatRoom /> : <SignIn />}
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

function ChatRoom() {
  const scrollToCurrent = useRef();

  // reference a firestore collection
  const messagesRef = firestore.collection('messages');
  // query documents in a collection
  const query = messagesRef.orderBy('createdAt').limit(25);

  // listen to data update in realtime with a hook
  const [messages] = useCollectionData(query, { idField: 'id' });
  // jj
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    scrollToCurrent.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        <div>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </div>

        <span ref={scrollToCurrent}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={photoURL || 'https://ui-avatars.com/api/?background=random'}
          alt='user avatar'
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
