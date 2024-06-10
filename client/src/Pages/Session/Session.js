import React, { useState, useEffect } from "react";
import "./Session.css";
import ChatComponent from "../../Components/ChatComponent/ChatComponent";
import MorsioSheet from "../../Components/MorsioSheet/MorsioSheet";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import SessionList from "../../Components/SessionList/SessionList";
import { getTranslationsBySession } from "../../apiService";
import { useNavigate, useParams } from "react-router-dom";

function Session() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();
  const { sessionId } = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      if (sessionId) {
        try {
          const sessionData = await getTranslationsBySession(sessionId);
          setMessages(
            sessionData.map((data) => ({
              morse: data.morseCode.join(" "),
              text: data.translation,
            }))
          );
        } catch (error) {
          console.error("Failed to fetch session data:", error);
        }
      }
      setTimeout(() => {
        setLoading(false); // Hide loading spinner after 1 second
      }, 1500);
    };

    fetchMessages();
  }, [sessionId]);

  return (
    <>
      {loading && <LoadingAnimation />} {/* Display the loading spinner */}
      <div className="session-list">
        <SessionList onSelectSession={(id) => navigate(`/session/${id}`)} />
      </div>
      <div className="session-page">
        <div className="session-page-container">
          <ChatComponent messages={messages} sessionId={sessionId} />
        </div>
      </div>
      <div className="morsio-cheatsheet">
        <MorsioSheet />
      </div>
    </>
  );
}

export default Session;
