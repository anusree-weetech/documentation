const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String @deprecated(reason: "Use contactEmail instead")
  }

  type Query {
    getUser(withEmail: Boolean!): User
  }
`;

const resolvers = {
  Query: {
    getUser: (_, { withEmail }) => ({
      id: "1",
      name: "some name",
      email: "emaili",
    }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(() => console.log("sererv is listening on http://localhost:4000"));
