import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Options from "./Options";
import { Avatar, Tooltip, Typography } from "@mui/material";
import moment from "moment/moment";
import useFirestore from "../../firebase/useFirestore";
import { useState } from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
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
              <Options
                imageId={item?.id}
                uid={item?.data?.uid}
                imageURL={item?.data?.imageURL}
              />
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
                alt={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
                loading="lazy"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
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
                title={item?.data?.uName || item?.data?.uEmail?.split("@")[0]}
                sx={{
                  position: "absolute",
                  bottom: "3px",
                  right: "3px",
                  cursor: "pointer",
                }}
              >
                <Avatar src={item?.data?.uPhoto} alt="Breakfast" />
              </Tooltip>
            </ImageListItem>
          ))}
        </ImageList>
        {isOpen && (
          <Lightbox 
          mainSrc={docs[photoIndex]?.data?.imageURL}
          nextSrc={docs[(photoIndex + 1) % docs.length]?.data?.imageURL}
          prevSrc={docs[(photoIndex + docs.length -1) % docs.length]?.data?.imageURL}
          onCloseRequest={() => setIsOpen(false)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % docs.length)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + docs.length - 1) % docs.length)}
          imageTitle={docs[photoIndex]?.data?.uName}
          imageCaption={docs[photoIndex]?.data?.uName}
          />
        )}
      </>
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
