const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
        return `> [${timestamp}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
      })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

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
    message: "GraphQL Request",
    query: req.body?.query,
    variables: req.body?.variables,
    time: new Date().toISOString(),
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
