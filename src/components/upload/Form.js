import { AddAPhoto } from "@mui/icons-material";
import { Fab, Input } from "@mui/material";
import React from "react";

const Form = () => {
  const fileRef = React.useRef();

  const handleClick = () => {
    fileRef.current.click();
  }

  return (
    <form>
      <Input type="File" multiple sx={{ display: "none" }} inputRef={fileRef} />
      <Fab color="primary" arial-label="add Image" onClick={handleClick}>
        <AddAPhoto fontSize="medium" />
      </Fab>
    </form>
  );
};

export default Form;
