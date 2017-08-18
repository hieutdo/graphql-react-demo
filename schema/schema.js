const axios = require('axios');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve({ id }) {
        const { data: users } = await axios.get(`http://localhost:3000/companies/${id}/users`);
        return users;
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve({ companyId }) {
        const { data: company } = await axios.get(`http://localhost:3000/companies/${companyId}`);
        return company;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(_, { id: userId }) {
        const { data: user } = await axios.get(`http://localhost:3000/users/${userId}`);
        return user;
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      async resolve(_, { id: companyId }) {
        const { data: company } = await axios.get(`http://localhost:3000/companies/${companyId}`);
        return company;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
