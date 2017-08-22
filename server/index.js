require('dotenv').load();

const connectToDb = require('./src/db');
const startServer = require('./src/server');
const { MONGODB_URI, PORT } = process.env;

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

(async function () {
  let mongoConnection;
  let expressApp;

  try {
    mongoConnection = await connectToDb(MONGODB_URI);
    expressApp = await startServer(PORT, MONGODB_URI);
    process
      .on('SIGINT', gracefulShutdown.bind(null, expressApp, mongoConnection))
      .on('SIGTERM', gracefulShutdown.bind(null, expressApp, mongoConnection));
  } catch (e) {
    console.error(e);
    gracefulShutdown(expressApp, mongoConnection, 1);
  }
})();
