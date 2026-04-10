import { useEffect } from "react";
import "./BookModal.css";

export default function BookModal({ book, onClose, onAddToCart, onToggleWishlist, onAddToReadingList, inCart, inWishlist, inReadingList }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.floor(book.rating) ? "star filled" : "star"}>★</span>
  ));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-layout">
          <div className="modal-cover">
            <img src={book.cover} alt={book.title} />
            <div className="modal-cover-glow" />
          </div>
          <div className="modal-details">
            <span className="modal-category">{book.category}</span>
            <h2 className="modal-title">{book.title}</h2>
            <p className="modal-author">by {book.author}</p>
            <div className="modal-rating">
              <div className="modal-stars">{stars}</div>
              <span className="modal-rating-num">{book.rating} / 5</span>
              <span className="modal-reviews">· {book.reviews.toLocaleString()} reviews</span>
            </div>
            <p className="modal-description">{book.description}</p>
            <div className="modal-meta">
              <div className="meta-item"><span>Pages</span><strong>{book.pages}</strong></div>
              <div className="meta-item"><span>Year</span><strong>{book.year}</strong></div>
              <div className="meta-item"><span>Publisher</span><strong>{book.publisher}</strong></div>
              <div className="meta-item"><span>Format</span><strong>ePub · PDF</strong></div>
            </div>
            <div className="modal-purchase">
              <div className="modal-price">₹{book.price.toFixed(2)}</div>
              <button
                className={`modal-cart-btn ₹{inCart ? "in-cart" : ""}`}
                onClick={() => !inCart && onAddToCart(book)}
              >
                {inCart ? "✓ In Cart" : "Add to Cart"}
              </button>
            </div>
            <div className="modal-secondary-actions">
              <button
                className={`modal-wishlist-btn ₹{inWishlist ? "active" : ""}`}
                onClick={() => onToggleWishlist(book)}
              >
                {inWishlist ? "♥ In Wishlist" : "♡ Add to Wishlist"}
              </button>
              <button
                className={`modal-reading-btn ₹{inReadingList ? "active" : ""}`}
                onClick={() => onAddToReadingList(book, "want")}
              >
                {inReadingList ? "📖 In Reading List" : "📖 Add to Reading List"}
              </button>
            </div>
            <p className="modal-guarantee">🔒 Instant download · Lifetime access · Money-back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
}
