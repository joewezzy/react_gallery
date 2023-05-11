import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Options from "./Options";
import { Avatar, Tooltip, Typography } from "@mui/material";
import moment from "moment/moment";
import useFirestore from "../../firebase/useFirestore";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function ImagesList() {
  const docs = useFirestore();
  
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
        <ImageList variant="quilted" cols={4} rowHeight={200}>
          {docs?.map((item, index) => (
            <ImageListItem
              key={item?.id}
              cols={
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].cols
              }
              rows={
                pattern[
                  index - Math.floor(index / pattern.length) * pattern.length
                ].rows
              }
              sx={{
                opacity: ".7",
                transition: "opacity",
                curser: "pointer",
                "&:hover": { opacity: 1 },
              }}
            >
              <Options imageId={item?.id} />
              <img
                {...srcset(
                  item?.data?.imageURL,
                  200,
                  pattern[
                    index - Math.floor(index / pattern.length) * pattern.length
                  ].rows,
                  pattern[
                    index - Math.floor(index / pattern.length) * pattern.length
                  ].cols
                )}
                alt={item?.data?.uName || item?.data?.uEmail}
                loading="lazy"
              />
              <Typography
                variaint="body2"
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  color: "white",
                  background: "rbga(0,0,0,.3)",
                  p: "5px",
                  borderTopRightRadius: 8,
                }}
              >
                {moment(item?.data?.timestamp?.toDate()).fromNow()}
              </Typography>
              <Tooltip
                title={item?.data?.uName || item?.data?.uEmail}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  color: "white",
                  background: "rgba(0,0,0,.3)",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  src={item?.data?.uPhoto}
                  alt="Breakfast"
                />
              </Tooltip>
            </ImageListItem>
          ))}
        </ImageList>
      </SRLWrapper>
    </SimpleReactLightbox>
  );
}


const pattern = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 1,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
];
