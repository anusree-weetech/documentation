const express = require("express");
const { createPubSub, createSchema, createYoga } = require("graphql-yoga");

const app = express();
const pubsub = createPubSub();

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
      subscribe: () => pubsub.subscribe(["MESSAGE_ADDED"]),
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

const server = createYoga({ schema: createSchema({ typeDefs, resolvers }) });
app.use("/graphql", server);
app.listen(4000, () => {
  console.log(`Server running on http://localhost:${4000}/graphql`);
});
