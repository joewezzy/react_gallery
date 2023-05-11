import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { storage } from "./config";

const deleteFile = (filePath) => {
  const imageRef = ref(storage, filePath);
  return deleteObject(imageRef);
};

export default deleteFile;
