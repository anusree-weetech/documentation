import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('GET /hello', () => {
  it('should return Hello, world!', async () => {
    const res = await request(app).get('/hello');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ message: 'Hello, world!' });
  });
});
