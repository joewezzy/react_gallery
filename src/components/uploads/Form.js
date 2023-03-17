import { Fab, Input } from "@mui/material";
import { Add } from "@mui/icons-material";
import React from "react";

const Form = () => {
  const fileRef = React.useRef();
  
  const handleClick = () => {
    fileRef.current.click();
  }

  return (
    <form>
      <Input title="file" multiple sx={{ display: "none" }} InputRef={fileRef} />
      <Fab color="primay" aria-label="add" onClick={handleClick}>
        <Add fontSize="large" />
      </Fab>
    </form>
  );
};

export default Form;
