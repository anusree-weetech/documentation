const { ApolloServer, gql } = require("apollo-server");

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
    getCall: () => (
      {callHello: "Hello world!"}
    ),
  },
};

// apollo server instance
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log("server listening in port 4000"));
