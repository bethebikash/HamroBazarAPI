const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middlewares/auth')

router.post('/users/signup', (req, res, next) => {
    let password = req.body.password
    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            let err = new Error('Could not hash!')
            err.status = 500
            return next(err)
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            mobile: req.body.mobile,
            address1: req.body.address1,
            address2: req.body.address2,
            address3: req.body.address3,
            image: req.body.image
        })
            .then(user => {
                let token = jwt.sign(
                    { _id: user._id.toString() },
                    'secretKey',
                    { expiresIn: '10h' }
                )
                res.status(200).json({
                    status: 'User created successfully.',
                    token: token
                })
            })
            .catch(next)
    })
})

router.post('/users/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user == null) {
                let err = new Error('User not found!')
                err.status = 401
                return next(err)
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!')
                            err.status = 401
                            return next(err)
                        }
                        let token = jwt.sign({ _id: user._id }, 'secretKey')
                        res.status(200).json({
                            status: 'Login success!',
                            token: token
                        })
                    })
                    .catch(next)
            }
        })
        .catch(next)
})

router.get('/users/me', auth, (req, res) => {
    res.json({ _id: req.user._id, name: req.user.name, email: req.user.email, phone: req.user.phone, mobile: req.user.mobile, address1: req.user.address1, address2: req.user.address2, address3: req.user.address3, image:req.user.image });
});

module.exports = router
