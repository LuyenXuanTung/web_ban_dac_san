const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    star: Number,
    content: String,
    productId: String,
    userId: String
},
{
    timestamps: true
})

const rating = mongoose.model("rating",ratingSchema)

module.exports = rating