const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {},
    total_price: Number,
    payment_method: String,
    status: { type: String, default: 'WAITING' },
    receiveNode: { type: String, default: '' },
    cart_details:[]
},
{
    timestamps: true
})

const order = mongoose.model("order",orderSchema)

module.exports = order