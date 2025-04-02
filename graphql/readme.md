### Graphql

- ways to query graphql endpoints
  - dirstecly write the < url >/graphql in browser. if the serevr was made using apollo server, it will show an interface to query from
  - curl using terminal
  - using postman
  - from client side using fetch api/axios
  - from client side usig apollo client instead of fetch or axios
- docs:
  - easily available at the server url where the server is running
  - also available in postman on the top right side
- autogeneration:
  - autogenerate types for graphql using graphql-codegen (read more)
  - many project autogeneration methods. but all of them have excessive files: npx degit prisma/graphql-yoga, npx create-graphql-server my-graphql-app, etc
