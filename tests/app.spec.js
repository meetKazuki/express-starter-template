const request = require('supertest');
const { should } = require('chai');
const app = require('../src/app');

should();

describe('App setup', () => {
  it('should return app as a function', () => {
    app.should.be.a('function');
  });

  it('should return success on home route request', async () => {
    const response = await request(app).get('/');

    response.status.should.equal(200);
    response.body.status.should.eql('success');
    response
      .body
      .message
      .should
      .eql('welcome to "Express Starter Template for Sequelize"');
  });

  specify('error if an invalid route is requested', async () => {
    const response = await request(app).get('/invalid');

    response.status.should.equal(404);
    response.body.status.should.eql('error');
    response.body.error.should.eql('resource not found');
  });
});
