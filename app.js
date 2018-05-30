

const SwaggerRestify = require('swagger-restify-mw');
const restify = require('restify');

const app = restify.createServer();

const { connectDB } = require('./api/adaptors/db');
const { clientScraper } = require('./api/controllers/scrapCtrl');
const { port, clientInfoUrl } = require('./config/config');

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
};

SwaggerRestify.create(config, (err, swaggerRestify) => {
  if (err) { throw err; }

  swaggerRestify.register(app);

  connectDB.then(() => {
    clientScraper(clientInfoUrl).then(() => {
      app.listen(port);
    });
  });
});
