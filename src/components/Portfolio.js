import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <div id="portfolio">
      <div className="container">
        <h1 className="sub-title">Projects</h1>
        <div className="work-list">
        {/* <div className="work">
            <img src="/images/work-1.png" alt="Social-To-Do" />
            <div className="layer">
              <h3>Social-To-Do</h3>
              <p>React Native app designed to seamlessly blend productivity with social engagement. It offers a unique platform where users can not only manage their tasks efficiently but also connect with friends, share progress, and interact through a social feed.</p>
              <a href="https://github.com/A9ine/Social-To-Do" target="_blank" rel="noopener noreferrer">
                <img src="/images/github3.png" alt="GitHub link" className="github-icon" />
              </a>
            </div>
          </div> */}
          
          <div className="work">
            <img src="/images/work-1.png" alt="Social-To-Do" />
            <div className="layer">
              <h3>Social-To-Do</h3>
              <p>React Native app designed to seamlessly blend productivity with social engagement. It offers a unique platform where users can not only manage their tasks efficiently but also connect with friends, share progress, and interact through a social feed.</p>
              <a href="https://github.com/A9ine/Social-To-Do" target="_blank" rel="noopener noreferrer">
                <img src="/images/github3.png" alt="GitHub link" className="github-icon" />
              </a>
            </div>
          </div>
          <div className="work">
            <img src="/images/work-2.png" alt="Beyond the Book" />
            <div className="layer">
              <h3>Beyond the Book</h3>
              <p>A project I led at HackIOWA, Python-powered application built with Gradio that analyzes hidden university costs through data processing and visualization, helping students make informed financial decisions by revealing overlooked expenses like rent and groceries. </p>
              <a href="https://github.com/washedPat/beyond_the_book" target="_blank" rel="noopener noreferrer">
                <img src="/images/github3.png" alt="GitHub link" className="github-icon" />
              </a>
            </div>
          </div>
          <div className="work">
            <img src="/images/go.webp" alt="TaskMaster: Go" />
            <div className="layer">
              <h3>TaskMaster: Go</h3>
              <p>A secure RESTful API built with Go, offering JWT-based user authentication and PostgreSQL-powered task management with full CRUD functionality.</p>
              <a href="https://github.com/taenam1214/TaskMaster-Go" target="_blank" rel="noopener noreferrer">
                <img src="/images/github3.png" alt="GitHub link" className="github-icon" />
              </a>
            </div>
          </div>
          <div className="work">
            <img src="/images/work-3.jpeg" alt="Crypto Wallet Adoption" />
            <div className="layer">
              <h3>Crypto Wallet Adoption</h3>
              <p>Used Python and CSV for data analysis to identify key factors driving crypto wallet adoption, revealing correlations with internet access, economic growth, education, and financial inclusion to inform targeted user engagement strategies.</p>
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
