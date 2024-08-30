import React from 'react';
import './Contact.css';
import emailjs from 'emailjs-com';

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
      .then((result) => {
          console.log(result.text);
          document.getElementById('msg').innerHTML = "Message sent successfully";
          setTimeout(() => {
            document.getElementById('msg').innerHTML = "";
          }, 5000);
          e.target.reset();
      }, (error) => {
          console.log(error.text);
          document.getElementById('msg').innerHTML = "Message sending failed";
          setTimeout(() => {
            document.getElementById('msg').innerHTML = "";
          }, 5000);
      });
  };

  return (
    <div id="contact">
      <div className="container">
        <div className="row">
          <div className="contact-left">
            <h1 className="sub-title">Contact Me!</h1>
            <footer>
              <div id="footer-links">
                <a href="tel:(608) 622-0120" target="_blank">
                  <img src="/images/phone.png" alt="Phone" />
                </a>
                <a href="mailto:taenam356@outlook.com" target="_blank">
                  <img src="/images/email.png" alt="Email" />
                </a>
                <a href="https://www.linkedin.com/in/taenamkim/" target="_blank">
                  <img src="/images/linkedin1.png" alt="LinkedIn" />
                </a>
                <a href="https://github.com/taenam1214" target="_blank">
                  <img src="/images/github.png" alt="GitHub" />
                </a>
              </div>
            </footer>
            <div className="social-icons">
              <a href="https://facebook.com/"><i className="fab fa-facebook"></i></a>
              <a href=""><i className="fab fa-twitter-square"></i></a>
              <a href=""><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/taenamkim/"><i className="fab fa-linkedin"></i></a>
            </div>
            <a href="/images/Taenam_Resume_SW_Final.pdf" download className="btn btn2">Download CV</a>
          </div>
          <div className="contact-right">
            <form id="contact-form" onSubmit={sendEmail}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" rows="6" placeholder="Your Message"></textarea>
              <button type="submit" className="btn btn2">Submit</button>
            </form>
            <span id="msg"></span>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>©Hire me!<i className="fas fa-heart"></i> by <a>Taenam Kim</a></p>
      </div>
    </div>
  );
};

export default Contact;
