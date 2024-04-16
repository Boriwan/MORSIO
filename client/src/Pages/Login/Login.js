import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Zde byste zpracovávali přihlášení (např. ověření s backendem)
    navigate('/home');  // Přesměrování po úspěšném přihlášení
  }

  return (
    <div className="container mt-5">
      <h1>Přihlášení</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Uživatelské jméno</label>
          <input
            type="text"
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
        </div>
        <button type="submit" className="btn btn-primary">Přihlásit se</button>
        <button type="button" className="btn btn-link" onClick={() => navigate('/register')}>Registrace</button>
      </form>
    </div>
  )
}

export default Login;
