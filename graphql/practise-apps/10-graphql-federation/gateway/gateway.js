const { ApolloServer } = require("@apollo/server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { startStandaloneServer } = require("@apollo/server/standalone");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "users", url: "http://user-service:4001/graphql" },
      { name: "orders", url: "http://order-service:4002/graphql" },
    ],
  }),
});

const server = new ApolloServer({ gateway });
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => console.log(` Gateway Running at ${url}`));
