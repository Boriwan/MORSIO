import React, { useState } from 'react';
import './MorsioSheet.css'; // Ujistěte se, že tento soubor obsahuje výše uvedený CSS

function MorsioSheet() {
  const [isOpen, setIsOpen] = useState(true);

  // Funkce pro přepnutí stavu
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`morsio-sheet ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleSidebar} className="toggle-button">
        {isOpen ? '<<' : '>>'}
      </button>
      {isOpen && (
        <>
          <h2>Cheat sheet</h2>
          <div className='morse-item'>A</div>
          <div className='morse-item'>A</div>

          <div className='morse-item'>A</div>

          <div className='morse-item'>A</div>

          <div className='morse-item'>A</div>

          <div className='morse-item'>A</div>


        </>
      )}
    </div>
  );
}

export default MorsioSheet;