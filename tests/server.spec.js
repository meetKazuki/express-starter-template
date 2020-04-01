const request = require('supertest');

describe.skip('', () => {
  let server;

  beforeEach(() => {
    server = require('../src/server');
  });

  afterEach((done) => {
    server.close(done);
  });

  it('should respond to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  specify('404 for non-existent endpoints', (done) => {
    request(server)
      .get('/$')
      .expect(404, done);
  });
});
