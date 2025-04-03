const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = `
  type Order {
    id: ID!
    userId: ID!
    amount: Float!
  }

  type Query {
    orders: [Order]
  }
`;

const resolvers = {
  Query: {
    orders: () => [{ id: "1", userId: "1", amount: 99.99 }],
  },
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
