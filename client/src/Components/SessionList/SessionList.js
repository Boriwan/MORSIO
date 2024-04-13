import React from "react";
import "./SessionList.css";
import { Link } from "react-router-dom";
import img from "../../images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCog,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

function SessionList() {
  return (
    <div className="session-list-container">
      <div className="session-list-header">
        <img src={img} alt="Morsio Logo" className="session-list-logo" />
        <h1 className="session-list-h1">Morsio</h1>
      </div>
      <div className="session-list-body">
        <h2 className="session-list-title">Session List</h2>
        <Link to="/" className="session-link">
          <button className="session-add-btn">
            Add new session
          </button>
        </Link>
        <div className="session-list-sessions">
          <p>A</p>
          <p>A</p>
          <p>A</p>
          <p>A</p>
          <p>A</p>
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
  );
}

export default SessionList;
