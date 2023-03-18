import React from "react";
import Form from "./Form";
import ProgressList from "./progressList/ProgressList";

const Upload = () => {
  const [files, setFiles] =React.useState([])
  return (
    <div>
      <Form setFiles={setFiles} />
      <ProgressList files={files}/>
    </div>
  );
};

export default Upload;
