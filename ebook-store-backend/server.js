const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// ✅ TEST ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ MongoDB connection (safe)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
  });

// ✅ Routes (comment temporarily if crash)
try {
  app.use("/api/books", require("./routes/books"));
} catch (err) {
  console.log("Books route error (ignored for now)");
}

// ✅ PORT (REQUIRED for Render)
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});