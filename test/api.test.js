const request = require('supertest');
const assert = require('assert');
const app = require('../src/index');

after((done) => {
  process.exit(1);
  done();
});

describe('API Test', () => {
  it('GET to /json should 200', (done) => {
    request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        assert(body.data.length > 1);
        done();
      });
  });
});
