import request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  it('should return Hello from Express!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from Express!');
  });
});
