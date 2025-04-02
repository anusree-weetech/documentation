const { ApolloServer, gql } = require("apollo-server");

// 🗄 Mock Database
const posts = [
  { id: "1", title: "GraphQL Basics", authorId: "101" },
  { id: "2", title: "Advanced GraphQL", authorId: "102" },
  { id: "3", title: "Using DataLoader", authorId: "101" },
];

const users = [
  { id: "101", name: "Alice" },
  { id: "102", name: "Bob" },
];

// 📜 GraphQL Schema
const typeDefs = gql`
  type Query {
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    author: User
  }

  type User {
    id: ID!
    name: String!
  }
`;

// 🏗 Resolvers (⚠️ Without Batching)
const resolvers = {
  Query: {
    posts: () => posts,
  },
  Post: {
    author: (post) => {
      console.log(`Fetching author ${post.authorId} individually`); // Debugging
      return users.find((user) => user.id === post.authorId);
    },
  },
};

// 🚀 Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// to run: `node 05-query-without-batching.js`