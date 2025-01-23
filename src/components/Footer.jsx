import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelopeSquare } from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="https://github.com/edemarest" target="_blank" rel="noopener noreferrer">
          <FaGithub className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/ella-demarest-b48553189/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="social-icon" />
        </a>
        <a href="https://twitter.com/PhantomMisty" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="social-icon" />
        </a>
        <a href="mailto:ellajdemarest@gmail.com">
          <FaEnvelopeSquare className="social-icon" />
        </a>
      </div>

      {/* Footer Text */}
      <p className="footer-text">© {new Date().getFullYear()} Ella Demarest. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
