import React, { useState, useEffect } from "react";
import "./MorsioSheet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function MorsioSheet({onMorseInput}) {
  const [isOpen, setIsOpen] = useState(true);
  const [ws, setWs] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Create a WebSocket connection
    const socket = new WebSocket("ws://localhost:1880/ws/cheatsheet");
    setWs(socket);

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const sendCharacter = (character) => {
    console.log(character);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(character); // Send the character directly
    }
  };

  // Define the alphabet and numbers with their corresponding Morse code
  const charactersMorsePairs = [
    { character: "A", code: ".-" },
    { character: "B", code: "-..." },
    { character: "C", code: "-.-." },
    { character: "D", code: "-.." },
    { character: "E", code: "." },
    { character: "F", code: "..-." },
    { character: "G", code: "--." },
    { character: "H", code: "...." },
    { character: "I", code: ".." },
    { character: "J", code: ".---" },
    { character: "K", code: "-.-" },
    { character: "L", code: ".-.." },
    { character: "M", code: "--" },
    { character: "N", code: "-." },
    { character: "O", code: "---" },
    { character: "P", code: ".--." },
    { character: "Q", code: "--.-" },
    { character: "R", code: ".-." },
    { character: "S", code: "..." },
    { character: "T", code: "-" },
    { character: "U", code: "..-" },
    { character: "V", code: "...-" },
    { character: "W", code: ".--" },
    { character: "X", code: "-..-" },
    { character: "Y", code: "-.--" },
    { character: "Z", code: "--.." },
    { character: "0", code: "-----" },
    { character: "1", code: ".----" },
    { character: "2", code: "..---" },
    { character: "3", code: "...--" },
    { character: "4", code: "....-" },
    { character: "5", code: "....." },
    { character: "6", code: "-...." },
    { character: "7", code: "--..." },
    { character: "8", code: "---.." },
    { character: "9", code: "----." },
  ];

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
          <div className="morse-list">
            {charactersMorsePairs.map((pair, index) => (
              <div
                key={index}
                className="morse-item"
                data-character={pair.character}
                data-code={pair.code}
                onClick={() => onMorseInput(pair.code)}              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MorsioSheet;
