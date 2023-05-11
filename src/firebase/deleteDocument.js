import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './config';

const deleteDocument = (collectionName, docId) => {
  return deleteDoc(doc(db, collectionName, docId));
}

export default deleteDocument