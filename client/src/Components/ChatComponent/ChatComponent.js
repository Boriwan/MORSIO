import React, { useEffect, useRef, useState } from "react";
import "./ChatComponent.css";
import { getTranslationsBySession } from "../../apiService";

const ChatComponent = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getTranslationsBySession(sessionId);
        const newMessages = data.map((msg) => ({
          morse: msg.morseCode.join(" "),
          text: msg.translation,
        }));
        if (newMessages.length > messages.length) {
          setMessages(newMessages);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    const intervalId = setInterval(fetchMessages, 200);

    return () => clearInterval(intervalId);
  }, [sessionId, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="chat-page-container">
        <h1>Session</h1>
        <div className="message-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                index === messages.length - 1 ? "latest-message" : ""
              }`}
            >
              <p>
                <strong>Morse:</strong> {msg.morse}
              </p>
              <div className="line"></div>
              <p>
                <strong>Text:</strong> {msg.text}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <input
          type="text"
          className="morse-input"
          placeholder="Enter Morse code here... (Use 'DOUBLE SPACE' to denote space between words)"
        />
      </div>
    </div>
  );
};

export default ChatComponent;
