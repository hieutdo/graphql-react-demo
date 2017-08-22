const models = require('./models');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

function startServer(port, mongoUri) {
  if (!port) {
    throw new TypeError('port cannot be empty');
  }

  console.info('Starting Express server...');

  const app = express();

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaaabbbbcccc',
    store: new MongoStore({
      url: mongoUri,
      autoReconnect: true,
    }),
  }));

  app.use(passport.initialize());
  app.use(passport.session());

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
