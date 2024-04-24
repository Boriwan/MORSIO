import React from "react";
import "./About.css";
import SessionList from "../../Components/SessionList/SessionList";

function About() {
  return (
    <>
      <div className="session-list">
        <SessionList />
      </div>
      <div className="about-page">
        <div className="about-page-container">
          <h1>About MORSIO</h1>
          <p>This is...</p>
          <div className="about-page-footer">
            <p>Morsio ver. 0.1</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
