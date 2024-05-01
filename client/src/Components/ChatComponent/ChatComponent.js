import React, { useEffect, useRef } from 'react';
import './ChatComponent.css';

const ChatComponent = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="chat-page-container">
        <h1>Session</h1>
        <div className="message-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${index === messages.length - 1 ? "latest-message" : ""}`}>
              <p><strong>Morse:</strong> {msg.morse}</p>
              <p><strong>Text:</strong> {msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Případně můžete přidat input field pokud chcete umožnit psaní Morse kódu přímo v chatu */}
        <input
          type="text"
          className="morse-input"
          placeholder="Enter Morse code here... (Use '/' to denote space between words)"
          // zde přidáte logiku pro odesílání zpráv, pokud je to požadováno
        />
      </div>
    </div>
  );
};

export default ChatComponent;
