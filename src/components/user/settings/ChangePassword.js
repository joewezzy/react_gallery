import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { updatePassword } from "firebase/auth";
import React, { useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import PasswordField from "../inputs/PasswordField";
import SubmitButton from "../inputs/SubmitButton";

const ChangePassword = () => {
  const { currentUser, setLoading, setAlert, setModel, model } = useAuth();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (passwordRef.current.value !== confirmPasswordRef.current.value)
        throw new Error("Passwords do not match");
      await updatePassword(currentUser, passwordRef.current.value);
      setModel({ ...model, isOpen: false });
      setAlert({
        isAlert: true,
        severity: "success",
        message: "Your password has been updated!",
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
        <DialogContentText>Please Enter your new Password: </DialogContentText>
        <PasswordField {...{ passwordRef }} />
        <PasswordField
          {...{
            passwordRef: confirmPasswordRef,
            id: "confirmPassword",
            label: "Confirm Password",
          }}
        />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ChangePassword;