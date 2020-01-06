const express = require('express')
const Category = require('../models/Category')
const router = express.Router()

router.route('/categories').get((req, res, next) => {
    Category.find({})
        .then(categories => {
            res.json(categories)
        })
        .catch(next)
})

router.route('/categories').post((req, res, next) => {
    Category.create(req.body)
        .then(category => {
            res.statusCode = 201
            res.json(category)
        })
        .catch(next)
})

router.route('/categories').put((req, res) => {
    res.statusCode = 405
    res.json({ message: 'Method not allowed' })
})

router.route('/categories').delete((req, res, next) => {
    Category.deleteMany({})
        .then(reply => {
            res.json(reply)
        })
        .catch(next)
})

router
    .route('/categories/:id')
    .get((req, res, next) => {
        Category.findById(req.params.id)
            .populate({
                path: 'tasks',
                select: 'name'
            })
            .then(category => {
                res.json(category)
            })
            .catch(next)
    })
    .post()
    .put()
    .delete()

module.exports = router
