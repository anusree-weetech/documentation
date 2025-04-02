const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// Define GraphQL schema. not the same as typedefs
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Define resolvers
const root = {
  hello: () => "Hello, GraphQL!",
};

// Create an Express app
const app = express();

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enables GraphiQL for testing
  })
);

// You could just use express and graphql directly, but express-graphql makes it much easier to integrate GraphQL . else we eil will have to code like bellow
// app.post("/graphql", async (req, res) => {
//     const { query, variables } = req.body;
//     const response = await graphql(schema, query, root, null, variables);
//     res.json(response);
//   });

// Start server
app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
