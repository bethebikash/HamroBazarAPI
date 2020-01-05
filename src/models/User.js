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
        required: true
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
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);