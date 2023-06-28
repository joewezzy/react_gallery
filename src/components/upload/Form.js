import { AddAPhoto } from "@mui/icons-material";
import { Fab, Input } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import Login from "../../components/user/Login";

const Form = ({ setFiles }) => {
  const { currentUser, setModel } = useAuth();
  const fileRef = React.useRef();

  const handleClick = () => {
    (!currentUser) && setModel({ isOpen: true, title: "Login", content: <Login /> });
    fileRef.current.click();
  };

  const handleChange = (e) => {
    setFiles([...e.target.files]);
    fileRef.current.value = null;
  };

  return (
    <form>
      <Input
        type="File"
        inputProps={{ multiple: true }}
        sx={{ display: "none" }}
        inputRef={fileRef}
        onChange={handleChange}
      />
      <Fab color="primary" arial-label="add Image" onClick={handleClick}>
        <AddAPhoto fontSize="medium" />
      </Fab>
    </form>
  );
};

export default Form;
