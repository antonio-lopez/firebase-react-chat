const ChatMessage = ({ message, auth }) => {
  const { text, uid, photoURL } = message;
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
};

export default ChatMessage;
