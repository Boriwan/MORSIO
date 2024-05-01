import React, { useState, useEffect } from 'react';
import './Session.css';
import ChatComponent from '../../Components/ChatComponent/ChatComponent';
import MorsioSheet from '../../Components/MorsioSheet/MorsioSheet';
import SessionList from '../../Components/SessionList/SessionList';
import { getTranslationsBySession } from '../../apiService';
import { useNavigate, useParams } from 'react-router-dom'; // Přidáno useParams pro získání parametrů z URL

function Session() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { sessionId } = useParams(); // Získáváme sessionId z URL

  useEffect(() => {
    const fetchMessages = async () => {
      if (sessionId) {
        try {
          const sessionData = await getTranslationsBySession(sessionId);
          setMessages(sessionData.map(data => ({
            morse: data.morseCode.join(" "),
            text: data.translation
          })));
        } catch (error) {
          console.error('Failed to fetch session data:', error);
        }
      }
    };

    fetchMessages();
  }, [sessionId]);

  return (
    <>
      <div className="session-list">
        <SessionList onSelectSession={(id) => navigate(`/session/${id}`)} />
      </div>
      <div className="session-page">
        <div className="session-page-container">
          <ChatComponent messages={messages} sessionId={sessionId} /> {/* Předáváme sessionId do ChatComponent */}
        </div>
      </div>
      <div className="morsio-cheatsheet">
        <MorsioSheet />
      </div>
    </>
  );
}

export default Session;
