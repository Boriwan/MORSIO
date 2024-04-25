import React, { useState } from "react";
import "../EditSessionModal/EditSessionModal.css";

function EditSessionModal({ isOpen, onClose, session, onSave }) {
  const [sessionName, setSessionName] = useState(session ? session.name : "");

  const handleSave = () => {
    if (session) {
      onSave(session.id, sessionName);
      onClose(); // Zavření modálního okna po uložení
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Rename Session</h2>
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSave} className="modal-action-button">
            Save Changes
          </button>
          <button onClick={onClose} className="modal-action-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSessionModal;
