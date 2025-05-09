const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {type:String, require: true},
    description: String,
    category: String,
    image: [],
    price: Number,
    expiry: Date,
    province: String,
    quantity: { type: Number, default: 0 },
    total_pay: { type: Number, default: 0 },
    total_rating: { type: Number, default: 0 },
    total_stars: { type: Number, default: 0 },
    promotion:{ type: Number, default: 0 },
    new_price:{ type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("product",productSchema)

module.exports = product