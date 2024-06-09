import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apiService";
import Logo from "../../images/Logo.png";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await loginUser(email, password);
      console.log(data);
      setIsLoggedIn(true);
      navigate("/session");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="header">
        <img src={Logo} alt="Logo" className="logo" />
        <h2 className="app-name">Morsio</h2>
      </div>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              placeholder="Your e-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-danger">{error}</div>}
          </div>
          <div className="button-group">
            <button
              type="button"
              className="btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button type="submit" className="btn confirm_button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
