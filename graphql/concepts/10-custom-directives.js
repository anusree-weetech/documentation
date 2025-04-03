// as per apollo-server version 4 (latest)

const { ApolloServer } = require("apollo-server");
const { MapperKind } = require("@graphql-tools/utils");
const { mapSchema } = require("@graphql-tools/utils");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { getDirective } = require("@graphql-tools/utils");
const { defaultFieldResolver } = require("graphql");

const typeDefs = `
  directive @uppercasearray on FIELD_DEFINITION

  type Query {
    name(input:String): [String] @uppercasearray
  }
`;

// Implement the Directive
function upperCaseTransformer(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === "string") {
            return result.toUpperCase().split("");
          }
          return result;
        };
        return fieldConfig;
      }
    },
  });
}

const resolvers = {
  Query: {
    name: (_, { input }) => input,
  },
};

let schema = makeExecutableSchema({ typeDefs, resolvers });
schema = upperCaseTransformer(schema, "uppercasearray");

const server = new ApolloServer({ schema });
server.listen().then(() => console.log("running"));
