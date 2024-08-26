import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <div id="portfolio">
      <div className="container">
        <h1 className="sub-title">Projects</h1>
        <div className="work-list">
          <div className="work">
            <img src="/images/work-1.png" alt="Social-To-Do" />
            <div className="layer">
              <h3>Social-To-Do</h3>
              <p>A React Native application that uniquely merges task management with social media features</p>
              <a href="https://github.com/A9ine/Social-To-Do" target="_blank" rel="noopener noreferrer">
                <img src="/images/github3.png" alt="GitHub link" className="github-icon" />
              </a>
            </div>
          </div>
          <div className="work">
            <img src="/images/work-2.png" alt="Beyond the Book" />
            <div className="layer">
              <h3>Beyond the Book</h3>
              <p>A project I led at HackIOWA, is a Python Gradio-based application to </p>
              <a href="https://github.com/washedPat/beyond_the_book" target="_blank" rel="noopener noreferrer">
                <img src="/images/github3.png" alt="GitHub link" className="github-icon" />
              </a>
            </div>
          </div>
          <div className="work">
            <img src="/images/go.webp" alt="TaskMaster: Go" />
            <div className="layer">
              <h3>TaskMaster: Go</h3>
              <p>Lightweight and secure task management API built with Go.</p>
              <a href="https://github.com/taenam1214/TaskMaster-Go" target="_blank" rel="noopener noreferrer">
                <img src="/images/github3.png" alt="GitHub link" className="github-icon" />
              </a>
            </div>
          </div>
          <div className="work">
            <img src="/images/work-3.jpeg" alt="Crypto Wallet Adoption" />
            <div className="layer">
              <h3>Crypto Wallet Adoption</h3>
              <p>Utilized Python for data analysis to identify key factors driving adoption...</p>
              <a href="https://github.com/taenam1214/CryptoWalletAdoption" target="_blank" rel="noopener noreferrer">
                <img src="/images/github3.png" alt="GitHub link" className="github-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
