import { useEffect } from "react";
import "./Wishlist.css";

export default function Wishlist({ open, items, onClose, onRemove, onMoveToCart }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="wishlist-drawer">
        <div className="drawer-header">
          <div>
            <h2 className="drawer-heading">Wishlist</h2>
            <span className="drawer-count">{items.length} saved</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="wishlist-items">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <span>♡</span>
              <p>Your wishlist is empty</p>
              <small>Click the heart on any book to save it here</small>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="wishlist-img"
                />
                <div className="wishlist-info">
                  <p className="wishlist-title">{item.title}</p>
                  <p className="wishlist-author">{item.author}</p>
                  <p className="wishlist-price">₹{item.price.toFixed(2)}</p>
                  <button
                    className="move-to-cart-btn"
                    onClick={() => onMoveToCart(item)}
                  >
                    Move to Cart
                  </button>
                </div>
                <button
                  className="wishlist-remove"
                  onClick={() => onRemove(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="wishlist-footer">
            <button
              className="wishlist-add-all"
              onClick={() => items.forEach(onMoveToCart)}
            >
              Add All to Cart ({items.length} items)
            </button>
          </div>
        )}
      </aside>
    </>
  );
}