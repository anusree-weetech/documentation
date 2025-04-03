const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const gql = require("graphql-tag");
const { startStandaloneServer } = require("@apollo/server/standalone");


const typeDefs = gql`
  type Order {
    id: ID
    product: String
    amount: Int
  }

  extend type User @key(fields: "id") {
    id: ID @external
    orders: [Order]
  }

  type Query {
    orders: [Order]
  }
`;

const resolvers = {
  User: {
    orders: (user) => [
      { id: "101", product: "Laptop", amount: 1200 },
      { id: "102", product: "Phone", amount: 800 },
    ],
  },
  Query: {
    orders: () => [{ id: "101", product: "Laptop", amount: 1200 }],
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: { port: 4002 },
}).then(({ url }) => console.log(` Order Service Running at ${url}`));
