const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    role: String,
    receiveName: { type: String, default: '' },
    receiveAddress: { type: String, default: '' },
    receivePhone: { type: String, default: '' },
},{
    timestamps: true
})

const user = mongoose.model("user",userSchema)

module.exports = user