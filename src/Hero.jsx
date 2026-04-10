import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grain" />
        <div className="hero-gradient" />
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="eyebrow-line" />
          <span>The World's Finest Digital Library</span>
          <span className="eyebrow-line" />
        </div>

        <h1 className="hero-title">
          Stories That <br />
          <em>Transform</em> You
        </h1>

        <p className="hero-subtitle">
          Over 50,000 eBooks across every genre. Instant access. <br />
          Lifetime ownership. Reading reimagined.
        </p>

        <div className="hero-cta">
          <a href="#featured" className="btn-primary">Explore Books</a>
          <a href="#categories" className="btn-ghost">Browse Categories</a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">50K+</span>
            <span className="stat-label">eBooks</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">120+</span>
            <span className="stat-label">Genres</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">2M+</span>
            <span className="stat-label">Readers</span>
          </div>
        </div>
      </div>

      <div className="hero-books-visual">
        {[
       "https://images-na.ssl-images-amazon.com/images/I/71KKZlVjbwL.jpg",
        ].map((src, i) => (
          <div key={i} className={`hero-book-card card-₹{i}`}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}
