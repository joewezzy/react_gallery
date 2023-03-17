import { Container } from "@mui/material";
import ImageList from "./components/imageLists/ImagesList";
import Nav from "./components/Nav";
import Upload from "./components/uploads/Upload";

function App() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: '3rem' }}>
    <Nav />
    <Upload />
    <ImageList />
    </Container>
  );
}

export default App;
