import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import SessionList from './Components/SessionList/SessionList';
import ChatComponent from './Components/ChatComponent/ChatComponent'
import MorsioSheet from './Components/MorsioSheet/MorsioSheet';
import { useState } from 'react';

function App() {

  const [isOpen, setIsOpen] = useState(true);

  // Funkce pro přepnutí stavu
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="App">
      <div className={`session-list ${isOpen ? '' : 'closed'}`}>
        <SessionList/>
        </div>
        <div className={`chat-component ${isOpen ? '' : 'closed'}`}>
          <ChatComponent/>
        </div>
        <div className={`morsio-sheet ${isOpen ? '' : 'closed'}`}>
          <MorsioSheet isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>
        
      </div>
    </Router>
  );
}

export default App;