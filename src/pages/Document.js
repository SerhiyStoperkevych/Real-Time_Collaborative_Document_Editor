import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, timestamp } from '../services/firebase';
import Editor from '../components/Editor';
import Chat from '../components/Chat';

const Document = ({ currentUser }) => {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore.collection('documents').doc(id)
      .onSnapshot((snapshot) => {
        setDocumentData(snapshot.data());
      });
    return () => unsubscribe();
  }, [id]);

  const saveDocument = (content) => {
    firestore.collection('documents').doc(id).set({
      ...documentData,
      content,
      updatedAt: timestamp,
    });
  };

  if (!documentData) return <div>Loading...</div>;

  return (
    <div>
      <h2>{documentData.title}</h2>
      <Editor initialValue={documentData.content} onSave={saveDocument} />
      <Chat documentId={id} currentUser={currentUser} />
    </div>
  );
};

export default Document;
