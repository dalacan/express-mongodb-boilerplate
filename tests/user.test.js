/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const { expect } = require('chai');
const { User } = require('../models/user.model');
const app = require('../server');

describe('users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /', () => {
    it('should return all users', async () => {
      const users = [
        { username: 'test', name: 'John Smith', email: 'john.smith@gmail.com' },
        { username: 'test1', name: 'Jane Smith', email: 'jane.smith@gmail.com' },
      ];
      await User.insertMany(users);
      const res = await request(app).get('/user');
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
    });
  });

  describe('GET/:id', () => {
    it('should return a user if valid id is passed', async () => {
      const user = new User({
        username: 'test',
        name: 'John Smith',
        email: 'john.smith@gmail.com',
      });
      await user.save();
      const res = await request(app).get(`/user/${user._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name', user.name);
    });

    it('should return 400 error when invalid object id is passed', async () => {
      const res = await request(app).get('/user/1');
      expect(res.status).to.equal(400);
    });

    it('should return 404 error when valid object id is passed but does not exist', async () => {
      const res = await request(app).get('/user/111111111111');
      expect(res.status).to.equal(404);
    });
  });

  describe('POST /', () => {
    it('should return user when the all request body is valid', async () => {
      const res = await request(app)
        .post('/user')
        .send({
          username: 'test',
          name: 'John Smith',
          email: 'john.smith@gmail.com',
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body).to.have.property('username', 'test');
    });
  });

  describe('PUT /:id', () => {
    it('should update the existing order and return 200', async () => {
      const user = new User({
        username: 'test',
        name: 'John Smith',
        email: 'john.smith@gmail.com',
      });
      await user.save();

      const res = await request(app)
        .put(`/user/${user._id}`)
        .send({
          username: 'newTest',
          name: 'James Smith',
          email: 'james.smith@gmail.com',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('username', 'newTest');
    });
  });

  describe('DELETE /:id', () => {
    it('should delete requested id and return response 200', async () => {
      const user = new User({
        username: 'test',
        name: 'James Smith',
        email: 'james.smith@gmail.com',
      });
      await user.save();

      const res = await request(app).delete(`/user/${user._id}`);
      expect(res.status).to.be.equal(200);
    });

    it('should return 404 when deleted user is requested', async () => {
      const user = new User({
        username: 'test',
        name: 'James Smith',
        email: 'james.smith@gmail.com',
      });
      await user.save();

      let res = await request(app).delete(`/user/${user._id}`);
      expect(res.status).to.be.equal(200);

      res = await request(app).get(`/user/${user._id}`);
      expect(res.status).to.be.equal(404);
    });
  });
});
