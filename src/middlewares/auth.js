const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = (req, res, next) => {
    let authHeader = req.headers.authorization
    if (!authHeader) {
        let err = new Error('Bearer token is not set!')
        err.status = 401
        return next(err)
    }

    let token = authHeader.slice(7, authHeader.length)
    let decoded
    try {
        decoded = jwt.verify(token, 'secretKey')
    } catch (err) {
        throw new Error('Token could not be verified!')
    }
    User.findById(decoded._id).then(user => {
        req.user = user
        next()
    })
}

module.exports = auth
