const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    prices: {
      amazon: {
        type: Number,
        default: 0,
      },
      flipkart: {
        type: Number,
        default: 0,
      },
      meesho: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);