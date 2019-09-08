const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;
chai.use(chaiHttp);
// eslint-disable-next-line no-unused-vars
const should = chai.should();

describe('GET /', () => {
  it('should return a hello world string', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('hello world');
        done();
      });
  });
});

describe('GET /status', () => {
  it('should return json status', (done) => {
    chai.request(server)
      .get('/status')
      .end((err, res) => {
        // eslint-disable-next-line no-console
        console.log('Response: ');
        // eslint-disable-next-line no-console
        console.log(res.body);

        res.should.have.status(200);
        // eslint-disable-next-line no-unused-expressions
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property(process.env.npm_package_name);
        res.body[process.env.npm_package_name][0].should.have.property('version');
        res.body[process.env.npm_package_name][0].should.have.property('description');
        res.body[process.env.npm_package_name][0].should.have.property('lastcommitsha');
        done();
      });
  });
});
