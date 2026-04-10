

const testimonials = [
  { id: 1, name: "Arjun Mehta",  location: "Mumbai, India", rating: 5, text: "KitabKart completely transformed my reading habits. The selection is incredible and the reading experience is seamless across all my devices." },
  { id: 2, name: "Sarah Chen",  location: "Singapore", rating: 5, text: "I've bought over 30 eBooks from KitabKart this year alone. The curated collections always help me find hidden gems I wouldn't have discovered otherwise." },
  { id: 3, name: "Marcus Rivera", location: "Barcelona, Spain", rating: 4, text: "The wishlist and reading tracker features are game-changers. I finally have a system to manage my ever-growing to-read pile." },
   {
    id: 4,                          // 👈 increment id
    name: "Priya Shah",
    location: "Ahmedabad, India",
    rating: 5,
    text: "Best eBook store I have used. The collection is huge and prices are very reasonable!",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-line" />
            <span>Reader Stories</span>
            <span className="eyebrow-line" />
          </div>
          <h2 className="section-title">Loved by <em>Readers</em> Worldwide</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="t-stars">{"★".repeat(t.rating)}</div>
              <p className="t-text">"{t.text}"</p>
              <div className="t-author">
                <div className="t-avatar">{t.avatar}</div>
                <div>
                  <p className="t-name">{t.name}</p>
                  <p className="t-location">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
