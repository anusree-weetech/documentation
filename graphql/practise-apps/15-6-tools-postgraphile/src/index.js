require('dotenv').config();
const express = require('express');
const { postgraphile } = require('postgraphile');
const dbConfig = require('./config/db');

const app = express();

app.use(
  postgraphile(
    dbConfig.connectionString,
    'public',
    {
      graphiql: true,
      enhanceGraphiql: true,
      dynamicJson: true,
      watchPg: true, // auto-reload schema in dev
    }
  )
);

app.listen(4000, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphiql`)
);
