const { ApolloServer, gql } = require("apollo-server");
const depthLimit = require("graphql-depth-limit");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    friends: [User]
  }

  type Query {
    user(id: ID!): User
  }
`;

const usersDb = {
  1: {
    id: "1",
    name: "Alice",
    friends: [{ id: "2", name: "Bob", friends: [] }],
  },
  2: { id: "2", name: "Bob", friends: [] },
};

const resolvers = {
  Query: {
    user: (_, { id }) => usersDb[id],
  },
  User: {
    friends: (parent) => parent.friends || [],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(3)], // Max 3 levels deep
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// will give rerror:"message": "'ExampleQuery' exceeds maximum operation depth of 3",
