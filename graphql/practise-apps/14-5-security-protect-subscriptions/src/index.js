const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const typeDefs = gql`
  type Message {
    content: String!
  }

  type Query {
    ping: String
  }

  type Subscription {
    newMessage: Message
  }
`;

const resolvers = {
  Query: {
    ping: () => "pong",
  },
  Subscription: {
    newMessage: {
      subscribe: (_, __, { user }) => {
        if (!user) throw new Error("Unauthorized");
        return pubsub.asyncIterator(["MESSAGE_ADDED"]);
      },
    },
  },
};

const app = express();

// Example of injecting a fake authenticated user for demo
const getUserFromRequest = (req) => {
  // Replace with your actual auth logic
  return { id: 1, name: "Alice" }; // Or null if not authenticated
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, connection }) => {
    // For HTTP requests
    if (req) {
      return { user: getUserFromRequest(req) };
    }

    // For WebSocket connections (subscriptions)
    if (connection) {
      return connection.context;
    }
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      // Simulate user auth during WebSocket connection
      const user = { id: 1, name: "Alice" }; // Or reject if not authenticated
      if (!user) throw new Error("Unauthorized subscription");
      return { user };
    },
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  const httpServer = app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`);
  });

  server.installSubscriptionHandlers(httpServer);
});
