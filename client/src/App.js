import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import "./App.css";
import About from "./Pages/About/About";
import Session from "./Pages/Session/Session";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute"; // Make sure this is correctly imported

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/session/:sessionId" element={<Session />} />
            <Route path="/session" element={<Session />} />
            <Route path="/about" element={<About />} />
          </Route>

          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
