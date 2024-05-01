import React, { useState } from "react";
import "./MorsioSheet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function MorsioSheet() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`morsio-sheet ${isOpen ? "open" : "closed"}`}>
      <div className="buttonClose">
        <button onClick={toggleSidebar} className="toggle-button">
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronRight} color="white" />
          ) : (
            <FontAwesomeIcon icon={faChevronLeft} color="white" />
          )}
        </button>
      </div>

      {isOpen && (
        <>
          <h2>Cheat sheet</h2>
          <div className="morse-item" data-letter="A" data-code=".-"></div>
          <div className="morse-item" data-letter="B" data-code="-..."></div>
          <div className="morse-item" data-letter="C" data-code="-.-."></div>
          <div className="morse-item" data-letter="D" data-code="-.."></div>
          <div className="morse-item" data-letter="E" data-code="."></div>
          <div className="morse-item" data-letter="F" data-code="..-."></div>
          <div className="morse-item" data-letter="G" data-code="--."></div>
          <div className="morse-item" data-letter="H" data-code="...."></div>
          <div className="morse-item" data-letter="I" data-code=".."></div>
          <div className="morse-item" data-letter="J" data-code=".---"></div>
          <div className="morse-item" data-letter="K" data-code="-.-"></div>
          <div className="morse-item" data-letter="L" data-code=".-.."></div>
          <div className="morse-item" data-letter="M" data-code="--"></div>
          <div className="morse-item" data-letter="N" data-code="-."></div>
          <div className="morse-item" data-letter="O" data-code="---"></div>
          <div className="morse-item" data-letter="P" data-code=".--."></div>
          <div className="morse-item" data-letter="Q" data-code="--.-"></div>
          <div className="morse-item" data-letter="R" data-code=".-."></div>
          <div className="morse-item" data-letter="S" data-code="..."></div>
          <div className="morse-item" data-letter="T" data-code="-"></div>
          <div className="morse-item" data-letter="U" data-code="..-"></div>
          <div className="morse-item" data-letter="V" data-code="...-"></div>
          <div className="morse-item" data-letter="W" data-code=".--"></div>
          <div className="morse-item" data-letter="X" data-code="-..-"></div>
          <div className="morse-item" data-letter="Y" data-code="-.--"></div>
          <div className="morse-item" data-letter="Z" data-code="--.."></div>
        </>
      )}
    </div>
  );
}

export default MorsioSheet;
