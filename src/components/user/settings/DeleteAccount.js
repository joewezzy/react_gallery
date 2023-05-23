import { Send } from '@mui/icons-material';
import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import React from 'react'
import { useAuth } from '../../../context/AuthContext';

const DeleteAccount = () => {
  const {currentUser, setLoading, setAlert, setModel, model0} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText>Are you sure to delete your account? This action isn't revisible. </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' endIcon={<Send />} type='submit'>
        Confirm
        </Button>
      </DialogActions>
    </form>
  )
}

export default DeleteAccount