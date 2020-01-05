const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
    .connect('mongodb://localhost:27017/hamro-bazar-api', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(
        db => {
            console.log('Successfully connected to MongodB server')
        },
        err => console.log(err)
    )

app.listen(3000, () => {
    console.log(`App is running at localhost:3000`)
})
