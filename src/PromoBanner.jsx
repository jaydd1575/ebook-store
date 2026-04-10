import { useState } from "react";
import "./PromoBanner.css";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="promo-banner">
      <span className="promo-icon">✦</span>
      <p>
        Summer Reading Sale — <strong>30% off</strong> all Fiction & Sci-Fi titles.
        Use code <span className="promo-code">KitabKart30</span> at checkout.
      </p>
      <a href="#featured" className="promo-cta">Shop Now</a>
      <button className="promo-close" onClick={() => setVisible(false)}>✕</button>
    </div>
  );
}
