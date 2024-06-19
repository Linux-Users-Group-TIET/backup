import React from "react";
import "./Footer.css"; // Import custom CSS for styling

const Footer = () => {
  return (
    <footer className="footer bg-black text-white">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2 className="logo-text">MagicSprings</h2>
            <p>
              MagicSprings is a leading bathroom fitting company renowned for
              its innovative designs, exceptional quality, and customer-centric
              approach. Established over two decades ago, MagicSprings has
              swiftly risen to prominence in the industry, providing a wide
              range of bathroom solutions that blend functionality with style.
            </p>
            <div className="socials">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="footer-section contact-form">
            <h2>Contact Us</h2>
            <form action="#">
              <input
                type="email"
                name="email"
                className="text-input contact-input"
                placeholder="Your email address..."
              />
              <textarea
                name="message"
                className="text-input contact-input"
                placeholder="Your message..."
              ></textarea>
              <button type="submit" className="btn btn-big">
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} MagicSprings | Designed by Devang
        </div>
      </div>
    </footer>
  );
};

export default Footer;
