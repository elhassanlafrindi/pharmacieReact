import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from '../context/UserContext'; //blach mnha
import About from './about/about';
import Contact from './contact/contact';
import Services from "./service/services";
import Home from './home/homen';
import Error from './error/error';
import Policy from './policy/Policy';
import Maps from './maps/maps';
import List from './list/list';
import Footer from './footer/footer';
import Article from './article/article';
import Connection from './connection/connection';
import Signup from './signup/signup';
import SignUpSuccess from './signup/succes';
import Forg from './forg'
function App() {
  return (
    <UserProvider> 
      <List />
      <Routes>
        <Route path="/forg" element={<Forg />} />
        <Route path="/succes" element={<SignUpSuccess />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/article" element={<Article />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
