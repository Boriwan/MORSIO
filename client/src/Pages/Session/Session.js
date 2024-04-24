import { React, useState } from "react";
import "./Session.css";
import ChatComponent from "../../Components/ChatComponent/ChatComponent";
import MorsioSheet from "../../Components/MorsioSheet/MorsioSheet";
import SessionList from "../../Components/SessionList/SessionList";

function Session(props) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="session-list">
        <SessionList />
      </div>
      <div className="session-page">
        <div className="session-page-container">
          <ChatComponent />
        </div>
      </div>
      <div className="morsio-cheatsheet">
        <MorsioSheet isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    </>
  );
}

export default Session;
