import React, { useEffect, useRef, useState } from "react";
import "./ChatComponent.css";
import { getTranslationsBySession } from "../../apiService";

const ChatComponent = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [receivedMorse, setReceivedMorse] = useState("");
  const [receivedTranslation, setReceivedTranslation] = useState("");
  const messagesEndRef = useRef(null);
  const [morseWs, setMorseWs] = useState(null);
  const [translationWs, setTranslationWs] = useState(null);

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
    let morseSocket;
    let translationSocket;

    const connectWebSocket = () => {
      morseSocket = new WebSocket(
        `ws://localhost:1880/ws/morse?session=${sessionId}`
      );
      setMorseWs(morseSocket);

      translationSocket = new WebSocket(
        `ws://localhost:1880/ws/translation?session=${sessionId}`
      );
      setTranslationWs(translationSocket);

      morseSocket.onopen = () => {
        console.log("Morse WebSocket connection opened");
      };

      morseSocket.onmessage = (event) => {
        setReceivedMorse(event.data);
      };

      morseSocket.onclose = () => {
        console.log("Morse WebSocket connection closed, reconnecting...");
        setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
      };

      morseSocket.onerror = (error) => {
        console.error("Morse WebSocket error:", error);
        morseSocket.close();
      };

      translationSocket.onopen = () => {
        console.log("Translation WebSocket connection opened");
      };

      translationSocket.onmessage = (event) => {
        setReceivedTranslation(event.data);
      };

      translationSocket.onclose = () => {
        console.log("Translation WebSocket connection closed, reconnecting...");
        setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
      };

      translationSocket.onerror = (error) => {
        console.error("Translation WebSocket error:", error);
        translationSocket.close();
      };
    };

    connectWebSocket();

    return () => {
      if (morseSocket) {
        morseSocket.close();
      }
      if (translationSocket) {
        translationSocket.close();
      }
    };
  }, [sessionId]);

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
                <strong>Morse code:</strong> {msg.morse}
              </p>
              <div className="line"></div>
              <p>
                <strong>Translation:</strong> {msg.text}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <input
          type="text"
          className="morse-input"
          placeholder="Enter Morse code here... (Use 'DOUBLE SPACE' to denote space between words)"
          value={`${receivedMorse} ${
            receivedTranslation ? `(${receivedTranslation})` : ""
          }`}
          style={{
            color: receivedTranslation ? "grey" : "black",
            fontStyle: receivedTranslation ? "italic" : "bold",
          }}
        />
      </div>
    </div>
  );
};

export default ChatComponent;
