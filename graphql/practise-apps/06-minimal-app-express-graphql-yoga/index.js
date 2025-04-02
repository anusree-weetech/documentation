const express = require("express");
const { createSchema, createYoga } = require("graphql-yoga");

const app = express();

// ✅ Define schema (GraphQL SDL)
const schema = createSchema({
  typeDefs: `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => "Hello from GraphQL Yoga! 🚀",
    },
  },
});

// ✅ Setup GraphQL Yoga
const yoga = createYoga({ schema });

// ✅ Use Yoga as Express middleware
app.use("/graphql", yoga);

app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
