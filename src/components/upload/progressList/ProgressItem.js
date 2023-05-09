import { CheckCircleOutlined } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const ProgressItem = ({file}) => {
  const [progress, setProgress] = React.useState(50);
  const [imageUrl, setImageUrl] = React.useState(null);

  React.useEffect(() => {
    setImageUrl(URL.createObjectURL(file));
  }, [file]);
  
  return (
    <ImageListItem cols={1} rows={1}>
      <img
        src={imageUrl}
        alt="gallery"
        loading="lazy"
      />
      <Box sx={backDrop}>
        {progress < 100 ? (
          <CircularProgressWithLabel value={progress} />
        ) : (
          <CheckCircleOutlined
            sx={{ width: 60, heigth: 60, color: "lightGreen" }}
          />
        )}
      </Box>
    </ImageListItem>
  );
};

export default ProgressItem;

const backDrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,.3)",
};
