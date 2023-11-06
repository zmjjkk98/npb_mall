const mongoose = require("mongoose");


const shoesSchema = new mongoose.Schema({
  shoesId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
    unique: false,
  },
  price: {
    type: Number,
  }
});

module.exports = mongoose.model("Shoes", shoesSchema);