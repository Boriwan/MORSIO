import React, { useState } from "react";
import "./SessionList.css";
import { Link } from "react-router-dom";
import img from "../../images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCog,
  faInfoCircle,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import EditSessionModal from "../EditSessionModal/EditSessionModal";

function SessionList() {
  const [sessions, setSessions] = useState(["New session", "New session"]); // Příklad počátečních hodnot

  // Funkce pro přidání nové session
  const addSession = () => {
    
    const newSession = `New session`; // Vytvoří unikátní název pro novou session
    setSessions([...sessions, newSession]); // Přidá novou session do seznamu
  };

  const deleteSession = (sessionId) => {
    setSessions(sessions.filter((session, index) => index !== sessionId));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  const handleEditClick = (index) => {
    const sessionToEdit = sessions[index];
    setEditingSession({ ...sessionToEdit, id: index });
    setIsModalOpen(true);
  };

  const handleSave = (id, newName) => {
    const updatedSessions = sessions.map((session, index) => {
      if (index === id) {
        return newName; // Změníme jméno session
      }
      return session;
    });
    setSessions(updatedSessions);
    setIsModalOpen(false);
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
            {sessions.map((session, index) => (
              <Link to="/session" className="session-list-tile-link">
                <div key={index} className="session-item">
                  <span className="session-item-text">{session}</span>
                  <div className="session-btn-group">
                    <button
                      onClick={() => handleEditClick(index)}
                      className="session-edit-btn"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button
                      onClick={() => deleteSession(index)}
                      className="session-delete-btn"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="session-list-footer">
          <FontAwesomeIcon icon={faCircleUser} className="icon profile-icon" />
          <Link to="/about">
            <FontAwesomeIcon icon={faInfoCircle} className="icon info-icon" />
          </Link>

          <FontAwesomeIcon icon={faCog} className="icon settings-icon" />
        </div>
      </div>
      
      <EditSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        session={editingSession}
        onSave={handleSave}
      />
    </>
  );
}

export default SessionList;
