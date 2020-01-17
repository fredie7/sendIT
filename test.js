import chaiHttp from 'chai-http';

import app from './app';

const chai = require('chai');

chai.use(chaiHttp);

const should = chai.should();

// const should = require('should');

const expect = chai.expect;

describe('/api/v1/auth/signup', () => {
  it('should return a status code of 201', (done) => {
    const user = {
      name: 'emma',
      email: 'emma@test.com',
      password: 'emmapassword1',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((req, res) => {
        res.should.have.status(201);
        done();
      });
  });
});


describe('/api/v1/auth/signin', () => {
  it('should return a status code of 200', (done) => {
    const user = {
      email: 'emma@test.com',
      // password: 'emmapassword1',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((req, res) => {
        res.should.have.status(200);
        // expect(res).to.have.status(200);
        done();
      });
  });
});
