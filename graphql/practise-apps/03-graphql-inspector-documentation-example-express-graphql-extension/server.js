const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const fs = require("fs");
const path = require("path");
const resolvers = require("./resolvers");

// Load GraphQL schema from .graphql file
const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const app = express();

// Start Apollo Server (GraphQL)
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => server.applyMiddleware({ app }));
app.listen(4000, () => {
  console.log("🚀 GraphQL API: http://localhost:4000/graphql");
});
