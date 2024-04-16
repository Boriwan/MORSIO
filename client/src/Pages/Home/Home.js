import React from "react";
import "../../App.css";
import Session from "../Session/Session";
import SessionList from "../../Components/SessionList/SessionList";
import MorsioSheet from "../../Components/MorsioSheet/MorsioSheet";
import { useState } from "react";

function Home() {

    const [isOpen, setIsOpen] = useState(true);

    // Funkce pro přepnutí stavu
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

  return (
    <div>
      <div className="App">
        <div className="session-list">
          <SessionList />
        </div>
        <Session />
        
        <MorsioSheet isOpen={isOpen} toggleSidebar={toggleSidebar} />
        
      </div>
    </div>
  );
}

export default Home;
