import React from "react";

import { Container } from '@material-ui/core';

import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Navbar from './components/Navbar/navbar';
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import useStyles from './styles'
import Footer from './components/footer/footer'









const App = () => {
   
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  return (

    <BrowserRouter>

      <Container maxWidth="xl" className= {classes.body}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate replace to="/posts" />} />
          <Route path='/posts' exact element={<Home />} />
          <Route path='/posts/search' exact element={<Home />} />
          <Route path='/posts/:id' exact element={<PostDetails />} />

          <Route path='/auth' exact element={ (!user ? <Auth /> : <Navigate to ="/posts"/> )} />
          
        </Routes>
      <Footer/>
      </Container>
    </BrowserRouter>
  )
}




export default App;