const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const models = require('./models');
const schema = require('./schema');

function startServer(port) {
  if (!port) {
    throw new TypeError('port cannot be empty');
  }

  console.info('Starting Express server...');

  const app = express();

  app.use(bodyParser.json());
  app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
  }));

  return app.listen(port, () => {
    console.info(`Server started! Listening on port ${port}`);
  });
}

module.exports = startServer;
