const express = require('express')
const router = express.Router()

router.all('/', (req, res) => {
    res.send(`${req.protocol} ${req.ip} Welcome NodeJS`)
})

module.exports = router