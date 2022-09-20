const request = require('supertest');
const {
  describe, before, it,
} = require('mocha');
const { expect } = require('chai');
// const { User } = require('../models/index');

const app = require('../app');

let token;
let userId;
let tokenAdmin;

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

    it('POST [FAIL] should return an already exists', async () => {
      const { body } = await request(app)
        .post('/auth/register')
        .send(createUser)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403);
      const message = body.errors[0].msg;
      expect(message).to.be.a('string');
      expect(message).to.equal('Ya existe un usuario con este correo');
    });
  });

  describe('POST /auth/login', () => {
    it('POST [SUCCESS] on the login', async () => {
      const { body } = await request(app)
        .post('/auth/login')
        .send({
          email: 'test1@test.com',
          password: 'User1000',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const { data, message } = body;

      expect(message).to.be.a('string');
      expect(message).to.equal('successfull login');
      expect(data.user).to.be.a('object');
      expect(data.token);

      tokenAdmin = data.token;
    });

    it('POST [FAIL (NO FIELDS)] on the login', async () => {
      const { body } = await request(app)
        .post('/auth/login')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(403);

      const message = body.errors[0].msg;
      expect(message).to.be.a('string');
      expect(message).to.equal('Ingrese un correo');
    });
  });

  describe('GET /users', () => {
    it('GET [SUCCESS] should return an array with users', async () => {
      const { body } = await request(app)
        .get('/users')
        .set('authorization', tokenAdmin)
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

    // Trato de traer todos los usuarios con el token comun y va a fallar
    it('GET [FAILED] should return an error because the user role is not admin', async () => {
      const { text: message } = await request(app)
        .get('/users')
        .set('authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /text\/html/)
        .expect(403);

      expect(message).to.be.a('string');
      expect(message).to.equal('forbidden: admin access is required');
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

    it('PATCH [FAIL (paramId is not the same on the token)] should return an error', async () => {
      const { text: message } = await request(app)
        .patch('/users/14')
        .send(updateUser)
        .set('authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /text\/html/)
        .expect(403);

      expect(message).to.be.a('string');
      expect(message).to.equal('unauthorized user');
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
