const { gql, ApolloServer } = require("apollo-server");
const { ApolloServerPluginPersistedQueries } = require("apollo-server-core");

const typeDefs = gql`
  type Query {
    hello: String
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL!",
    user: (_, { id }) => ({ id, name: `User ${id}` }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginPersistedQueries()],
});

server
  .listen()
  .then(() => console.log("server running at http://localhost:4000"));
