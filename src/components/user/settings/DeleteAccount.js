import { Send } from '@mui/icons-material';
import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'
import { deleteUser } from 'firebase/auth';
import { useAuth } from '../../../context/AuthContext';
import deleteUserAccount from '../../../firebase/deleteUserAccount';

const DeleteAccount = () => {
  const {currentUser, setLoading, setAlert, setModel, model} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await deleteUserAccount('gallery', currentUser);
      await deleteUser(currentUser);
      setModel({ ...model, isOpen: false });
      setAlert({
        isAlert: true,
        severity: "success",
        message: "Your account has been deleted!",
        timeout: 8000,
        location: "main",
      });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 5000,
        location: "main",
      });
      console.log(error); 
    }
    
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