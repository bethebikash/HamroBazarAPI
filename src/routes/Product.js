const express = require('express')
const Product = require('../models/Product')
const router = express.Router()
const multer = require('multer')
const auth = require('../middlewares/auth')
const path = require('path')

const storage = multer.diskStorage({
    destination: './public/uploads/product-images',
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname)
        callback(null, `${file.fieldname}-${Date.now()}${ext}`)
    }
})

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Please provide an Image file.'), false)
    }
    cb(null, true)
}

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
})

router.route('/products').get((req, res, next) => {

    const sort = {}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    Product.find().sort(sort)
        .then(products => {
            res.json(products)
        })
        .catch(next)
})

router
    .route('/products')
    .post(upload.single('image'), auth, (req, res, next) => {
        Product.create({
            name: req.body.name,
            price: req.body.price,
            condition: req.body.condition,
            image: req.file.path,
            category: req.body.category,
            owner: req.user._id
        })
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
        })
        .populate({
            path: 'owner',
            select: 'name'
        })
        .then(product => {
            res.json(product)
        })
        .catch(next)
})

router.route('/products/:id').put(auth, (req, res, next) => {
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

router.route('/products/:id').delete(auth, (req, res, next) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(product => {
            if (product == null) throw new Error('Product not found!')
            res.json(product)
        })
        .catch(next)
})

module.exports = router
