const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function connectToDb(mongoUri) {
  if (!mongoUri) {
    throw new TypeError('mongoUri cannot be empty.');
  }

  console.info(`Connecting to MongoDB at ${mongoUri} ...`);

  return mongoose
    .connect(mongoUri, { useMongoClient: true })
    .then(() => {
      console.info('MongoDB connected!');
      return mongoose.connection;
    });
}

module.exports = connectToDb;
