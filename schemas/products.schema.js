const mongoose = require("mongoose");

const shoesSchema = new mongoose.Schema(
  {
    shoesId: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    brand: {
      type: String,
      required: true,
      unique: false
    },
    password: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["FOR_SALE", "SOLD_OUT"],
      default: "FOR_SALE"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shoes", shoesSchema);
