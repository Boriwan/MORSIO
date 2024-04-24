// Author.js
import React from 'react';
import './Author.css'; 

function Author({ name, surname, position, photo }) {
  return (
    <div className="author-card">
      <img src={photo} alt={`${name} ${surname}`} className="author-photo"/>
      <h3 className="author-name">{name} {surname}</h3>
      <p className="author-position">{position}</p>
    </div>
  );
}

export default Author;
