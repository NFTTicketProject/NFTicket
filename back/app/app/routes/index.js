const express = require('express');
const router = express.Router();
const profile = require('./controllers/profile')
const account = require('./controllers/account')
const sale = require('./controllers/sale')
const show = require('./controllers/show')
const staff = require('./controllers/staff')
const role = require('./controllers/role')
const block = require('./controllers/block')

// /profile routing
router.use('/profile', profile)

// /account routing
router.use('/account', account)

// /sale routing
router.use('/sale', sale)

// /show routing
router.use('/show', show)

// /staff routing
router.use('/staff', staff)

// /role routing
router.use('/role', role)

// /block routing
router.use('/block', block)

// custom 404 page
router.use((req, res) => {
    res.type('text/plain').status(404)
    res.send('404 - Not Found')
})

// custom 500 page
router.use((err, req, res, next) => {
    console.error(`${err}`)
    res.type('text/plain')
    res.status(500)
    // res.send('500 - Server Err')
    next()
})

module.exports = router;
