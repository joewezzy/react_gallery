import { DialogActions, DialogContent, DialogContentText } from '@mui/material'
import React, { useRef } from 'react'
import { useAuth } from '../../../context/AuthContext';
import EmailField from '../inputs/EmailField'
import SubmitButton from '../inputs/SubmitButton';

const ChangeEmail = () => {
  const {currentUser, setLoading, setAlert, setModel, model0} =useAuth();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText>Please Enter your new Email: </DialogContentText>
        <EmailField {...{emailRef, defaultValue: currentUser?.email}} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  )
}

export default ChangeEmail