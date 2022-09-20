/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

const user = {
  firstName: 'Usuario1',
  lastName: 'Demo1',
  email: 'test1@icloud.com',
  password: 'Uuser1000',
  passwordConfirmation: 'Uuser1000',
  roleId: 2,
};

describe('AUTH ENDPOINT', () => {
  let userToken;
  describe('Register a user', () => {
    it('should return an error if password does not match', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send({
          ...user,
          password: 'user1000',
        })
        .end((err, response) => {
          const { body } = response;
          expect(body.errors).to.be.a('array');
          expect(body.data).to.be.undefined;
          expect(response).to.have.status(403);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
    it('should register an user and return its token', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send(user)
        .end((err, response) => {
          const { body } = response;
          expect(body.errors).to.not.exist;
          expect(body.message).to.eql('user created');
          expect(body.data).to.be.a('object');
          expect(body.data.token).to.be.a('string');
          expect(response).to.have.status(201);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
    it('should not create the user because the email already exists', (done) => {
      chai.request(server)
        .post('/auth/register')
        .send(user)
        .end((err, response) => {
          const { body } = response;
          expect(body.errors[0].msg).to.eql('Ya existe un usuario con este correo');
          expect(body.data).to.be.undefined;
          expect(response).to.have.status(403);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
  });
  describe('Login as user', () => {
    it('should return an error if email is not send', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          ...user,
          email: null,
        })
        .end((err, response) => {
          const { body } = response;
          expect(body.errors).to.exist;
          expect(body.data).to.not.exist;
          expect(response).to.have.status(403);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
    it('should return an error if password not match', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send({
          ...user,
          password: 'user1000',
        })
        .end((err, response) => {
          expect(response.text).to.eql('invalid email or password');
          expect(response.body.data).to.not.exist;
          expect(response).to.have.status(401);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
    it('should login and return the use and its token', (done) => {
      chai.request(server)
        .post('/auth/login')
        .send(user)
        .end((err, response) => {
          const { body } = response;
          expect(body.errors).to.not.exist;
          expect(body.message).to.eql('successfull login');
          expect(body.data.user).to.be.a('object');
          expect(body.data.token).to.be.a('string');
          expect(response).to.have.status(200);
          if (err) console.log('errors? =>', err);
          userToken = body.data.token;
          done();
        });
    });
  });
  describe('User info', () => {
    it('should return an error if token is not provided or is wrong', (done) => {
      chai.request(server)
        .get('/auth/me')
        .set('Authorization', `${userToken}A`)
        .end((err, response) => {
          expect(response.text).to.eql('unauthorized: id is required');
          expect(response.ok).to.be.false;
          expect(response.body.data).to.not.exist;
          expect(response).to.have.status(401);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
    it('should return the user info if exists', (done) => {
      chai.request(server)
        .get('/auth/me')
        .set('Authorization', userToken)
        .end((err, response) => {
          const { body } = response;
          expect(body.data.email).to.eql(user.email);
          expect(body.message).to.eql('user data');
          expect(response).to.have.status(200);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
  });
});
