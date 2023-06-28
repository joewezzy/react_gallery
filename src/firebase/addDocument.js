import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./config";

const addDocument = (collectionName, docObj, id) => {
  const docRef = doc(collection(db, collectionName), id);
  return setDoc(docRef, {
    ...docObj,
    timestamp: serverTimestamp(),
  });
};

export default addDocument;