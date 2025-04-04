const { ApolloServer, gql } = require("apollo-server-express");
const rateLimit = require("express-rate-limit");
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
  User: {
    friends: (parent) => parent.friends || [],
  },
};

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10sec
  max: 5, // 5 requests per 10sec
}); //not getting the custom message dont know why. research later

const app = express();
app.use("/graphql", limiter);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.start().then(() => server.applyMiddleware({ app, path: "/graphql" }));
app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000/graphql`);
});
