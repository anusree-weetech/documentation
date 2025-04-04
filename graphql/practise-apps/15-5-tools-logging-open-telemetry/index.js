


const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
require("./tracing");

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
app.use("/graphql", (req, res, next) => {
  logger.info({
    type: "GraphQL Request",
    query: req.body?.query,
    variables: req.body?.variables,
  });
  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.start().then(() => server.applyMiddleware({ app, path: "/graphql" }));
app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000/graphql`);
});

// You can then use OpenTelemetry Collector, or send data to services like:

// Grafana Tempo

// Jaeger

// Honeycomb

// Datadog / New Relic / Lightstep
