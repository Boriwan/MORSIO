import React, { useEffect, useRef, useState } from "react";
import "./ChatComponent.css";
import {
  getTranslationsBySession,
  createTranslation,
  getSession,
} from "../../apiService";

const morseToText = (morse) => {
  const morseCode = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
  };

  return morse
    .split("  ") // Split at double spaces for words
    .map((word) =>
      word
        .split(" ") // Split at single spaces for characters
        .map((code) => morseCode[code] || "")
        .join("")
    )
    .join(" "); // Join words with space
};

const ChatComponent = ({ sessionId, mess, morseCode, setMorseCode }) => {
  const [messages, setMessages] = useState([]);
  const [receivedMorse, setReceivedMorse] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [receivedTranslation, setReceivedTranslation] = useState("");
  const messagesEndRef = useRef(null);
  const [morseWs, setMorseWs] = useState(null);
  const [translationWs, setTranslationWs] = useState(null);

  useEffect(() => {
    const translatedText = morseToText(morseCode);
    setReceivedTranslation(translatedText);
  }, [morseCode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let intervalId;
  
    const fetchMessages = async () => {
      try {
        const data = await getTranslationsBySession(sessionId);
        const sessionInfo = await getSession(sessionId);
        setSessionName(sessionInfo.name);
        const newMessages = data.map((msg) => ({
          morse: msg.morseCode.join(" "),
          text: msg.translation,
        }));
        // Update messages only if there are new ones
        if (JSON.stringify(messages) !== JSON.stringify(newMessages)) {
          setMessages(newMessages);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
  
    // Initial fetch
    fetchMessages();
  
    // Set up the interval
    intervalId = setInterval(() => {
      fetchMessages();
    }, 200); // refresh every 200 milliseconds
  
    // Cleanup function to clear the interval
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [sessionId, messages]); // Dependency array includes sessionId to re-initiate on change
  

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
        setMorseCode(event.data);
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



  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    const input = event.target.value;
    const validInput = input.replace(/[^.\- ]/g, ""); // Only allow dots, dashes, and spaces
    setMorseCode(validInput);
    const translatedText = morseToText(validInput);
    setReceivedTranslation(translatedText);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(morseCode, receivedTranslation); // Use morseCode for sending message
      setMorseCode(""); // Clear the Morse code input
      setReceivedTranslation("");
    }
  };

  const sendMessage = async (morse, translation) => {
    const newMessage = { morse, text: translation };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      await createTranslation(sessionId, morse, translation);
    } catch (error) {
      console.error("Failed to send translation:", error);
    }

    if (morseWs && morseWs.readyState === WebSocket.OPEN) {
      morseWs.send(morse);
    }

    if (translationWs && translationWs.readyState === WebSocket.OPEN) {
      translationWs.send(translation);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-page-container">
        <h1>{sessionName}</h1>
        <div className="message-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                index === messages.length - 1 ? "latest-message" : ""
              }`}
            >
              <p className="morse-code">{msg.morse}</p>
              <div className="line"></div>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="translation-container">
          <input
            type="text"
            className="morse-input"
            placeholder="Enter Morse code here..."
            value={morseCode}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            style={{
              fontFamily: "Consolas, 'Courier New', monospace",
              fontWeight: "bold",
              color: "black",
            }}
          />
          <input
            className="morse-input"
            type="text"
            placeholder="Your current translation"
            value={receivedTranslation}
            style={{ color: "grey", fontStyle: "italic" }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
