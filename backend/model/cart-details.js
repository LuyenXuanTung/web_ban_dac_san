const mongoose = require('mongoose')

const cartDetailSchema = new mongoose.Schema({
    productId: {
        ref: 'product',
        type: String
    },
    quantity:Number,
    total_price: Number,
    cartId: String
},
{
    timestamps: true
})

const cartDetail = mongoose.model("cartDetail",cartDetailSchema)

module.exports = cartDetail