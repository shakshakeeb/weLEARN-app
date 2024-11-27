import './App.css';
import { createBrowserRouter, RouterProivder, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Navbar from './components/Navbar';
// import Home from './components/pages/Home';
// import Forum from './components/pages/Forum';
// import Chatroom from './components/pages/Chatroom';
// import Profile from './components/pages/Profile';
import KommunicateChat from './components/Chatbot';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';

import {router} from "./lib/routes";

function App() {
  
  return (
    <>
    <ChakraProvider>
      <RouterProvider router={router} />
      <div>
        <KommunicateChat/>
      </div>
    </ChakraProvider>
    {/* <Router>
      <div>
        <KommunicateChat/>
      </div>
       <Navbar /> 
      </Router> */}
    </>
  );
}

export default App;
