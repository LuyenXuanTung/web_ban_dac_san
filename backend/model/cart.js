const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: String
},
{
    timestamps: true
})

const cart = mongoose.model("cart",cartSchema)

module.exports = cart