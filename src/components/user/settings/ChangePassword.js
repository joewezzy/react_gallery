import { DialogActions, DialogContent, DialogContentText } from '@mui/material'
import React, { useRef } from 'react'
import { useAuth } from '../../../context/AuthContext';
import PasswordField from '../inputs/PasswordField'
import SubmitButton from '../inputs/SubmitButton';

const ChangePassword = () => {
  const {currentUser, setLoading, setAlert, setModel, model0} =useAuth();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText>Please Enter your new Password: </DialogContentText>
        <PasswordField {...{passwordRef}} />
        <PasswordField {...{passwordRef: confirmPasswordRef, id: 'confirmPassword', label: 'Confirm Password'}} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  )
}

export default ChangePassword