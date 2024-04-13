import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./Pages/About/About";
import Session from "./Pages/Session/Session";
import SessionList from "./Components/SessionList/SessionList";
import MorsioSheet from "./Components/MorsioSheet/MorsioSheet";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  // Funkce pro přepnutí stavu
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="App">
        <div className='session-list'>
          <SessionList />
        </div>
        <Routes>
          <Route exact path="/" element={<Session />} />
          <Route path="/session" element={<Session />} />
          <Route path="/about" element={<About />} />
        </Routes>
          <MorsioSheet isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    </Router>
  );
}

export default App;
