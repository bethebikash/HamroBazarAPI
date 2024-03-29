const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    phone: {
        type: String,
    },
    mobile: {
        type: String,
        required: true,
        min: 10
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
        required: true
    },
    address3: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    }
}, { timestamps: true });

userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'owner'
})

module.exports = mongoose.model('User', userSchema);