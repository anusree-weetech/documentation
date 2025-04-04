require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { gql } = require("graphql-tag");

const typeDefs = gql`
  type User {
    id: ID
    name: String
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: () => [
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
    ],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Apollo Studio config
  apollo: {
    key: process.env.APOLLO_KEY,
    graphRef: process.env.APOLLO_GRAPH_REF,
  },
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => console.log(` User Service Running at ${url}`));
