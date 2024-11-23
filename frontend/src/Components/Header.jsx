import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <img 
        src="https://cdn.pixabay.com/photo/2016/04/02/16/52/globe-1303192_1280.jpg"
        alt="Header Image"
        className="header-image"
      />
    </header>
  );
}

export default Header;