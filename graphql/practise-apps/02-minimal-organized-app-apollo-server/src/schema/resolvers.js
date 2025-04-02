const resolvers = {
  Query: {
    getCall: () => ({ callHello: "Hello World!" }),
  },
};

module.exports = resolvers;
