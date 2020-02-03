import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('/api/v1/parcels', () => {
const user = {
    id: null,
    token: null,
    email: 'felix@test.com',
    password: 'jayjay1',
    name: 'felix',
};
const signupData = {
    id: user.id,
    createdBy: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  };
  const signinData = {
    name: user.name,
    email: user.email,
    password: user.password,
  };
before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signupData)
      .end((err, res) => {
        user.id = res.body.id;
      });
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(signinData)
      .end((err, res) => {
        user.token = res.body.token;
        done();
      });
  });

it('should provide a statusCode of 201', (done) => {
    const order = {
      pickupLocation: 'ikeja',
      deliveryLocation: 'maryland',
      presentLocation: 'ogba',
      receiverPhone: '08076323278',
      receiverEmail: 'felix@gmail.com',
      description: 'felix dummy desc desc',
      weight: '10',
    };
    chai.request(app)
      .post('/api/v1/parcels')
      .set('authorization', user.token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('createdBy');
        res.body.createdBy.should.eql(user.id);
        res.body.should.have.property('pickupLocation');
        res.body.should.have.property('deliveryLocation');
        res.body.should.have.property('presentLocation');
        res.body.should.have.property('receiverPhone');
        res.body.should.have.property('receiverEmail');
        res.body.should.have.property('description');
        res.body.should.have.property('weight');
        done();
      });
  });

it('should fail if any enteries aren\'t provided', (done) => {
    const order = {
      createdBy: user.id,
      pickupLocation: '',
      deliveryLocation: '',
      presentLocation: '',
      receiverPhone: '',
      receiverEmail: '',
      description: '',
      weight: '',
    };

    chai.request(app)
      .post('/api/v1/parcels')
      .send(order)
      .end((req, res) => {
        res.body.should.be.a('object');
        res.should.have.status(422);
        res.body.should.have.property('error');
        done();
      });
  });

it('checks that receiver\'s email contain an @ symbol', (done) => {
    const order = {
      receiverEmail: 'receivermail.com',
    };
    chai.request(app)
      .post('/api/v1/parcel')
      .send(order)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
