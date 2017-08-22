const { GraphQLObjectType, GraphQLString } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
});

module.exports = UserType;
