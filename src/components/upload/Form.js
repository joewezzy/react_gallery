import { AddAPhoto } from "@mui/icons-material";
import { Fab, Input } from "@mui/material";
import React from "react";

const Form = ({setFiles}) => {
  const fileRef = React.useRef();

  const handleClick = () => {
    fileRef.current.click();
  }

  const handleChange = (e) => {
    setFiles([...e.target.files])
    fileRef.current.value = null;
  }

  return (
    <form>
      <Input type="File" inputProps={{ multiple:true }} sx={{ display: "none" }} inputRef={fileRef} onChange={handleChange} />
      <Fab color="primary" arial-label="add Image" onClick={handleClick}>
        <AddAPhoto fontSize="medium" />
      </Fab>
    </form>
  );
};

export default Form;
