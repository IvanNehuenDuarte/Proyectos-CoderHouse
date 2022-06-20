const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0, required: true },
  img: { type: String, required: true },
  date: { type: Date, default: Date.now },
  avaible: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', ProductSchema);