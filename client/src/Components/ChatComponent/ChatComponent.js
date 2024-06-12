import React, { useEffect, useRef, useState } from "react";
import "./ChatComponent.css";
import {
  getTranslationsBySession,
  createTranslation,
  getSession,
  getMorse,
  getCurrentTranslation,
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
    .split("  ")
    .map((word) =>
      word
        .split(" ")
        .map((code) => morseCode[code] || "")
        .join("")
    )
    .join(" ");
};

const ChatComponent = ({ sessionId, morseCode, setMorseCode }) => {
  const [messages, setMessages] = useState([]);
  const [sessionName, setSessionName] = useState("");
  const [receivedTranslation, setReceivedTranslation] = useState("");
    const [receivedMorse, setReceivedMorse] = useState("");
  const messagesEndRef = useRef(null);

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

    const fetchData = async () => {
      try {
        const morseData = await getMorse();
        const transData = await getCurrentTranslation();
        setReceivedTranslation(transData);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    // Initial fetch
    fetchMessages();
    fetchData();

    // Set up the interval
    intervalId = setInterval(() => {
      fetchMessages();
    }, 1200); // refresh every 1200 milliseconds

    // Cleanup function to clear the interval
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [sessionId, messages]); // Dependency array includes sessionId to re-initiate on change

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
