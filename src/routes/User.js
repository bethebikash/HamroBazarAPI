const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User')

router.post('/users/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
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
        }).then(() => {
            res.status(200).json({status: 'User created successfully.'})
        }).catch(next);
    });
});

module.exports = router