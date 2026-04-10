import "./NewsletterStrip.css";

export default function NewsletterStrip() {
  return (
    <section className="newsletter-strip">
      <div className="newsletter-strip-inner">
        <div className="ns-text">
          <h3>Get Weekly Book Picks</h3>
          <p>Curated recommendations delivered to your inbox every Friday.</p>
        </div>
        <div className="ns-form">
          <input type="email" placeholder="your@email.com" />
          <button>Subscribe Free</button>
        </div>
      </div>
    </section>
  );
}