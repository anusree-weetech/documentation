## To autogenerate schema using graphql inspector

- run `graphql-inspector introspect http://localhaost:4000/graphql > schema.json`
- run `graphql-inspector serve graphql.schema.json`

- make sure to have 1 query and 1 mutataion, else error.
- docs can be available at http://localhost:4000/graphql
    - it will be run using graphql yooga, since that is what is used under hood of graphql-inspector

- for those cases when you want to run docs seperately without the server running