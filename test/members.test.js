/* eslint-disable no-undef */
/* module.exports = {
  createMember,
  getMembers,
  deleteMember,
  updateMember,
}; */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const server = require('../app');
const config = require('../config/config');

const {
  createMember,
  getMembers,
  deleteMember,
  updateMember,
} = require('../controllers/members');

// asserstion
chai.should();

chai.use(chaiHttp);

const { url } = config.development;
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxLCJuYW1lIjoiVXN1YXJpbzIxIiwicm9sZSI6MSwiaWF0IjoxNjYzNDQ2NzY0LCJleHAiOjE2NjM3MDU5NjR9.uNpntp2twz0XMekt6LRdp7AuesXdDYOJyYvTEXWo1EY';
const standardToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJuYW1lIjoiVXN1YXJpbzIyIiwicm9sZSI6MiwiaWF0IjoxNjYzNDU1NzcwLCJleHAiOjE2NjM3MTQ5NzB9.WgMabI4PWmnCaVWGs3ZG1fiLsUHKOoBu-BNXK8CqVok';

describe('👦 👩  GET MEMBERS', () => {
  describe('👮‍♀️ User Authentication', () => {
    it('should return a 401 error if token was not sent', (done) => {
      chai.request(server) // o url
        .get('/members')
        .end((err, response) => {
          expect(response).have.status(401);
          expect(response.text).to.eql('unauthorized: id is required');
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });
  });

  describe('👮‍♀️ Admin User Authentication', () => {
    it('should return a 200 response if token is sent', (done) => {
      chai.request(server) // o url
        .get('/members')
        .set('authorization', adminToken)
        .end((err, response) => {
          console.log('NO ADMIN', response);
          expect(response).have.status(200);
          expect(response.text).to.eql('forbidden: admin access is required');

          if (err) { console.log('errors? =>', err); }
          done();
        });
    });
  });

  describe('✉️ Response object', () => {
    it('should return a object', (done) => {
      chai.request(server)
        .get('/members')
        .set('authorization', adminToken)
        .end((err, response) => {
          const { body } = response;
          expect(response).have.status(200);
          expect(body).to.be.an('object');
          expect(Object.keys(body)).to.have.lengthOf(2);
          expect(body.message).to.eql('list of all members');
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });
  });
});

/*   describe('👮‍♀️ Authentication', () => {
    it('should return a 403 error if token was not sent', (done) => {
      chai.request(server) // o url
        .get('/members')
        .set('authorization', standardToken)
        .end((err, response) => {
          response.should.have.status(200);
          /*  response.body.should.be.a('object');
          response.body.length.should.be.eq(2);
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });

    */

describe('👦 👩  POST MEMBERS', () => {
  describe('👮‍♀️ User Authentication', () => {
    it('should return a 401 error if token was not sent', (done) => {
      chai.request(server) // o url
        .post('/members')
        .end((err, response) => {
          expect(response).have.status(401);
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });
  });
  describe('👮‍♀️ User Authentication', () => {
    it('should return a 401 error if token was not sent', (done) => {
      chai.request(server) // o url
        .post('/members')
        .end((err, response) => {
          console.log(response);
          expect(response).have.status(401);
          expect(response.text).to.eql('unauthorized: id is required');
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });
  });
});
