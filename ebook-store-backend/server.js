const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ── CORS Fix ──
app.use(cors({
  origin: [
     // your Vercel URL
    /\.vercel\.app$/,                  // allow all vercel preview URLs
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Routes
app.use("/books", require("./books"));
app.use("/categories", require("./categories"));
app.use("/auth", require("./auth"));

app.get("/", (req, res) => {
  res.json({ message: "eBook Store API is running..." });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err.message);
  });

  // TEMPORARY — remove after seeding
app.get("/api/seed", async (req, res) => {
  try {
    const Book = require("./Book");
    const Category = require("./Category");

    await Book.deleteMany();
    await Category.deleteMany();

    await Category.insertMany([
      { name: "Fiction", icon: "📖", order: 1 },
      { name: "Non-Fiction", icon: "🔍", order: 2 },
      { name: "Sci-Fi", icon: "🚀", order: 3 },
      { name: "Self-Help", icon: "💡", order: 4 },
      { name: "Finance", icon: "📈", order: 5 },
      { name: "Mystery", icon: "🔎", order: 6 },
      { name: "Biography", icon: "👤", order: 7 },
      { name: "Romance", icon: "💝", order: 8 },
      { name: "History", icon: "🏛️", order: 9 },
      { name: "Technology", icon: "💻", order: 10 },
      { name: "Children", icon: "🧸", order: 11 },
    ]);

    await Book.insertMany([
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        category: "Fiction",
        price: 199, rating: 4.8, reviews: 3241,
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
        description: "Between life and death there is a library.",
        pages: 304, publisher: "Canongate Books", year: 2020,
        badge: "Bestseller", featured: true,
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        price: 299, rating: 4.9, reviews: 5872,
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
        description: "Tiny changes, remarkable results.",
        pages: 320, publisher: "Avery", year: 2018,
        badge: "Top Rated", featured: true,
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "Non-Fiction",
        price: 249, rating: 4.7, reviews: 4120,
        cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&q=80",
        description: "A brief history of humankind.",
        pages: 443, publisher: "Harper", year: 2015,
        badge: null, featured: true,
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        category: "Sci-Fi",
        price: 249, rating: 4.9, reviews: 6003,
        cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
        description: "Set on the desert planet Arrakis.",
        pages: 688, publisher: "Ace Books", year: 1965,
        badge: "Classic", featured: true,
      },
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Finance",
        price: 199, rating: 4.8, reviews: 2987,
        cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&q=80",
        description: "Timeless lessons on wealth, greed, and happiness.",
        pages: 256, publisher: "Harriman House", year: 2020,
        badge: "New", featured: true,
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        price: 499, rating: 4.7, reviews: 3800,
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
        description: "A handbook of agile software craftsmanship.",
        pages: 464, publisher: "Prentice Hall", year: 2008,
        badge: "Top Rated", featured: false,
      },
    ]);

    res.json({ message: "✅ Database seeded successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});