import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import KommunicateChat from './components/Chatbot';
import { router } from "./lib/routes";

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
      <div>
        <KommunicateChat/>
      </div>
    </ChakraProvider>
  );
}

export default App;
