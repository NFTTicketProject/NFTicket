const express = require('express');
const router = express.Router();
const redirect = require('./controllers/redirect')
const root = require('./controllers/root')
const profile = require('./controllers/profile')
const account = require('./controllers/account')

// root routing
router.use('/', root)

// /redirect routing
router.use('/redirect', redirect)

// /profile routing
router.use('/profile', profile)

// /account routing
router.use('/account', account)

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
