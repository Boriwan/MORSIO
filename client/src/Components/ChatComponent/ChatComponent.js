import React, { useEffect, useRef, useState } from 'react';
import './ChatComponent.css';
import { getTranslationsBySession } from '../../apiService'; // Předpokládám správnou cestu k vaší API službě

const ChatComponent = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log(sessionId);
        const data = await getTranslationsBySession(sessionId);
        setMessages(data.map(msg => ({
          morse: msg.morseCode.join(" "),
          text: msg.translation
        })));
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    const intervalId = setInterval(fetchMessages, 200); // Dotazování každých 200 ms

    // Vyčištění intervalu při odstranění komponenty
    return () => clearInterval(intervalId);
  }, [sessionId]); // Závislost na sessionId zajistí, že interval se resetuje, pokud se změní ID session

  useEffect(() => {
    scrollToBottom(); // Scroll po každé aktualizaci zpráv
  }, [messages]);

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
          <div ref={messagesEndRef} />
        </div>
        <input
          type="text"
          className="morse-input"
          placeholder="Enter Morse code here... (Use '/' to denote space between words)"
          // Zde můžete přidat logiku pro odeslání zpráv, pokud je to požadováno
        />
      </div>
    </div>
  );
};

export default ChatComponent;
