import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello from Express!');
});

export default app;
