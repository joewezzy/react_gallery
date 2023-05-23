import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import ReAuth from "./ReAuth";
import ChangeEmail from './ChangeEmail';

const AccountSettings = () => {
  const { currentUser, setModel, model, setAlert } = useAuth();
  const isPasswordProvider =
    currentUser?.providerData[0].providerId === 'password';

  const handleAction = (action) => {
    if(isPasswordProvider) {
      setModel({isOpen: true, title: 'Re-Login', content: <ReAuth {...{action}} />});
    } else {
      try {
        await reauthenticateWithPopup(currentUser, new GoogleAuthProvider());
        switch (action) {
          case 'changeEmail':
            setModel({isOpen: true, title: 'Update Email', content: <ChangeEmail />})
            break;
        
          default:
            break;
        }
      } catch (error) {
        
      }
    }
  };

  return (
    <>
      <DialogContent dividers>
        <DialogContentText>
          For security reasons, you neet to provide your credentials to do any
          of these actions:
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", gap: 2, my: 2 }}>
        {isPasswordProvider && (
          <Button onClick={() => handleAction("changePassword")}>
            Change Password
          </Button>
        )}
        <Button onClick={() => handleAction("changeEmail")}>
          Change Email
        </Button>
        <Button onClick={() => handleAction("deleteAccount")}>
          Delete Account
        </Button>
      </DialogActions>
    </>
  );
};

export default AccountSettings;
