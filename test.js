import app from './app';

const chai = require('chai');

const should = chai.should();
describe('/api/v1/auth/signup', () => {
  it('should return a status code of 200', (done) => {
    const user = {
      name: 'emma',
      email: 'emma@test.com',
      password: 'emmapassword1',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((req, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
