const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname,'/public/')));
app.set('view engine', 'ejs');

const routes = require('./routes/index.route.js');
app.use(routes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


module.exports = app;