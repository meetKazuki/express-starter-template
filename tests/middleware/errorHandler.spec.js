const { should } = require('chai');
const { ApplicationError } = require('../../src/helpers/errors');
const errorHandler = require('../../src/middleware/errorHandler');

should();

describe('Error handler middleware', () => {
  let request;
  let response;
  let next;
  let nextCall = 0;
  const error = new Error('Error');

  beforeEach(() => {
    response = {
      status(code) {
        response.statusCode = code;
        return response;
      },
      json(data) {
        response.body = data;
      },
    };
    request = {};
    next = () => { nextCall += 1; };
  });

  it('should return 500 error statusCode for base error', async () => {
    errorHandler(error, request, response, next);
    response.statusCode.should.eql(500);
  });

  it('should not return error stack trace when in production env', async () => {
    process.env.NODE_ENV = 'production';
    error.statusCode = 403;

    errorHandler(error, request, response, next);
    response.statusCode.should.equal(403);
    response.body.status.should.eql('error');
    response.body.error.message.should.eql('Error');
    response.body.error.should.not.have.property('trace');
  });

  it('should return error stack trace when in development env', async () => {
    process.env.NODE_ENV = 'development';
    error.statusCode = 400;

    errorHandler(error, request, response, next);
    response.statusCode.should.equal(400);
    response.body.status.should.eql('error');
    response.body.error.message.should.eql('Error');
    response.body.error.should.have.property('trace');
  });

  it('should call next() when response headers have been sent', async () => {
    response.headersSent = true;

    errorHandler(error, request, response, next);
    nextCall.should.equal(1);
    response.should.not.have.property('body');
  });

  it('should have an errors field', async () => {
    const requestErr = new ApplicationError(404, 'invalid input', ['err response']);

    errorHandler(requestErr, request, response, next);
    response.statusCode.should.equal(404);
    response.body.status.should.eql('error');
    response.body.error.errors.should.not.be.empty;
  });
});
