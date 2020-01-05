const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            let err = new Error('Bearer token is not set!')
            err.status = 401
            return next(err)
        }
        const token = authHeader.slice(7, authHeader.length)
        let decoded
        try {
            decoded = jwt.verify(token, 'secretKey')
        } catch (err) {
            throw new Error('Token could not be verified!')
        }
        const user = User.findOne({
            _id: decoded._id,
        })

        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ Error: 'Unauthorized' })
    }
}

module.exports = auth
