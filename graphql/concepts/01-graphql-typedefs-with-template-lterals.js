// most popular

const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type Call {
    callHello: String
  }

  type Query {
    getCall: Call
  }
`;

module.exports = typeDefs;
