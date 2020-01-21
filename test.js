import chaiHttp from 'chai-http';

import app from './app';

const chai = require('chai');
// const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();
const { expect } = chai;
const should = chai.should();
const request = chai.request(app);


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
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        done();
      });
  });
});


describe('/api/v1/auth/signin', () => {
  let newUser = {
    name: 'emma',
    email: 'emma@test.com',
    password: 'emmapassword1',
  };
  before((done) => {
    request.post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        done();
      });
  });
  it('should return a status code of 200', (done) => {
    const user = {
      email: newUser.email,
      password: newUser.password,
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
  let newUser = {
    name: 'emma',
    email: 'emma@test.com',
    password: 'emmapassword1',
  };
  before((done) => {
    request.post('api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        done();
      });
  });
  it('password must contain a digit character', (done) => {
    const user = {
      email: newUser.email,
      password: 'emmapassword',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('password must contain digit character');
        res.body.should.have.property('error').eql('user does not exist');
        done();
      });
  });
});

describe('/api/v1/auth/signin', () => {
  let newUser = {
    name: 'emma',
    email: 'emma@test.com',
    password: 'emmapassword1',
  };
  before((done) => {
    request.post('api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        done();
      });
  });
  it('fails when password is not provided', (done) => {
    const user = {
      email: newUser.email,
      password: '',
    };
    chai.request(app)
      .post('api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.a.property('error').eql('password must contain at least 6 characters');
        done();
      });
  });
});

describe('/api/v1/auth/signin', () => {
  let newUser = {
    name: 'emma',
    email: 'emma@test.com',
    password: 'emmapassword1',
  }
  before((done) => {
    request.post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        done();
      });
  });
  it('fails on wrong user credentials', (done) => {
    const user = {
      email: 'emma@test.com',
      password: 'jdkhbvnbmnbb',
    };
    chai.request(app)
      .post('api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.have.property('error').eql('user does not exist');
        done();
      })
  })
})