import React, { useState } from 'react';
import './Session.css';
import ChatComponent from '../../Components/ChatComponent/ChatComponent';
import MorsioSheet from '../../Components/MorsioSheet/MorsioSheet';
import SessionList from '../../Components/SessionList/SessionList';
import { getTranslationsBySession } from '../../apiService';

function Session() {
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSelectSession = async (sessionId) => {
    setCurrentSessionId(sessionId);
    try {
      const sessionData = await getTranslationsBySession(sessionId);
      setMessages(sessionData.map(data => ({
        morse: data.morseCode.join(" "),
        text: data.translation
      })));
    } catch (error) {
      console.error('Failed to fetch session data:', error);
    }
  };

  return (
    <>
      <div className="session-list">
        <SessionList onSelectSession={handleSelectSession} />
      </div>
      <div className="session-page">
        <div className="session-page-container">
          <ChatComponent messages={messages} />
        </div>
      </div>
      <div className="morsio-cheatsheet">
        <MorsioSheet />
      </div>
    </>
  );
}

export default Session;
