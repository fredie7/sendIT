import chaiHttp from 'chai-http';
import chai from 'chai';
import uuidV4 from 'uuid/v4';
import app from '../app';


chai.use(chaiHttp);
chai.should();

const { expect } = chai;
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

  // TODO: Add more tests cases for signup here
});

// signin "describe" block
describe('/api/v1/auth/signin', () => {
  let newUser = {
    name: 'emma',
    email: 'emma@test.com',
    password: 'emmapassword1',
  };

  // The before block is used here to allow us signup a user, who we can then attempt to signin
  // This block will be executed before the test cases below for this "describe" block (signin)
  before((done) => {
    request.post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        done();
      });
  });

  it('returns success when valid input is provided', (done) => {
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
        done();
      });
  });

  it('fails when password is not provided', (done) => {
    const user = {
      email: 'emma@test.com',
      password: '',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('password must contain at least 6 characters');
        done();
      });
  });

  it('fails on wrong user credentials', (done) => {
    const user = {
      email: 'emma@test.com',
      password: 'password123',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('user does not exist');
        done();
      });
  });

  it('fails when password does not contain digit character', (done) => {
    const user = {
      email: 'emma@test.com',
      password: 'emmapassword',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('password must contain digit character');
        done();
      });
  });

  // TODO: Add more test cases for signin here
  it('fails if email is not valid', (done) => {
    const user = {
      email: 'xyz@test.com',
      password: 'emmapassword1',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('user does not exist');
        done();
      });
  });

  it('email must contain an @ symbol', (done) => {
    const emailMatch = /^[a-zA-Z]+@[a-zA-Z]+.+[a-zA-Z]$/;
    const user = {
      email: 'emmatest.com',
      password: 'emmapassword1',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        if (!emailMatch.test(user.email)) {
          res.should.have.status(422);
        }
        done();
      });
  });
});

describe('/api/v1/parcels/parcels', () => {
  const newUser = {
    name: 'felix',
    email: 'felix@test.com',
    password: 'jayjay1',
  };
  const user = {
    email: 'felix@test.com',
    password: 'jayjay1',
  };

  before((done) => {
    request.post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        done();
      });
    
    request.post('api/v1/auth/signin')
      .send(user)
      .end((err,res) => {
        done();
      });
  });

  it('should provide a statusCode of 201', (done) => {
    const order = {
      id: uuidV4(),
      createdBy: 'felix',
      pickupLocation: 'ikeja',
      deliveryLocation: 'maryland',
      presentLocation: 'ogba',
      receiverPhone: '08076323278',
      receiverEmail: 'felix@gmail.com',
      description: 'felix dummy desc desc',
      weight: '10',
    };
    chai.request(app)
      .post('/api/v1/parcels/parcels')
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
      });
    done();
  });
});
