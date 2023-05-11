import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { db } from "./config";

const useFirestore = (collectionName = "gallery") => {
  const [doc, setDoc] = React.useState([]);

  React.useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, data: doc.data() });
        });
        console.log(docs);
        setDoc(docs);
      },
      (error) => {
        alert(error.message);
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return doc;
};

export default useFirestore;
