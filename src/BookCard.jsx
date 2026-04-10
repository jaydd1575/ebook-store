import "./BookCard.css";

const badgeColors = {
  Bestseller: "#c9a85c",
  "Top Rated": "#5ca8c9",
  Classic: "#9c7ec4",
  New: "#5cb87e",
};

export default function BookCard({ book, index, onBookClick, onAddToCart, onToggleWishlist, inCart, inWishlist }) {
  const stars = "★".repeat(Math.floor(book.rating)) + (book.rating % 1 >= 0.5 ? "½" : "");

  return (
    <div className="book-card" style={{ animationDelay: `₹{index * 0.06}s` }}>
      <div className="book-cover" onClick={() => onBookClick(book)}>
        <img src={book.cover} alt={book.title} loading="lazy" />
        <div className="cover-overlay">
          <span className="overlay-preview">Preview</span>
        </div>
        {book.badge && (
          <span className="book-badge" style={{ background: badgeColors[book.badge] || "#aaa" }}>
            {book.badge}
          </span>
        )}
        <button
          className={`wishlist-heart ₹{inWishlist ? "active" : ""}`}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(book); }}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {inWishlist ? "♥" : "♡"}
        </button>
      </div>

      <div className="book-info">
        <span className="book-category">{book.category}</span>
        <h3 className="book-title" onClick={() => onBookClick(book)}>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-rating">
          <span className="stars">{stars}</span>
          <span className="rating-num">{book.rating}</span>
          <span className="reviews">({book.reviews.toLocaleString()})</span>
        </div>
        <div className="book-footer">
          <span className="book-price">₹{book.price.toFixed(2)}</span>
          <button
            className={`add-btn ₹{inCart ? "in-cart" : ""}`}
            onClick={() => onAddToCart(book)}
          >
            {inCart ? "✓ Added" : "+ Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
