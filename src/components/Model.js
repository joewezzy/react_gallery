import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Notify from "./Notify";

const Model = () => {
  const {
    model,
    setModel,
    alert: { location, isAlert },
    setAlert,
  } = useAuth();

  const handleClose = () => {
    setModel({ ...model, isOpen: false });
  };

  useEffect(() => {
    if (model.isOpen === false) {
      if (isAlert && location === "model") {
        setAlert({ ...alert, isAlert: false });
      }
    }
  }, [model?.isOpen]);

  return (
    <Dialog open={model.isOpen} onClose={handleClose}>
      <DialogTitle>
        {model.title}
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      {location === "model" && <Notify />}
      {model.content}
    </Dialog>
  );
};

export default Model;
