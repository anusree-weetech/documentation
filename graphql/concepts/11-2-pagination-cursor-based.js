// prefered choice of use

const { ApolloServer, gql } = require("apollo-server");

// Sample Users Data
const users = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `User ${i + 1}`,
}));

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type UserEdge {
    node: User!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  type UserConnection {
    edges: [UserEdge!]!
    pageInfo: PageInfo!
  }

  type Query {
    users(first: Int!, after: ID): UserConnection!
  }
`;

const resolvers = {
  Query: {
    users: (_, { first, after }) => {
      const startIdx = after ? users.findIndex((u) => u.id === after) + 1 : 0;
      const data = users.slice(startIdx, startIdx + first);

      return {
        edges: data.map((user) => ({ node: user })),
        pageInfo: {
          hasNextPage: startIdx + first < users.length,
          endCursor: data.length ? data[data.length - 1].id : null,
        },
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
