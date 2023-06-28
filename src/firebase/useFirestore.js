import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "./config";

const useFirestore = (collectionName = "gallery") => {
  const [doc, setDoc] = React.useState([]);
  const { setAlert } = useAuth();

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
        setDoc(docs);
      },
      (error) => {
        setAlert({
          isAlert: true,
          severity: "error",
          message: error.message,
          timeout: 8000,
          location: "main",
        });
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return doc;
};

export default useFirestore;
