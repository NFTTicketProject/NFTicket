const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const favicon = require('serve-favicon')
const path = require('path')
const router = require('./routes/index')

// Static file Configuration
app.use(express.static(__dirname + '/public'))

// Set favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//Router
app.use('/', router)

app.listen(port, () => {
    console.log(`server started at ${port}`)
});