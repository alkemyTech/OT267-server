/* eslint-disable no-console */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');

const { expect } = require('chai');

const server = require('../app');

chai.should();
chai.use(chaiHttp);
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxLCJuYW1lIjoiVXN1YXJpbzIxIiwicm9sZSI6MSwiaWF0IjoxNjYzNDQ2NzY0LCJleHAiOjE2NjM3MDU5NjR9.uNpntp2twz0XMekt6LRdp7AuesXdDYOJyYvTEXWo1EY';
const standardToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJuYW1lIjoiVXN1YXJpbzIyIiwicm9sZSI6MiwiaWF0IjoxNjYzNDU1NzcwLCJleHAiOjE2NjM3MTQ5NzB9.WgMabI4PWmnCaVWGs3ZG1fiLsUHKOoBu-BNXK8CqVok';

describe('👦 👩 MEMBERS ENDPOINT', () => {
  describe('🔒 User Authentication', () => {
    it('should return a 401 error if token was not sent', (done) => {
      chai.request(server)
        .get('/members')
        .end((err, response) => {
          const { text, ok } = response;
          expect(response).have.status(401);
          expect(text).to.eql('unauthorized: id is required');
          expect(ok).to.eql(false);
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });
  });

  describe('🔒 Admin User Authorization', () => {
    it('should return a 403 response if standard user token is sent', (done) => {
      chai.request(server)
        .get('/members')
        .set('authorization', standardToken)
        .end((err, response) => {
          expect(response).have.status(403);
          expect(response.text).to.eql('forbidden: admin access is required');
          expect(response.ok).to.eql(false);
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });
    it('should return a 200 response if admin token is sent', (done) => {
      chai.request(server)
        .get('/members')
        .set('authorization', adminToken)
        .end((err, response) => {
          expect(response).have.status(200);
          expect(response.ok).to.eql(true);
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });
  });

  describe('👦 👩 GET MEMBERS  ', () => {
    describe('👍 Successfull response object', () => {
      it('should return a response object with message:"list of all members"', (done) => {
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
  describe('👦 👩  POST MEMBERS', () => {
    describe('✋ Body Validations', () => {
      it('should return a 403 error if name or description are missed in body request', (done) => {
        const requestBody = {
          description: 'Member description',
        };
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { ok, status, created } = response;
            expect(status).to.eql(403);
            expect(ok).to.eql(false);
            expect(created).to.eql(false);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('member is not created if name or description are missed in body request', (done) => {
        const requestBody = {
          description: 'Member description',
        };
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { created, forbidden } = response;
            expect(forbidden).to.eql(true);
            expect(created).to.eql(false);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
    describe('👍 Successfull response', () => {
      it('should return a 201 response', (done) => {
        const requestBody = {
          name: 'New member',
          description: 'Member description',
        };
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { ok, status } = response;
            expect(status).to.eql(201);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response object with message:"member created"', (done) => {
        const requestBody = {
          name: 'New member',
          description: 'Member description',
        };
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { body } = response;
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(2);
            expect(body.message).to.eql('member created');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response data object', (done) => {
        const requestBody = {
          name: 'New member',
          description: 'Member description',
        };
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { data } = response.body;
            expect(data).to.be.an('object');
            expect(Object.keys(data)).to.have.lengthOf(9);
            expect(data).to.have.property('id').that.is.a('number');
            expect(data).to.have.property('name').that.is.a('string');
            expect(data).to.have.property('description').that.is.a('string');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });

  describe('👦 👩  PUT MEMBERS', () => {
    describe('✋ Body Validations', () => {
      it('should return a 404 error if body was not sent', (done) => {
        const id = 1;
        chai.request(server) // o url
          .put(`/members/${id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            expect(response).have.status(404);
            expect(response.text).to.eql('data is required');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
    describe('✋ Id Validations', () => {
      it('should return a 500 error if id is not a number', (done) => {
        const id = 'sj';
        const requestBody = {
          name: 'Member updated',
        };
        chai.request(server) // o url
          .put(`/members/${id}`)
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { ok, text } = response;
            expect(response).have.status(500);
            expect(ok).to.eql(false);
            expect(text).to.eql(`Truncated incorrect INTEGER value: '${id}'`);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });

    describe('✋ Id Validations', () => {
      it('should return a 404 error if id is not found', (done) => {
        const id = 1000;
        const requestBody = {
          name: 'Member updated',
        };
        chai.request(server) // o url
          .put(`/members/${id}`)
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { ok, text } = response;
            expect(response).have.status(404);
            expect(ok).to.eql(false);
            expect(text).to.eql('member not found');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });

    describe('✋ Id Validations', () => {
      it('should return a 404 error if id is not sent', (done) => {
        const requestBody = {
          name: 'Member updated',
        };
        chai.request(server) // o url
          .put('/members/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { ok, text, status } = response;
            expect(status).to.eql(404);
            expect(ok).to.eql(false);
            expect(text).to.eql('Cannot complete the request');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });

    describe('👍 Successfull response', () => {
      it('should return a 201 response', (done) => {
        const id = '2';
        const body = {
          name: 'Member 2 updated',
        };
        chai.request(server)
          .put(`/members/${id}`)
          .set('authorization', adminToken)
          .send(body)
          .end((err, response) => {
            const { ok, status } = response;
            expect(status).to.eql(201);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response object with message:"member updated"', (done) => {
        const id = '2';
        const requestBody = {
          name: 'Member 2 updated',
        };
        chai.request(server)
          .put(`/members/${id}`)
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { body } = response;
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(1);
            expect(body.message).to.eql('member updated');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });

  describe('👦 👩  DELETE MEMBERS', () => {
    describe('✋ Id Validations', () => {
      it('should return a 500 error if id is not a number', (done) => {
        const id = 'js';
        chai.request(server)
          .delete(`/members/${id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { ok, text } = response;
            expect(response).have.status(500);
            expect(ok).to.eql(false);
            expect(text).to.eql(`Truncated incorrect INTEGER value: '${id}'`);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });

      it('should return a 404 error if id is not found', (done) => {
        const id = 1000;
        chai.request(server)
          .delete(`/members/${id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { ok, text } = response;
            expect(response).have.status(404);
            expect(ok).to.eql(false);
            expect(text).to.eql('member not found');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });

      it('should return a 404 error if id is not sent', (done) => {
        chai.request(server)
          .delete('/members/')
          .set('authorization', adminToken)
          .end((err, response) => {
            const { ok, text, status } = response;
            expect(status).to.eql(404);
            expect(ok).to.eql(false);
            expect(text).to.eql('Cannot complete the request');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });

    describe('👍 Successfull response', () => {
      it('should return a 200 response', (done) => {
        const id = '17';
        chai.request(server)
          .delete(`/members/${id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { ok, status } = response;
            expect(status).to.eql(200);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });

      it('should return a response object with message:"member deleted"', (done) => {
        const id = '18';
        chai.request(server)
          .delete(`/members/${id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { body } = response;
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(1);
            expect(body.message).to.eql('member deleted');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });
});
