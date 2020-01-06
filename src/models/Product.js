const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        condition: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    },
    { timestamps: true }
)

userSchema.virtual('product', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})

module.exports = mongoose.model('Category', productSchema)
