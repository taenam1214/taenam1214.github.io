import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="about-col-1">
            <img src="/images/user.png" alt="User" />
          </div>
          <div className="about-col-2">
            <h1 className="sub-title">About Me</h1>
            <p>Hi! I'm Taenam Kim, Computer Science student at the University of Wisconsin, Madison</p>
            <div className="tab-titles">
              <p
                className={`tab-links ${activeTab === 'skills' ? 'active-link' : ''}`}
                onClick={() => openTab('skills')}
              >
                Skills
              </p>
              <p
                className={`tab-links ${activeTab === 'experience' ? 'active-link' : ''}`}
                onClick={() => openTab('experience')}
              >
                Experience
              </p>
              <p
                className={`tab-links ${activeTab === 'education' ? 'active-link' : ''}`}
                onClick={() => openTab('education')}
              >
                Education
              </p>
            </div>
            <div className={`tab-contents ${activeTab === 'skills' ? 'active-tab' : ''}`} id="skills">
              <ul>
                <li><span>Project Management</span><br />Asana, Jira, Slab, Confluence</li>
                <li><span>FrontEnd</span><br />JavaScript, React, React Native, Next.js</li>
                <li><span>BackEnd</span><br />TypeScript, GraphQL, MongoDB, Go, mySQL</li>
                <li><span>Data Analysis</span><br />Python & R programming</li>
                <li><span>Others</span><br />Java, C, SQL</li>
              </ul>
            </div>
            <div className={`tab-contents ${activeTab === 'experience' ? 'active-tab' : ''}`} id="experience">
              <ul>
                <li><span>June 2024 - Current</span><br />Software Engineer at Forbes</li>
                <li><span>May 2024 - Current</span><br />AI Research intern at People and Robotics</li>
                <li><span>September 2023 - Current</span><br />Developing a Social Media application called Social To Do</li>
                <li><span>June 2023 - August 2023</span><br />Data Analyst intern at Societe Generale Corporate and Investment Banking</li>
              </ul>
            </div>
            <div className={`tab-contents ${activeTab === 'education' ? 'active-tab' : ''}`} id="education">
              <ul>
                <li><span>University of Wisconsin, Madison: BS Computer Science</span><br />Graduating on December 2024</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
