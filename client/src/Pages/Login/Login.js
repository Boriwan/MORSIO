import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../apiService';
import "./Login.css";

function Login({ setIsLoggedIn }) { // Přidání prop pro setIsLoggedIn
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const data = await loginUser(username, password);
      console.log(data);
      setIsLoggedIn(true); // Aktualizace stavu isLoggedIn
      navigate('/session');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Přihlášení</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Uživatelské jméno</label>
          <input
            type="email"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Heslo</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-danger">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Přihlásit se</button>
        <button type="button" className="btn btn-link" onClick={() => navigate('/register')}>Registrace</button>
      </form>
    </div>
  );
}

export default Login;
