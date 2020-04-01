const { config } = require('dotenv');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('./middleware/errorHandler');
const swaggerDocs = require('../docs/starter-template.json');

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (['development', 'staging', 'production'].includes(process.env.NODE_ENV)) {
  app.use(morgan('dev'));
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (_, response) => {
  response.status(200).json({
    status: 'success',
    message: 'welcome to "Express Starter Template for Sequelize"',
  });
});

app.all('*', (_, response) => {
  response.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

app.use(errorHandler);

module.exports = app;
