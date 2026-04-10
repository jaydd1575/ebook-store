import { useEffect } from "react";
import "./Cart.css";

export default function Cart({ open, items, onClose, onRemove }) {
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

  const total = items.reduce((acc, item) => acc + item.price, 0);

  if (!open) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="cart-drawer">
        <div className="cart-header">
          <h2 className="cart-heading">Your Cart</h2>
          <span className="cart-item-count">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
          <button className="cart-drawer-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span>🛒</span>
              <p>Your cart is empty</p>
              <button onClick={onClose} className="cart-browse-btn">
                Browse Books
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <p className="cart-item-title">{item.title}</p>
                  <p className="cart-item-author">{item.author}</p>
                  <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemove(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>
            <p className="cart-note">Taxes and fees calculated at checkout</p>
            <button className="checkout-btn">Proceed to Checkout →</button>
            <button className="continue-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
