import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-inner">
        {/* Newsletter */}
        <div className="footer-newsletter">
          <h3>Stay in the Story</h3>
          <p>Get weekly recommendations curated by our literary team.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="your@email.com" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Discover</h4>
            <ul>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Bestsellers</a></li>
              <li><a href="#">Free eBooks</a></li>
              <li><a href="#">Editor's Picks</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Genres</h4>
            <ul>
              <li><a href="#">Fiction</a></li>
              <li><a href="#">Non-Fiction</a></li>
              <li><a href="#">Sci-Fi</a></li>
              <li><a href="#">Self-Help</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Authors</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div className="footer-logo">
            <span>📚</span>
            <span className="footer-logo-name">KitabKart</span>
          </div>
          <p className="footer-copy">© 2025 KitabKart Digital Bookstore. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#">𝕏</a>
            <a href="#">in</a>
            <a href="#">ig</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
