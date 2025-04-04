// rewrite the entire code with client side code along with it

const express = require("express");
const { createSchema, createYoga } = require("graphql-yoga");
const { createHash } = require("crypto");

const extractedQueries = {};
const server = express();
const schema = createSchema({
  typeDefs: `
      type Query {
        hello(name:String): String
      }
    `,
  resolvers: {
    Query: {
      hello: (_, { name }) => {
        extractedQueries[querySignature]
        return`hello ${name}`},
    },
  },
});

const yoga = createYoga({ schema });

server.use(
  "/graphql",
  (req, res, next) => {
    console.log("Handling request to: " + req.url);
    res.set("Cache-Control", "public, max-age=10");

    const extensions = JSON.parse(req.query.extensions);
    console.log("extension:", extensions);
    const querySignature = extensions.persistedQuery.sha256Hash;
    console.log("querySignature:", querySignature);
    const persistedQuery = extractedQueries[querySignature];
    console.log("persistedQuery:", persistedQuery);

    if (!persistedQuery) {
      // if no query hash in cache, then create a hash from teh req.query.query, then forward teh query to next middleware,
      console.log('query executed')
      return next();
    }

    console.log('result served from cache')
    req.query.query = persistedQuery; // Replace with stored query
    next();
  },
  yoga
);

server.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
