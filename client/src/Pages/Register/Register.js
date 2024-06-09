import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apiService"; // Importujte funkci pro registraci
import Logo from "../../images/Logo.png"; // Import logo
import "./Register.css";

function Register() {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // Přidání stavové proměnné pro chybu
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const result = await registerUser(
        data.userName,
        data.email,
        data.password,
        data.confirmPassword,
        "user"
      );
      console.log("Registration successful:", result);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === "string"
      ) {
        setError(error.response.data);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        setError(error.response.data.error);
      } else {
        setError(
          "Failed to register due to server error. Please try again later."
        );
      }
    }
  };

  return (
    <div className="register-page">
      <div className="header">
        <img src={Logo} alt="Logo" className="logo" />
        <h2 className="app-name">Morsio</h2>
      </div>
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="example@email.com"
              value={data.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="userName"
              placeholder="John Doe"
              value={data.userName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm password"
              value={data.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {error && <div className="text-danger mt-2">{error}</div>}
          </div>
          <div className="button-group">
            <button
              type="button"
              className="btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button type="submit" className="btn confirm_button">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
