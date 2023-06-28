import {
  Avatar,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Input,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SubmitButton from "./inputs/SubmitButton";
import { v4 as uuidv4 } from "uuid";
import UploadFile from "../../firebase/UploadProfileImageFile";
import { updateProfile } from "firebase/auth";
import deleteFile from "../../firebase/deleteFile";
import updateUserRecords from "../../firebase/updateUserRecords";
import CropEasy from "../crop/CropEasy";
import Crop from "@mui/icons-material/Crop";
import { useEffect } from "react";

const Profile = () => {
  const { currentUser, setLoading, setAlert, model, setModel } = useAuth();
  const [name, setName] = useState(currentUser?.displayName);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);
  const [openCrop, setOpenCrop] = useState(false);

  const handleFileChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let userObj = { displayName: name };
    let imagesObj = { uName: name };

    const currentUserUID = currentUser?.uid;

    try {
      if (file) {
        const imageName = uuidv4() + "." + file?.name?.split(".")?.pop();
        const filePath = "profile/" + currentUserUID + "/" + imageName;
        const url = await UploadFile(file, filePath);

        //TODO: delete the previous profile image of the user.

        if (currentUser?.photoURL) {
          const prevImage = currentUser?.photoURL
            ?.split(`${currentUserUID}%2F`)[1]
            .split("?")[0];

          if (prevImage) {
            try {
              await deleteFile(`profile/${currentUserUID}/${prevImage}`);
            } catch (error) {
              console.log(error);
            }
          }
        }

        userObj = { ...userObj, photoURL: url };
        imagesObj = { ...imagesObj, uPhoto: url };
      }

      await updateProfile(currentUser, userObj);

      // TODO: updage gallery images documents related to this user.

      await updateUserRecords("gallery", currentUserUID, imagesObj);

      setAlert({
        isAlert: true,
        severity: "success",
        message: "Profile updated!!",
        timeout: 3000,
        location: "model",
      });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 5000,
        location: "model",
      });
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    openCrop
      ? setModel({ ...model, title: "Crop Profile Photo" })
      : setModel({ ...model, title: "Update Profile Photo" });
  }, [openCrop]);

  return !openCrop ? (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText>
          You can update your profile by editing these fields:
        </DialogContentText>
        <TextField
          autoFocus
          variant="standard"
          margin="normal"
          type="text"
          inputProps={{ minLength: 2 }}
          value={name || ""}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="profilePhoto">
            <Input
              type="file"
              accept="image/*"
              id="profilePhoto"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Avatar
              src={photoURL}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>
          {file && (
            <IconButton
              aria-label="Crop"
              color="primary"
              onClick={() => setOpenCrop(true)}
            >
              <Crop />
            </IconButton>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  ) : (
    <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
  );
};

export default Profile;
