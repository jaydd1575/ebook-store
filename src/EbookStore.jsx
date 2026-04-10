import { useState } from "react";

const books = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", price: 9.99, rating: 4.8, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80", badge: "Bestseller" },
  { id: 2, title: "Atomic Habits", author: "James Clear", genre: "Self-Help", price: 11.99, rating: 4.9, cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80", badge: "Top Rated" },
  { id: 3, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", price: 8.99, rating: 4.7, cover: "https://images.unsplash.com/photo-1462045504115-6c1d931f07d1?w=300&q=80", badge: "Classic" },
  { id: 4, title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", price: 10.99, rating: 4.8, cover: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&q=80", badge: "New" },
  { id: 5, title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", price: 12.99, rating: 4.9, cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80", badge: "Hot" },
  { id: 6, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", price: 9.49, rating: 4.6, cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", badge: "Bestseller" },
  { id: 7, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", price: 7.99, rating: 4.7, cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80", badge: "" },
  { id: 8, title: "Deep Work", author: "Cal Newport", genre: "Self-Help", price: 10.49, rating: 4.6, cover: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80", badge: "" },
  { id: 9, title: "1984", author: "George Orwell", genre: "Fiction", price: 6.99, rating: 4.8, cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&q=80", badge: "Classic" },
];

const genres = ["All", "Fiction", "Self-Help", "Sci-Fi", "Finance", "History"];

const badgeColors = {
  Bestseller: "#f59e0b",
  "Top Rated": "#10b981",
  Classic: "#8b5cf6",
  New: "#ef4444",
  Hot: "#f97316",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --ink: #0f0e17;
    --parchment: #fffcf5;
    --cream: #f5f0e8;
    --gold: #c9a84c;
    --gold-light: #f0d89a;
    --rust: #c94c4c;
    --sage: #3d6b4f;
    --muted: #7a7066;
    --card-bg: #ffffff;
  }

  body { background: var(--parchment); font-family: 'DM Sans', sans-serif; color: var(--ink); }

  .page { min-height: 100vh; }

  /* NAVBAR */
  .navbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 3rem;
    background: var(--ink);
    position: sticky; top: 0; z-index: 100;
    border-bottom: 2px solid var(--gold);
  }
  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.7rem; font-weight: 900; color: var(--gold);
    letter-spacing: -0.02em;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .logo span { color: var(--parchment); font-style: italic; font-weight: 400; }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    color: #ccc; text-decoration: none; font-size: 0.9rem;
    font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-right { display: flex; align-items: center; gap: 1rem; }
  .cart-btn {
    background: var(--gold); color: var(--ink);
    border: none; border-radius: 8px;
    padding: 0.55rem 1.2rem; font-weight: 700; font-size: 0.9rem;
    cursor: pointer; display: flex; align-items: center; gap: 0.5rem;
    transition: background 0.2s, transform 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .cart-btn:hover { background: var(--gold-light); transform: translateY(-1px); }
  .cart-count {
    background: var(--rust); color: #fff;
    border-radius: 50%; width: 20px; height: 20px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700;
  }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, var(--ink) 0%, #1e1b2e 60%, #2d1f0f 100%);
    padding: 5rem 3rem 4rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-eyebrow {
    font-size: 0.8rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); font-weight: 600; margin-bottom: 1rem;
  }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    color: var(--parchment); line-height: 1.1;
    font-weight: 900; margin-bottom: 1.5rem;
  }
  .hero h1 em { color: var(--gold); font-style: italic; }
  .hero p { color: #aaa; font-size: 1.05rem; max-width: 500px; margin: 0 auto 2.5rem; line-height: 1.7; }
  .hero-cta {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--gold); color: var(--ink);
    padding: 0.9rem 2.2rem; border-radius: 50px;
    font-weight: 700; font-size: 1rem; text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(201,168,76,0.3);
    border: none; cursor: pointer; font-family: 'DM Sans', sans-serif;
  }
  .hero-cta:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(201,168,76,0.4); }

  /* STATS */
  .stats {
    display: flex; justify-content: center; gap: 4rem;
    background: var(--cream); border-bottom: 1px solid #e0d8cc;
    padding: 1.5rem 3rem;
  }
  .stat { text-align: center; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; color: var(--ink); }
  .stat-label { font-size: 0.78rem; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.1rem; }

  /* FILTERS */
  .filters-section {
    padding: 2rem 3rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem; font-weight: 900;
  }
  .genre-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .genre-tab {
    padding: 0.45rem 1.1rem; border-radius: 50px;
    border: 1.5px solid #ddd; background: transparent;
    font-size: 0.85rem; font-weight: 500; cursor: pointer;
    transition: all 0.2s; color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }
  .genre-tab.active {
    background: var(--ink); border-color: var(--ink);
    color: var(--gold); font-weight: 600;
  }
  .genre-tab:hover:not(.active) { border-color: var(--gold); color: var(--ink); }

  /* SEARCH */
  .search-wrap { padding: 0 3rem 1.5rem; }
  .search-input {
    width: 100%; max-width: 420px;
    padding: 0.75rem 1.2rem 0.75rem 2.8rem;
    border: 1.5px solid #ddd; border-radius: 50px;
    font-size: 0.95rem; background: white; outline: none;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.15); }
  .search-wrap-inner { position: relative; display: inline-block; width: 100%; max-width: 420px; }
  .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 1rem; }

  /* GRID */
  .books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.8rem; padding: 0 3rem 4rem;
  }

  /* CARD */
  .book-card {
    background: var(--card-bg);
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    transition: transform 0.25s, box-shadow 0.25s;
    position: relative;
  }
  .book-card:hover { transform: translateY(-6px); box-shadow: 0 12px 36px rgba(0,0,0,0.13); }
  .book-cover { position: relative; height: 220px; overflow: hidden; background: #e8e0d0; }
  .book-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .book-card:hover .book-cover img { transform: scale(1.06); }
  .badge {
    position: absolute; top: 10px; left: 10px;
    padding: 0.25rem 0.65rem; border-radius: 50px;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em;
    color: white;
  }
  .wishlist-btn {
    position: absolute; top: 10px; right: 10px;
    background: rgba(255,255,255,0.9); border: none;
    border-radius: 50%; width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 1rem; transition: transform 0.2s;
  }
  .wishlist-btn:hover { transform: scale(1.2); }
  .book-info { padding: 1.1rem 1.2rem 1.3rem; }
  .book-genre { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 0.3rem; }
  .book-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem; font-weight: 700; line-height: 1.35;
    margin-bottom: 0.2rem; color: var(--ink);
  }
  .book-author { font-size: 0.82rem; color: var(--muted); margin-bottom: 0.7rem; }
  .book-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem; }
  .book-price { font-size: 1.1rem; font-weight: 700; color: var(--sage); }
  .rating { font-size: 0.8rem; color: var(--muted); display: flex; align-items: center; gap: 0.25rem; }
  .star { color: var(--gold); }
  .add-btn {
    width: 100%; margin-top: 0.9rem;
    padding: 0.6rem; background: var(--ink);
    color: var(--gold); border: none; border-radius: 10px;
    font-weight: 600; font-size: 0.88rem; cursor: pointer;
    transition: background 0.2s, color 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .add-btn:hover { background: var(--gold); color: var(--ink); }
  .add-btn.added { background: var(--sage); color: white; }

  /* CART SIDEBAR */
  .overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.5);
    z-index: 200; opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .overlay.open { opacity: 1; pointer-events: all; }
  .cart-sidebar {
    position: fixed; right: 0; top: 0; bottom: 0;
    width: 380px; background: var(--parchment);
    z-index: 201; transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    display: flex; flex-direction: column;
    box-shadow: -8px 0 40px rgba(0,0,0,0.15);
  }
  .cart-sidebar.open { transform: translateX(0); }
  .cart-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.5rem 1.8rem; border-bottom: 1.5px solid #e0d8cc;
    background: var(--ink);
  }
  .cart-header h2 { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--gold); }
  .close-btn {
    background: none; border: none; color: #ccc;
    font-size: 1.5rem; cursor: pointer; transition: color 0.2s;
  }
  .close-btn:hover { color: var(--gold); }
  .cart-items { flex: 1; overflow-y: auto; padding: 1.2rem 1.8rem; }
  .cart-empty { text-align: center; padding: 3rem 0; color: var(--muted); }
  .cart-empty-icon { font-size: 3rem; margin-bottom: 1rem; }
  .cart-item {
    display: flex; gap: 1rem; padding: 1rem 0;
    border-bottom: 1px solid #e8e0d0;
  }
  .cart-item-img { width: 55px; height: 75px; object-fit: cover; border-radius: 6px; }
  .cart-item-info { flex: 1; }
  .cart-item-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 0.92rem; }
  .cart-item-author { font-size: 0.78rem; color: var(--muted); margin-top: 0.15rem; }
  .cart-item-price { font-weight: 700; color: var(--sage); margin-top: 0.4rem; font-size: 0.95rem; }
  .remove-item {
    background: none; border: none; cursor: pointer;
    color: #ccc; font-size: 1.1rem; transition: color 0.2s; align-self: flex-start;
  }
  .remove-item:hover { color: var(--rust); }
  .cart-footer { padding: 1.5rem 1.8rem; border-top: 1.5px solid #e0d8cc; }
  .cart-total { display: flex; justify-content: space-between; margin-bottom: 1.2rem; font-weight: 700; font-size: 1.1rem; }
  .checkout-btn {
    width: 100%; padding: 0.9rem;
    background: var(--gold); color: var(--ink);
    border: none; border-radius: 12px; font-weight: 700; font-size: 1rem;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: background 0.2s, transform 0.15s;
  }
  .checkout-btn:hover { background: var(--gold-light); transform: translateY(-1px); }

  /* FOOTER */
  .footer {
    background: var(--ink); color: #888;
    padding: 3rem 3rem 2rem;
    border-top: 2px solid var(--gold);
  }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2rem; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 900; color: var(--gold); margin-bottom: 0.8rem; }
  .footer p { font-size: 0.88rem; line-height: 1.7; }
  .footer h4 { color: var(--parchment); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem; font-weight: 600; }
  .footer ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
  .footer ul a { color: #888; text-decoration: none; font-size: 0.88rem; transition: color 0.2s; }
  .footer ul a:hover { color: var(--gold); }
  .footer-bottom { border-top: 1px solid #222; padding-top: 1.5rem; text-align: center; font-size: 0.8rem; }

  @media (max-width: 768px) {
    .navbar { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .hero { padding: 3rem 1.5rem; }
    .stats { gap: 2rem; padding: 1.2rem 1.5rem; flex-wrap: wrap; }
    .filters-section, .search-wrap { padding-left: 1.5rem; padding-right: 1.5rem; }
    .books-grid { padding: 0 1.5rem 3rem; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; }
    .cart-sidebar { width: 100%; }
    .footer { padding: 2rem 1.5rem; }
    .footer-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  }
`;

export default function EbookStore() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeGenre, setActiveGenre] = useState("All");
  const [search, setSearch] = useState("");

  const addToCart = (book) => {
    setCart((prev) => prev.find((b) => b.id === book.id) ? prev : [...prev, book]);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((b) => b.id !== id));

  const toggleWishlist = (id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]);
  };

  const filtered = books.filter((b) => {
    const matchGenre = activeGenre === "All" || b.genre === activeGenre;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  const total = cart.reduce((sum, b) => sum + b.price, 0).toFixed(2);

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="logo">📚 KitabKart<span>Store</span></div>
          <ul className="nav-links">
            <li><a href="#">Browse</a></li>
            <li><a href="#">New Releases</a></li>
            <li><a href="#">Bestsellers</a></li>
            <li><a href="#">About</a></li>
          </ul>
          <div className="nav-right">
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              🛒 Cart
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <p className="hero-eyebrow">✦ Your Digital Bookshelf Awaits ✦</p>
          <h1>Read the World's<br /><em>Greatest Stories</em></h1>
          <p>Thousands of eBooks at your fingertips. Discover, download, and dive in — anytime, anywhere.</p>
          <button className="hero-cta" onClick={() => document.querySelector('.filters-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Collection →
          </button>
        </section>

        {/* STATS */}
        <div className="stats">
          <div className="stat"><div className="stat-num">50K+</div><div className="stat-label">eBooks</div></div>
          <div className="stat"><div className="stat-num">1.2M</div><div className="stat-label">Readers</div></div>
          <div className="stat"><div className="stat-num">120+</div><div className="stat-label">Genres</div></div>
          <div className="stat"><div className="stat-num">4.8★</div><div className="stat-label">Avg Rating</div></div>
        </div>

        {/* SEARCH */}
        <div className="search-wrap">
          <div className="search-wrap-inner">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="filters-section">
          <h2 className="section-title">Browse Books</h2>
          <div className="genre-tabs">
            {genres.map((g) => (
              <button key={g} className={`genre-tab ₹{activeGenre === g ? "active" : ""}`} onClick={() => setActiveGenre(g)}>
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* BOOKS GRID */}
        <div className="books-grid">
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: "var(--muted)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              No books found. Try a different search or genre.
            </div>
          )}
          {filtered.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
                {book.badge && (
                  <span className="badge" style={{ background: badgeColors[book.badge] || "#888" }}>{book.badge}</span>
                )}
                <button className="wishlist-btn" onClick={() => toggleWishlist(book.id)}>
                  {wishlist.includes(book.id) ? "❤️" : "🤍"}
                </button>
              </div>
              <div className="book-info">
                <div className="book-genre">{book.genre}</div>
                <div className="book-title">{book.title}</div>
                <div className="book-author">by {book.author}</div>
                <div className="book-footer">
                  <div className="book-price">₹{book.price}</div>
                  <div className="rating"><span className="star">★</span>{book.rating}</div>
                </div>
                <button
                  className={`add-btn ₹{cart.find((b) => b.id === book.id) ? "added" : ""}`}
                  onClick={() => addToCart(book)}
                >
                  {cart.find((b) => b.id === book.id) ? "✓ In Cart" : "+ Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CART SIDEBAR */}
        <div className={`overlay ₹{cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
        <div className={`cart-sidebar ₹{cartOpen ? "open" : ""}`}>
          <div className="cart-header">
            <h2>Your Cart ({cart.length})</h2>
            <button className="close-btn" onClick={() => setCartOpen(false)}>✕</button>
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">🛒</div>
                <p>Your cart is empty.<br />Start exploring books!</p>
              </div>
            ) : (
              cart.map((book) => (
                <div key={book.id} className="cart-item">
                  <img src={book.cover} alt={book.title} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div className="cart-item-title">{book.title}</div>
                    <div className="cart-item-author">{book.author}</div>
                    <div className="cart-item-price">₹{book.price}</div>
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(book.id)}>✕</button>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout →</button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">📚 KitabKartStore</div>
              <p>Your premium destination for digital books. Read anywhere, discover everywhere. Curated collections for every kind of reader.</p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="#">Fiction</a></li>
                <li><a href="#">Non-Fiction</a></li>
                <li><a href="#">Self-Help</a></li>
                <li><a href="#">Science & Tech</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © 2026 KitabKartStore. All rights reserved. Made with ❤️ for book lovers.
          </div>
        </footer>
      </div>
    </>
  );
}
