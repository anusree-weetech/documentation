import { makeSchema, objectType, queryType } from "nexus";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { join } from "path";

// Define a User type
const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
  },
});

// Root query
const Query = queryType({
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve: () => [
        { id: 1, name: "Alice", email: "alice@example.com" },
        { id: 2, name: "Bob", email: "bob@example.com" },
      ],
    });
  },
});

// Create schema
const schema = makeSchema({
  types: [Query, User],
  outputs: {
    schema: join(__dirname, "..", "schema.graphql"),
    typegen: join(__dirname, "nexus-typegen.ts"),
  }
});

// Start server
const yoga = createYoga({ schema });

const server = createServer(yoga);
server.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
