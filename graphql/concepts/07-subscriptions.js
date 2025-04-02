// websocket of apollo server has been derecated. so the current code is messy

const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const express = require("express");
const app = express();

const { createServer } = require("http");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { makeServer } = require("graphql-ws");

const pubsub = new PubSub();
const httpServer = createServer(app);

const typeDefs = `
  type Message {
    id: ID
    content: String
    sender: String
  }

  type Subscription {
    messageAdded: Message
  }

  type Mutation {
    addMessage(content: String, sender: String): Message
  }

  type Query {
    _empty: String
  }
`;

const resolvers = {
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(["MESSAGE_ADDED"]),
    },
  },
  Mutation: {
    addMessage: (_, { content, sender }) => {
      const message = { id: "1", content, sender };
      pubsub.publish("MESSAGE_ADDED", { messageAdded: message });
      return message;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = makeServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

server.start().then(() => server.applyMiddleware({ app }));
httpServer.listen(4000, () =>
  console.log("server running on http://localhost:4000/graphql")
);
