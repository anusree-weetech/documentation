const { gql } = require("graphql-tag");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");


const typeDefs = gql`
  type User @key(fields: "id") {
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
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
    listen: { port: 4001 },
  }).then(({ url }) => console.log(` User Service Running at ${url}`));
  