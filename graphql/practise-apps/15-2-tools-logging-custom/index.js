
const { ApolloServer, gql } = require("apollo-server-express");
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


const app = express();
app.use(express.json());
app.use(
  "/graphql",
  (req, res, next) => {
    const query = req.body?.query?.replace(/\s+/g, " ").trim();
    console.log("GraphQL Query:", query);
    next();
  }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.start().then(() => server.applyMiddleware({ app, path: "/graphql" }));
app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000/graphql`);
});
