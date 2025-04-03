const { stitchSchemas } = require("@graphql-tools/stitch");
const { ApolloServer } = require("apollo-server");

const userSchema = require("./userSchema");
const orderSchema = require("./orderSchema");

const gatewaySchema = stitchSchemas({
  subschemas: [userSchema, orderSchema],
});

const server = new ApolloServer({ schema: gatewaySchema });
server.listen(4000).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
