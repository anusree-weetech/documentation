const { ApolloServer, gql } = require("apollo-server");

// Sample Users Data
const users = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `User ${i + 1}`,
}));

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users(limit: Int!, offset: Int!): [User!]!
  }
`;

const resolvers = {
  Query: {
    users: (_, { limit, offset }) => users.slice(offset, offset + limit),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
