const mongoose = require('mongoose')

const promotionSchema = new mongoose.Schema({
    discount: Number,
    new_price: Number,
    category: [{String}]
},
{
    timestamps: true
})

const promotion = mongoose.model("promotion",promotionSchema)

module.exports = promotion