const query = require('./root-query.type');
const mutation = require('./mutation');
const { GraphQLSchema } = require('graphql');

module.exports = new GraphQLSchema({
  query,
  mutation,
});
