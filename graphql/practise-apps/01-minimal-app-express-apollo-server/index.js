const { gql } = require("apollo-server-core");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");

// schema: defins the structure of data in graphql 
const typeDefs = gql`
  type Call {
    callHello: String
  }

  type Query {
    getCall: Call
  }
`;

// resolvers: fuctions to handle fetching or modifying data in graphql
const resolvers = {
  Query: {
    getCall: () => "Hello world!",
  },
};

// apollo server instance
const apolloServer = new ApolloServer({ typeDefs, resolvers });
const app = express();
apolloServer.start().then(() => apolloServer.applyMiddleware({ app }));

app.listen(3000, () => console.log("server listening in port 3000"));
