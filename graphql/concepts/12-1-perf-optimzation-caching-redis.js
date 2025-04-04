const { ApolloServer, gql } = require("apollo-server");
const { createClient } = require("@redis/client");

const client = createClient({
  url: "redis://localhost:6379", // Specify the Redis URL
});

client
  .connect()
  .then(() => console.log("Connected to Redis client"))
  .catch((err) => {
    console.error("Error connecting to Redis:", err);
  });

const usersDb = {
  1: { id: "1", name: "Alice" },
  2: { id: "2", name: "Bob" },
  3: { id: "3", name: "Charlie" },
};

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      console.log("id:", id);
      // Check if the user is cached
      client
        .get(`user:${id}`)
        .then((cachedUser) => {
          if (cachedUser) {
            console.log("Returning cached user");
            return JSON.parse(cachedUser); // Return the cached data
          }

          // If not cached, fetch from the "database" (or actual DB in production)
          const user = usersDb[id];

          if (user) {
            // Cache the user for 15 sec
            client.setEx(`user:${id}`, 5, JSON.stringify(user));
            console.log("Caching user for future requests");
          }
        })
        .catch((err) => {
          console.log("Error fetching from Redis:", err);
        });

      return { id: "1", name: "Alice" }; // Return the fetched user
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
