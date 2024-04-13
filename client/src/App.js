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
<<<<<<< HEAD
        <SessionList/>
        <div className={`chat-component ${isOpen ? '' : 'closed'}`}>
          <ChatComponent/>
        </div>
          <MorsioSheet isOpen={isOpen} toggleSidebar={toggleSidebar} />
=======
        <div className={`session-list ${isOpen ? "" : "closed"}`}>
          <SessionList />
        </div>
        <Routes>
          <Route exact path="/" element={<Session />} />
          <Route path="/session" element={<Session />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <div className={`morsio-sheet ${isOpen ? "" : "closed"}`}>
          <MorsioSheet isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>
>>>>>>> d64c067f77c69b8bb29753445ece51a8d88ecee7
      </div>
    </Router>
  );
}

export default App;
