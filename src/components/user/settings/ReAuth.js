import { DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import React, { useRef } from 'react'
import { useAuth } from '../../../context/AuthContext';
import PasswordField from '../inputs/PasswordField'
import SubmitButton from '../inputs/SubmitButton';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import DeleteAccount from './DeleteAccount';

const ReAuth = ({ action }) => {
  const {currentUser, setLoading, setAlert, setModel, model} =useAuth();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credential = EmailAuthProvider.credential(currentUser?.email, passwordRef.current.value);
    try {
      await reauthenticateWithCredential(currentUser, credential);

      switch (action) {
          case "changeEmail":
            setModel({
              ...model,
              title: "Update Email",
              content: <ChangeEmail />,
            });
            break;

          case "changePassword":
            setModel({
              ...model,
              title: "Update Password",
              content: <ChangePassword />,
            });
            break;

          case "deleteAccount":
            setModel({
              ...model,
              title: "Delete Account",
              content: <DeleteAccount />,
            });
            break;

          default:
            throw new Error('No matching action!');
        }
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

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText>Please Enter your current Password: </DialogContentText>
        <PasswordField {...{passwordRef}} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  )
}

export default ReAuth