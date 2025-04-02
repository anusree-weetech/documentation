const users = {}; // Temporary in-memory store

const resolvers = {
  Query: {
    getUser: (_, { id }) => users[id] || null, // Fetch user from the store
  },
  Mutation: {
    createUser: (_, { id, name }) => {
      users[id] = { id, name }; // Store the new user
      return users[id]; // Return the created user
    },
  },
};

module.exports = resolvers;
