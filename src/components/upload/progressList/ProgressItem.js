import { CheckCircleOutlined } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { v4 as uuidv4 } from 'uuid';
import uploadFileProgress from "../../../firebase/uploadFileProgress";
import addDocument from "../../../firebase/addDocument";
import { useAuth } from "../../../context/AuthContext";

const ProgressItem = ({file}) => {
  const [progress, setProgress] = React.useState(50);
  const [imageUrl, setImageUrl] = React.useState(null);

  const {currentUser, setAlert } = useAuth();

  React.useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + '.' + file.name.split('.').pop();
      try {
        const url = await uploadFileProgress(file, `gallery/${currentUser.uid}`, imageName, setProgress);
        const  galleryDoc = {
          imageURL: url,
          uid: currentUser?.uid || '',
          uEmail: currentUser?.email || '',
          uName: currentUser?.displayName || '',
          uPhoto: currentUser?.photoURL || '',
        }
        await addDocument('user', galleryDoc, imageName);
        setImageUrl(null);
      } catch (error) {
        setAlert({
          isAlert: true,
          severity: 'error',
          message: error.message,
          timeout: 8000,
          location: 'main',
        });
        console.log(error);
      } 
    }
    setImageUrl(URL.createObjectURL(file));
    uploadImage();
  }, [file]);
  
  return (
    imageUrl && <ImageListItem cols={1} rows={1}>
      <img
        src={imageUrl}
        alt="gallery"
        loading="lazy"
      />
      <Box sx={backDrop}>
        {progress < 100 ? (
          <CircularProgressWithLabel value={progress} />
        ) : (
          <CheckCircleOutlined
            sx={{ width: 60, heigth: 60, color: "lightGreen" }}
          />
        )}
      </Box>
    </ImageListItem>
  );
};

export default ProgressItem;

const backDrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,.3)",
};
