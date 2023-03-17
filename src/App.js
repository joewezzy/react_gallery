import { Container } from '@mui/material'
import React from 'react'
import ImageList from './components/imageList/ImagesList'
import Nav from './components/Nav'
import Upload from './components/upload/Upload'

const App = () => {
  return (
    <Container maxWidth="lg" sx={{  textAlign: 'center', mt: '3rem' }}>
    <Nav />
    <Upload />
    <ImageList />
    </Container>
  )
}

export default App