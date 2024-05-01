import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apiService";
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
    <div className="container mt-5">
      <h1>Log in</h1>
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
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/register")}
        >
          Regiser
        </button>
      </form>
    </div>
  );
}

export default Login;
