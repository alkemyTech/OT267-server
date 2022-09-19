const request = require('supertest');
const {
  describe, before, it, after,
} = require('mocha');
const { expect } = require('chai');
const { User } = require('../models/index');

const app = require('../app');

let token;
let userId;

const createUser = {
  firstName: 'Usuario2',
  lastName: 'Demo2',
  email: 'test2@test.com',
  password: 'User2000',
  passwordConfirmation: 'User2000',
  roleId: 2,
};

const updateUser = {
  firstName: 'Usuario2(MODIFIED)',
  lastName: 'Demo2(MODIFIED)',
};

describe('Testing users and auth endpoints', () => {
  before(async () => {
    const { body } = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'test1@test.com',
        password: 'User1000',
      })
      .expect('Content-Type', /json/);

    const { data } = body;
    token = data.token;
  });

  describe('GET /users', () => {
    it('GET [SUCCESS] should return an array with users', async () => {
      const { body } = await request(app)
        .get('/users')
        .set('authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const {
        message, data,
      } = body;

      expect(message).to.be.a('string');
      expect(message).to.equal('list of all users');
      expect(data).to.be.a('array');
    });
  });

  describe('POST /auth/register', () => {
    it('POST [SUCCESS] should return the created user', async () => {
      const { body } = await request(app)
        .post('/auth/register')
        .send(createUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const { data, message } = body;

      expect(message).to.be.a('string');
      expect(message).to.equal('user created');
      expect(data.user).to.be.a('object');
      expect(data.token);

      userId = data.user.id;
      token = data.token;
    });
  });

  describe('PATCH /users/:id', () => {
    it('PATCH [SUCCES] should update the especified user', async () => {
      const { body } = await request(app)
        .patch(`/users/${userId}`)
        .send(updateUser)
        .set('authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const { message } = body;

      expect(message).to.be.a('string');
      expect(message).to.equal('user updated');
    });
  });

  describe('DELETE /users/:id', () => {
    it('DELETE [SUCCES] should delete the especified user', async () => {
      const { body } = await request(app)
        .delete(`/users/${userId}`)
        .set('authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      const { message } = body;

      expect(message).to.be.a('string');
      expect(message).to.equal('user deleted');
    });
  });
});
