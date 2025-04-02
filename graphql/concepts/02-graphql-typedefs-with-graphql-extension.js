//  fiel to load .graphql types

// one way of loading using fs and path
const fs = require("fs");
const path = require("path");

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

module.exports = typeDefs;

//  anothe r way of loading using graphql tools for large projects
// const { loadFilesSync } = require("@graphql-tools/load-files");
// const { mergeTypeDefs } = require("@graphql-tools/merge");

// const typesArray = loadFilesSync(
//   path.join(__dirname, "./schemas/**/*.graphql")
// );
// const typeDefs = mergeTypeDefs(typesArray);

// module.exports = typeDefs;
