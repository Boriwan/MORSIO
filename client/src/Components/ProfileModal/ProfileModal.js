import React, { useState, useEffect } from "react";
import "./ProfileModal.css";

const ProfileModal = ({ isOpen, onClose, username, email }) => {
  const [battery, setBattery] = useState(null);
  const [batteryStatus, setBatteryStatus] = useState(null);

  useEffect(() => {
    const batterySocket = new WebSocket("ws://localhost:1880/ws/battery");
    const batteryStatusSocket = new WebSocket(
      "ws://localhost:1880/ws/batteryStatus"
    );

    batterySocket.onopen = () => {
      console.log("Battery WebSocket connection opened");
    };

    batterySocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBattery(data.battery);
    };

    batterySocket.onclose = () => {
      console.log("Battery WebSocket connection closed");
    };

    batterySocket.onerror = (error) => {
      console.error("Battery WebSocket error:", error);
    };

    batteryStatusSocket.onopen = () => {
      console.log("Battery Status WebSocket connection opened");
    };

    batteryStatusSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBatteryStatus(data.batteryStatus);
    };

    batteryStatusSocket.onclose = () => {
      console.log("Battery Status WebSocket connection closed");
    };

    batteryStatusSocket.onerror = (error) => {
      console.error("Battery Status WebSocket error:", error);
    };

    return () => {
      batterySocket.close();
      batteryStatusSocket.close();
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>User Profile</h2>
        <div className="user-info">
          <p>
            <strong>Username:</strong> {username || "Unavailable"}
          </p>
          <p>
            <strong>Email:</strong> {email || "Unavailable"}
          </p>
          <p>
            <strong>Battery at </strong> {battery || "Unavailable"} %
          </p>
          <p>
            <strong>Status: </strong> {batteryStatus || "Unavailable"}
          </p>
        </div>
        <div className="modal-actions">
          <button className="modal-action-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
