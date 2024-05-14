import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apiService";
import Logo from '../../images/Logo.png'; // Import logo
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
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
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
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
