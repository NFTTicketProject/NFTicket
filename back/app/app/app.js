const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const favicon = require('serve-favicon')
const path = require('path')
const router = require('./routes/index')
const cors = require('cors');
const { swaggerUi, specs } = require('./utils/swagger');
const morgan = require('morgan');
const { stream } = require('./utils/winston');
const bodyparser = require('body-parser')

require('dotenv').config();

// use body-parser
app.use(bodyparser.json());

// Static file Configuration
app.use(express.static(__dirname + '/public'))
app.use(morgan('[Controller] :method :url ::: :url HTTP/:http-version :status :res[content-length] - :response-time ms - :remote-addr', { stream }));

// Set CORS
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     credentials: true
// }
app.use(cors());
//app.use(cors(corsOptions));

// Set favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//Router
app.use('/', router)

app.listen(port, () => {
    console.log(`server started at ${port}`)
});
