const express = require('express')
const router = new express.Router()
const User = require('../models/User')

router.post('/users/signup', (req, res, next) => {
    const user = req.body
        User.create(user).then(() => {
            res.status(200).json({status: 'User created successfully.'})
        }).catch(next);
});

module.exports = router