import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apiService"; // Importujte funkci pro registraci
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
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
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
          <label htmlFor="userName" className="form-label">
            Username
          </label>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
