import React, { useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import firebase from 'firebase/app';
import firestore from '../firebase';
import 'firebase/firestore'; // for database
import 'firebase/auth'; // user authentication
// Hooks that make it easier to use firebase in react
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatRoom = ({ auth }) => {
  const scrollToCurrent = useRef();

  // reference a firestore collection
  const messagesRef = firestore.collection('messages');
  // query documents in a collection
  const query = messagesRef.orderBy('createdAt').limit(25); // limit to 25 messages

  // listen to data update in realtime with a hook
  const [messages] = useCollectionData(query, { idField: 'id' });
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
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} auth={auth} />
            ))}
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
};

export default ChatRoom;
