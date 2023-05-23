import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React from 'react'
import { db } from './config';

const updateUserRecords = (collectionName, uid, updatedObj) => {
  return new Promise( async (res, rej) => {
    const q = query(collection(db, collectionName), where('uid', '==', uid));
    try {
      const snapshot = await getDocs(q);
      const updatePromises = [];
      snapshot.forEach(document => {
        updatePromises.push(updateDoc(doc(db, collectionName, document.id), updatedObj));
      });

      await Promise.all(updatePromises);
      res();
    } catch (error) {
      rej(error);
    }
  });
}

export default updateUserRecords