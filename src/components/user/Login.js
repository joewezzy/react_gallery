import { Google } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import EmailField from "./inputs/EmailField";
import PasswordField from "./inputs/PasswordField";
import SubmitButton from "./inputs/SubmitButton";
import ResetPassword from "./ResetPassword";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isRegister, setIsRegister] = useState(false);

  const {
    model,
    setModel,
    signUp,
    login,
    loginWithGoogle,
    setAlert,
    setLoading,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;


    if (isRegister) {
      const confirmPassword = confirmPasswordRef.current.value;

      try {
        if (password !== confirmPassword)
          throw new Error("Passwords don't match!");

        await signUp(email, password);
        setModel({ ...model, isOpen: false });
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
    } else {
      try {
        await login(email, password);
        setModel({ ...model, isOpen: false });
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
    }
    setLoading(false);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithGoogle();
      setModel({ ...model, isOpen: false });
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
  };

  useEffect(() => {
    if (isRegister) {
      setModel({ ...model, title: "Register" });
    } else {
      setModel({ ...model, title: "Login" });
    }
  }, [isRegister]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please enter your email and password here:
          </DialogContentText>
          <EmailField {...{ emailRef }} />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              {...{
                passwordRef: confirmPasswordRef,
                id: "confirmPassword",
                label: "Confirm Password",
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: "19px" }}>
          {isRegister ? (
            <Button hidden></Button>
          ) : (
            <Button size="smail" onClick={() => setModel({...model, title: 'Reset Password', content: <ResetPassword />})}>Forget Password? </Button>
          )}
          <SubmitButton />
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: "left", p: "5px 25px" }}>
        {isRegister
          ? "Do you have an account? Sign in now!"
          : "Don't you have an account? Create one now!"}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "login" : "Register"}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: "center", p: "24px" }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </DialogActions>
    </>
  );
};

export default Login;
