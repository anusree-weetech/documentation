const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloError } = require("apollo-server-errors");
const express = require("express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    friends: String
  }

  type Query {
    user(id: ID!): User
  }
`;

const usersDb = {
  1: {
    id: "1",
    name: "Alice",
    friends: "friends!",
  },
  2: { id: "2", name: "Bob", friends: "friends 2!" },
};

const resolvers = {
  Query: {
    user: (_, { id }) => usersDb[id],
  },
};

const allowedQueries = {
  getUser: `query getUser($id: ID!) { user(id: $id) { name } }`,
};

const app = express();
app.use(express.json());
app.get("/graphql");


const queryWhitelistPlugin = {
  async requestDidStart() {
    return {
      async didResolveOperation({ request, operation }) {
        const normalizedQuery = request.query?.replace(/\s+/g, " ").trim();
        const isAllowed = Object.values(allowedQueries).some(
          (allowed) => allowed.replace(/\s+/g, " ").trim() === normalizedQuery
        );

        if (!isAllowed) {
          throw new ApolloError("Unauthorized query."); // Will be caught by formatError
        }
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [queryWhitelistPlugin],
  formatError: (err) => ({ message: "Internal Server Error" }), // Hide internal details
  introspection: process.env.NODE_ENV !== "production", // Disable introspection in production
});
server.start().then(() => server.applyMiddleware({ app, path: "/graphql" }));
app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000/graphql`);
});
