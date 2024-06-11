import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./SessionList.css";
import img from "../../images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCog,
  faInfoCircle,
  faPencilAlt,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import EditSessionModal from "../EditSessionModal/EditSessionModal";
import ProfileModal from "../ProfileModal/ProfileModal";
import {
  logoutUser,
  listSessions,
  addNewSession,
  deleteSession,
  editSession,
} from "../../apiService";

function SessionList({ onSelectSession }) {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  const { sessionId } = useParams();
  const navigate = useNavigate();

 useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await listSessions();
        setSessions(data.reverse());  
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    if (sessionId) {
      setActiveSessionId(sessionId);
    }
  }, [sessionId]);

  const handleSessionClick = (sessionId) => {
    setActiveSessionId(sessionId);
    if (onSelectSession) {
      onSelectSession(sessionId);
    } else {
      navigate(`/session/${sessionId}`);
    }
  };

  const handleLogout = async () => {
    await logoutUser(navigate);
  };

  const addSession = async () => {
    try {
      const sessionName = `New Session ${sessions.length + 1}`;
      const newSession = await addNewSession(sessionName);
      setSessions([newSession, ...sessions]);
    } catch (error) {
      console.error("Failed to add session:", error);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      setSessions(sessions.filter((session) => session.id !== sessionId));
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  const handleEditClick = (id) => {
    const sessionToEdit = sessions.find((session) => session.id === id);
    setEditingSession(sessionToEdit);
    setIsModalOpen(true);
  };

  const handleSave = async (id, newName) => {
    try {
      await editSession(id, newName);
      const updatedSessions = sessions.map((session) =>
        session.id === id ? { ...session, name: newName } : session
      );
      setSessions(updatedSessions);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to edit session:", error);
    }
  };

  return (
    <>
      <div className="session-list-container">
        <div className="session-list-header">
          <img src={img} alt="Morsio Logo" className="session-list-logo" />
          <h1 className="session-list-h1">Morsio</h1>
        </div>
        <div className="session-list-body">
          <h2 className="session-list-title">Session List</h2>
          <button onClick={addSession} className="session-add-btn">
            Add new session
          </button>
          <div className="session-list-sessions">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => handleSessionClick(session.id)}
                className={`session-item ${
                  session.id === activeSessionId ? "active-session" : ""
                }`}
              >
                <span className="session-item-text">{session.name}</span>
                <div className="session-btn-group">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(session.id);
                    }}
                    className="session-edit-btn"
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSession(session.id);
                    }}
                    className="session-delete-btn"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="session-list-footer">
          <button onClick={handleLogout} className="icon logout-icon">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
          <FontAwesomeIcon
            icon={faCircleUser}
            className="icon profile-icon"
            onClick={() => setIsProfileModalOpen(true)}
          />
          <Link to="/about">
            <FontAwesomeIcon icon={faInfoCircle} className="icon info-icon" />
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <EditSessionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          session={editingSession}
          onSave={handleSave}
        />
      )}

      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          username="test"
          email="test"
        />
      )}
    </>
  );
}

export default SessionList;
