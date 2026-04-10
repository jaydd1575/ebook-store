import { useState, useEffect } from "react";
import { fetchBooks } from "./api";
import BookCard from "./BookCard";
import "./FeaturedBooks.css";

export default function FeaturedBooks({
  onBookClick, onAddToCart, onToggleWishlist,
  searchQuery, activeCategory, cartItems, wishlist,
}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(activeCategory, searchQuery);
      setBooks(data);
      setLoading(false);
    };
    getBooks();
  }, [activeCategory, searchQuery]);

  return (
    <section id="featured" className="featured-section">
      <div className="featured-inner">
        <div className="featured-header">
          <div>
            <h2 className="featured-title">
              {activeCategory === "All" ? "Featured Collection" : activeCategory}
            </h2>
            <p className="featured-count">{books.length} titles available</p>
          </div>
          <div className="featured-sort">
            <label>Sort by</label>
            <select>
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="books-loading">
            <div className="loading-spinner" />
            <p>Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="no-results">
            <span>📚</span>
            <p>No books found</p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book, i) => (
              <BookCard
                key={book._id}
                book={{ ...book, id: book._id }}
                index={i}
                onBookClick={onBookClick}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                inCart={cartItems.some((c) => c.id === book._id)}
                inWishlist={wishlist.some((w) => w.id === book._id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}