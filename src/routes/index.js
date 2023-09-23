const express = require('express')

const Router = express.Router()

Router.get('/', (req, res) => res.status(200).json({
    "detail": "Sucess!"
}))

module.exports = Router