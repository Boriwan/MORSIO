import React, { useEffect, useRef, useState } from "react";
import "./ChatComponent.css";
import { getTranslationsBySession } from "../../apiService";

const ChatComponent = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [receivedMorse, setReceivedMorse] = useState("");
  const messagesEndRef = useRef(null);
  const [ws, setWs] = useState(null);

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
        setMessages(newMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let socket;

    const connectWebSocket = () => {
      socket = new WebSocket(`ws://localhost:1880/ws/morse?session=${sessionId}`);
      setWs(socket);

      socket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      socket.onmessage = (event) => {
        setReceivedMorse(event.data);
        // Optionally, you can handle incoming Morse code messages here
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed, reconnecting...");
        setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        socket.close();
      };
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [sessionId]);

  const sendCharacter = (character) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(character); // Send the character directly
    }
  };

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
          value={receivedMorse} // Bind the input value to the received Morse code
          
        />
      </div>
    </div>
  );
};

export default ChatComponent;
