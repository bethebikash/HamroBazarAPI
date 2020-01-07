const express = require('express')
const Product = require('../models/Product')
const router = express.Router()

router.route('/products').get((req, res, next) => {
    Product.find({})
        .then(products => {
            res.json(products)
        })
        .catch(next)
})

router.route('/products').post((req, res, next) => {
    Product.create(req.body)
        .then(product => {
            res.statusCode = 201
            res.json(product)
        })
        .catch(next)
})

router.route('/products/:id').get((req, res, next) => {
    Product.findById(req.params.id)
        .populate({
            path: 'category',
            select: 'name'
        }).populate({
            path: 'owner',
            select: 'name'
        })
        .then(product => {
            res.json(product)
        })
        .catch(next)
})

router.route('/products/:id').put((req, res, next) => {
    Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    )
        .then(product => {
            if (product == null) throw new Error('Product not found!')
            res.json(product)
        })
        .catch(next)
})

router.route('/products/:id').delete((req, res, next) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(product => {
            if (product == null) throw new Error('Product not found!')
            res.json(product)
        })
        .catch(next)
})

module.exports = router
