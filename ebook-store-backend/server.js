const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ── CORS Fix ──
app.use(cors({
  origin: [
    "http://localhost:5173",           // local dev
    "http://localhost:5174",           // local dev alternate port
    "https://ebook-store-frontend.vercel.app",  // your Vercel URL
    /\.vercel\.app$/,                  // allow all vercel preview URLs
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/auth", require("./routes/auth"));

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