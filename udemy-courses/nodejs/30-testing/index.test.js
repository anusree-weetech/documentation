// test/app.test.js
const request = require('supertest');
const app = require('../app'); // Import the app

const chai = require('chai');
const expect = chai.expect;

describe('GET /hello', () => {
  it('should return a JSON object with a message', (done) => {
    request(app)
      .get('/hello')  // Make a GET request to /hello
      .end((err, res) => {
        if (err) return done(err);

        expect(res.status).to.equal(200);  // Assert that the status code is 200
        expect(res.body).to.have.property('message');  // Check if the response has a message property
        expect(res.body.message).to.equal('Hello, world!');  // Verify the message
        done();
      });
  });
});
