import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import About from "./Pages/About/About";
import Session from "./Pages/Session/Session";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

function App() {
  // Initialize isLoggedIn from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Effect to update local storage whenever isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />

          {isLoggedIn ? (
            <>
              <Route path="/session/:sessionId" element={<Session />} />
              <Route path="/session" element={<Session />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/session" />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
