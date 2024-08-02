import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div id="services">
      <div className="container">
        <h1 className="sub-title">Areas of Interests</h1>
        <div className="services-list">
          <div>
            <i className="fas fa-code"></i>
            <h2>Project/Product Management</h2>
            <p>Experienced in leading diverse technology projects...</p>
          </div>
          <div>
            <i className="fas fa-crop-alt"></i>
            <h2>Front-end Development</h2>
            <p>Proficient in full-stack development with expertise in React Native...</p>
          </div>
          <div>
            <i className="fab fa-app-store"></i>
            <h2>Business Data Analysis</h2>
            <p>Proficient in utilizing advanced analytical tools like Python...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
