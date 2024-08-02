import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div id="header">
      <div className="container">
        <nav>
          <img src="/images/logo.png" className="logo" alt="Logo" />
          <ul id="sidemenu" className={menuOpen ? 'open' : ''}>
            <li><a href="#header">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Interests</a></li>
            <li><a href="#portfolio">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <i className="fas fa-times" onClick={toggleMenu}></i>
          </ul>
          <i className="fas fa-bars" onClick={toggleMenu}></i>
        </nav>
        <div className="header-text">
          <h1>Hi! I'm <span>Taenam,</span><br />student at UW-Madison</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
