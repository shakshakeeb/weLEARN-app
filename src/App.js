import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Forum from './components/pages/Forum';
import Chatroom from './components/pages/Chatroom';
import Profile from './components/pages/Profile';
import KommunicateChat from './components/Chatbot';

function App() {
  return (
    <>
    <Router>
      <div>
        <KommunicateChat/>
      </div>
      <Navbar />
      <Routes>
        <Route path='/' exact component={Home} />
        <Route path='/' exact component={Forum} />
        <Route path='/' exact component={Chatroom} />
        <Route path='/' exact component={Profile} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
