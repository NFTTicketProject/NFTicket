const express = require('express');
const router = express.Router();

// Authrize
const auth = (req, res, next) => {
    console.log('authrization')
    next()
}

router.all('/:name', (req, res, next) => {
    console.log('perform redirection')
    next()
})

router.all('/:name', auth, (req, res) => {
    res.redirect(302, `/images/${req.params.name}.jpg`)
})

module.exports = router