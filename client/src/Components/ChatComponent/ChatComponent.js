import React, {useState} from "react";
import "./ChatComponent.css";

const morseToText = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
  "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
  "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
  ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
  "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
  "--..": "Z", "/": " "  // Use '/' to denote space between words
};

const ChatComponent = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && input.trim() !== "") {
      const translation = input.trim().split(" ").map(code => morseToText[code] || "?").join("");
      const newMessage = { morse: input.trim(), text: translation };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };
   return (
    <div className="chat-page">
      <div className="chat-page-container">
        <h1>Session</h1>
        
        <div className="message-container">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <p><strong>Morse:</strong> {msg.morse}</p>
              <p><strong>Text:</strong> {msg.text}</p>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter Morse code here..."
          className="morse-input"
        />
      </div>
    </div>
  );
};

export default ChatComponent;
