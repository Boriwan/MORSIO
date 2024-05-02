// ProfileModal.js
import React from "react";
import './ProfileModal.css'; // Přidáno vlastní CSS

const ProfileModal = ({ isOpen, onClose, username, email }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="profile-modal-close-btn">X</button>
        <h2>User Profile</h2>
        <div className="user-info">
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
        <div className="modal-actions">
          <button className="modal-action-button" onClick={() => {}}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
