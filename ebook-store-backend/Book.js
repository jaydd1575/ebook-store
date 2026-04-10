const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    cover: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    pages: {
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    badge: {
      type: String,
      enum: ["Bestseller", "Top Rated", "Classic", "New", "Trending", "Popular", "Must Read", "Top Bestseller", "Highly Rated", "Highly Popular", "Global Bestseller", null],
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);