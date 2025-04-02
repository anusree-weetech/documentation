const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
  }

  type Mutation {
    createUser(name: String, email: String): User
  }

  type Query {
    _empty: String
  }
`;

const resolvers = {
  Mutation: {
    createUser: (_, { name, email }) => {
      if (!email.includes("@")) {
        throw new Error("Invalid email format");
      }
      return { id: "1", name, email };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(() => console.log("server listening on http://localhost:4000"));
