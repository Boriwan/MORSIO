import React from "react";
import "./Session.css";
import ChatComponent from "../../Components/ChatComponent/ChatComponent";

function Session(props) {
  return (
    <div className="session-page">
      <div className="session-page-container">
        <ChatComponent/>
      </div>
    </div>
  );
}

export default Session;
