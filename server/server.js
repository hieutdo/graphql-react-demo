const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

dotenv.load();
mongoose.Promise = global.Promise;

const { MONGODB_URI, PORT } = process.env;

async function connectToDb(mongoUri) {
  if (!mongoUri) {
    throw new TypeError('mongoUri cannot be empty.');
  }
  console.info(`Connecting to MongoDB at ${mongoUri} ...`);
  await mongoose.connect(mongoUri, { useMongoClient: true });
  console.info('MongoDB connected!');
  return mongoose.connection;
}

async function startServer(port) {
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

async function gracefulShutdown(expressApp, mongoConnection, exitCode = 0) {
  try {
    console.log('Preparing to shutdown...');
    if (expressApp) {
      await new Promise((resolve, reject) => {
        expressApp.close(error => error ? reject(error) : resolve());
      });
    }
    if (mongoConnection) {
      await mongoConnection.close();
    }
  } catch (e) {
    console.error(e);
    exitCode = 1;
  } finally {
    console.info('Bye!');
    process.exit(exitCode);
  }
}

async function bootstrap() {
  let mongoConnection;
  let expressApp;

  try {
    mongoConnection = await connectToDb(MONGODB_URI);
    expressApp = await startServer(PORT);
    process
      .on('SIGINT', gracefulShutdown.bind(null, expressApp, mongoConnection))
      .on('SIGTERM', gracefulShutdown.bind(null, expressApp, mongoConnection));
  } catch (e) {
    console.error(e);
    gracefulShutdown(expressApp, mongoConnection, 1);
  }
}

bootstrap();
