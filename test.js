import chaiHttp from 'chai-http';

import app from './app';

const chai = require('chai');
// const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const should = chai.should();


describe.skip('/api/v1/auth/signup', () => {
  it.skip('should return a status code of 201', (done) => {
    const user = {
      name: 'emma',
      email: 'emma@test.com',
      password: 'emmapassword1',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        done();
      });
  });
});

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
      .end((err, res) => {
        expect(res).to.have.status(201);
        // expect(res.email).to.exist;
      });
    done();
  });
});

describe('/api/v1/auth/signin', () => {
  it('should return a status code of 200', (done) => {
    const user = {
      email: 'emma@test.com',
      password: 'emmapassword1',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        console.log(res.body)
        done();
      });
  });
});

describe('/api/v1/auth/signin', () => {
  it('password must contain a digit character', (done) => {
    const user = {
      email: 'emma@test.com',
      password: 'emmapassword',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('password must contain digit character');
        done();
      });
  });
});

describe.skip('/api/v1/auth/signin', () => {
  it.skip('should have a password', (done) => {
    const user = {
      email: 'ema@test.com',
      password: '',
    };
    chai.request(app)
      .post('api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.a.property('error');
        res.body.error.should.have.property('password');
        done();
      });
  });
});
