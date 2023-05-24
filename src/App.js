import { Container } from "@mui/material";
import React from "react";
import ImageList from "./components/imageList/ImagesList";
import Loading from "./components/Loading";
import MainNotification from "./components/MainNotification";
import Model from "./components/Model";
import Nav from "./components/Nav";
import Upload from "./components/upload/Upload";
import AuthContext from "./context/AuthContext";

const App = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: "3rem" }}>
      <AuthContext>
      <Loading />
        <Model />
        <MainNotification />
        <Nav />
        <Upload />
        <ImageList />
      </AuthContext>
    </Container>
  );
};

export default App;
