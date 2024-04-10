import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Vítejte na domovské stránce</h1>
      <Link to="/about">O nás</Link>
    </div>
  );
}

export default Home;