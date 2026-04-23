import React from "react";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div><strong>Campus Helpdesk</strong> &middot; Kuwait University</div>
        <div className="footer-links">
          <a href="#help">Help</a>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Campus Helpdesk. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
