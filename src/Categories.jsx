import { useState, useEffect } from "react";
import { fetchCategories } from "./api";
import "./Categories.css";

const icons = {
  All: "✦", Fiction: "📖", "Non-Fiction": "🔍",
  "Sci-Fi": "🚀", "Self-Help": "💡", Finance: "📈",
  Mystery: "🔎", Biography: "👤", Romance: "💝",
  History: "🏛️", Technology: "💻", Children: "🧸",
};

export default function Categories({ active, onSelect }) {
  const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/categories")
    .then(res => res.json())
    .then(data => {
      console.log("Categories:", data);
      setCategories(data);
    })
    .catch(err => console.error(err));
}, []);

  return (
    <section id="categories" className="categories-section">
      <div className="categories-inner">
        <div className="section-label">
          <span className="label-line" />
          <span>Browse by Genre</span>
        </div>
        <div className="categories-pills">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`category-pill ${active === cat.name ? "active" : ""}`}
              onClick={() => onSelect(cat.name)}
            >
              <span className="pill-icon">{icons[cat.name] || "📚"}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}