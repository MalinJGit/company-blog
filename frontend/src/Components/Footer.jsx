import React from 'react';
import './Footer.css'; // Om du vill styla din footer separat

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} InnovativeX. Alla rättigheter reserverade.</p>
        <ul className="footer-links">
          <li><a href="/privacy-policy">Integritetspolicy</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;