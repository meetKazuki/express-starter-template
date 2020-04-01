const { should } = require('chai');
const { ApplicationError, NotFoundError } = require('../../src/helpers/errors');

should();

describe('Errors helper class', () => {
  describe('Base Application Error', () => {
    it('should set status code as 500 if error code is not defined', async () => {
      const error = new ApplicationError();
      error.should.have.property('statusCode');
      error.statusCode.should.equal(500);
    });

    it('should set statusCode to defined code', async () => {
      const error = new ApplicationError(404);
      error.should.have.property('statusCode');
      error.statusCode.should.equal(404);
    });

    it('should set error message', async () => {
      const error = new ApplicationError(404, 'resource not found');
      error.should.have.property('message');
      error.message.should.equal('resource not found');
    });
  });

  describe('NotFoundError class', () => {
    it('set statusCode as 404 when class is instatiated', async () => {
      const error = new NotFoundError();
      error.should.have.property('statusCode');
      error.statusCode.should.equal(404);
    });
  });
});
