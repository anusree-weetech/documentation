const { gql } = require("apollo-server-core");

// written using template literals
const typeDefs = gql`
  type Call {
    callHello: String
  }

  type Query {
    getCall: Call
  }
`;

module.exports = typeDefs;
