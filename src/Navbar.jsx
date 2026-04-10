import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import "./Navbar.css";

export default function Navbar({
  cartCount, wishlistCount,
  onCartOpen, onWishlistOpen, onAuthOpen, onReadingListOpen,
  searchQuery, onSearch,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();


  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`navbar ₹{scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <div className="nav-logo">
          <span className="logo-icon">📚</span>
          <div className="logo-text">
            <span className="logo-main">KitabKart</span>
            <span className="logo-sub">digital bookstore</span>
          </div>
        </div>

        <div className="nav-search">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search titles, authors…"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <nav className={`nav-links ₹{menuOpen ? "open" : ""}`}>
          <a href="#featured">Browse</a>
          <a href="#categories">Categories</a>
          <button className="nav-link-btn" onClick={onReadingListOpen}>My List</button>
          <a href="#footer">About</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={onWishlistOpen} title="Wishlist">
            ♡
            {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
          </button>
          <button className="icon-btn" onClick={onCartOpen} title="Cart">
            🛒
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </button>
          {user ? (
  <button onClick={logout}>Logout</button>
) : (
  <button onClick={onAuthOpen}>Sign In</button>
)}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
