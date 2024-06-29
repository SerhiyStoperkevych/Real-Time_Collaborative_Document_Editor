import React, { useEffect, useState } from 'react';
import { firestore, timestamp } from '../services/firebase';

const Chat = ({ documentId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection(`documents/${documentId}/messages`)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(data);
      });
    return () => unsubscribe();
  }, [documentId]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    firestore.collection(`documents/${documentId}/messages`).add({
      text: newMessage,
      createdAt: timestamp,
      user: {
        displayName: currentUser.displayName,
        uid: currentUser.uid,
      },
    });
    setNewMessage('');
  };

  return (
    <div>
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <strong>{message.user.displayName}</strong>: {message.text}
          </li>
        ))}
      </ul>
      <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
