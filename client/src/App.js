import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./Pages/About/About";
import Session from "./Pages/Session/Session";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import SessionList from "./Components/SessionList/SessionList";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="session-list">
          <SessionList />
        </div>
        <Routes>
          <Route exact path="/" element={<Session />} />
          <Route path="/session" element={<Session />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
