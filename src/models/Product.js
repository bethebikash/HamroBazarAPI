const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required :true
    },
    price: {
        type: Float32Array,
        required: true
    },
    condition: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.virtual('product', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})

module.exports = mongoose.model('Category', productSchema);