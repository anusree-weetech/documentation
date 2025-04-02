// third most popular way of defining typedefs
// without gql, ussing pure strings

const typeDefs = `
  type Call {
    callHello: String
  }

  type Query {
    getCall: Call
  }
`;

module.exports = typeDefs;
