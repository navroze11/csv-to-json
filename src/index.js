/**
 * Module dependencies.
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { config } = require('./config/config');
const jsonToCsvController = require('./controllers/json-to-csv');


/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('host', process.env.HOST || '0.0.0.0');
app.set('port', config.express.port || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/users', jsonToCsvController.getJson);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d', chalk.green('✓'), app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
