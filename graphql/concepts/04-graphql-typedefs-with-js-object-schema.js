// least popular way of definig typedefs

const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require("graphql");

const CallType = new GraphQLObjectType({
  name: "Call",
  fields: {
    callHello: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getCall: {
      type: CallType,
      resolve() {
        return { callHello: "Hello World!" };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
