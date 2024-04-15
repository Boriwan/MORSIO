import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css"; 

function Register() {
  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Here you would handle the registration logic, like sending data to the backend
    console.log("Registration data:", data);
    navigate('/home'); // Redirect to /home after successful registration
  }

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="userName"
            value={data.userName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
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
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <button type="button" className="btn btn-link" onClick={() => navigate('/login')}>Login</button>
      </form>
    </div>
  );
}

export default Register;
