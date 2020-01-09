const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
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
        image: {
            type: String,
            default: '' 
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)
productSchema.methods.toJSON = function() {
    const product = this
    const productObject = product.toObject()
    delete productObject._id,
    delete productObject.category,
    delete productObject.owner,
    delete productObject.createdAt,
    delete productObject.updatedAt,
    delete productObject.__v
    return productObject
}

module.exports = mongoose.model('Product', productSchema)
