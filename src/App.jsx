import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import PromoBanner from "./PromoBanner";
import FeaturedBooks from "./FeaturedBooks";
import Categories from "./Categories";
import BookModal from "./BookModal";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import AuthModal from "./AuthModal";
import ReadingList from "./ReadingList";
import Testimonials from "./Testimonials";
import NewsletterStrip from "./NewsletterStrip";
import Footer from "./Footer";
import Toast from "./Toast";
import "./App.css";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [readingListOpen, setReadingListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  };

  const addToCart = (book) => {
    setCartItems((prev) => {
      if (prev.find((i) => i.id === book.id)) {
        addToast(`Already in your cart`, "info");
        return prev;
      }
      addToast(`"₹{book.title}" added to cart 🛒`);
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    addToast("Removed from cart", "info");
  };

  const toggleWishlist = (book) => {
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === book.id);
      if (exists) {
        addToast(`Removed from wishlist`, "info");
        return prev.filter((i) => i.id !== book.id);
      }
      addToast(`"₹{book.title}" added to wishlist ♡`);
      return [...prev, book];
    });
  };

  const toggleReadingList = (book, status = "want") => {
    setReadingList((prev) => {
      const exists = prev.find((i) => i.id === book.id);
      if (exists) {
        addToast(`Updated reading status`, "info");
        return prev.map((i) => (i.id === book.id ? { ...i, status } : i));
      }
      addToast(`Added to reading list 📖`);
      return [...prev, { ...book, status, progress: 0 }];
    });
  };

  const removeFromReadingList = (id) => {
    setReadingList((prev) => prev.filter((i) => i.id !== id));
  };

  const updateProgress = (id, progress) => {
    setReadingList((prev) =>
      prev.map((i) => (i.id === id ? { ...i, progress } : i))
    );
  };

  return (
    <div className="app">
      <PromoBanner />
      <Navbar
        cartCount={cartItems.length}
        wishlistCount={wishlist.length}
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
        onAuthOpen={() => setAuthOpen(true)}
        onReadingListOpen={() => setReadingListOpen(true)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      <Hero />
      <Categories active={activeCategory} onSelect={setActiveCategory} />
      <FeaturedBooks
        onBookClick={setSelectedBook}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        searchQuery={searchQuery}
        activeCategory={activeCategory}
        cartItems={cartItems}
        wishlist={wishlist}
      />
      <Testimonials />
      <NewsletterStrip />
      <Footer />

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          onAddToReadingList={toggleReadingList}
          inCart={cartItems.some((i) => i.id === selectedBook.id)}
          inWishlist={wishlist.some((i) => i.id === selectedBook.id)}
          inReadingList={readingList.some((i) => i.id === selectedBook.id)}
        />
      )}

      <Cart
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
      />

      <Wishlist
        open={wishlistOpen}
        items={wishlist}
        onClose={() => setWishlistOpen(false)}
        onRemove={(id) => setWishlist((prev) => prev.filter((i) => i.id !== id))}
        onMoveToCart={(book) => {
          addToCart(book);
          setWishlist((prev) => prev.filter((i) => i.id !== book.id));
        }}
      />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      <ReadingList
        open={readingListOpen}
        items={readingList}
        onClose={() => setReadingListOpen(false)}
        onRemove={removeFromReadingList}
        onUpdateProgress={updateProgress}
        onUpdateStatus={(id, status) =>
          setReadingList((prev) =>
            prev.map((i) => (i.id === id ? { ...i, status } : i))
          )
        }
      />

      <Toast toasts={toasts} />
    </div>
  );
}
