/* eslint-disable no-console */
/* eslint-disable no-undef */

const chai = require('chai');

const chaiHttp = require('chai-http');

const { expect } = require('chai');

const server = require('../app');

chai.should();
chai.use(chaiHttp);
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxLCJuYW1lIjoiVXN1YXJpbzIxIiwicm9sZSI6MSwiaWF0IjoxNjYzNjU1NzM4LCJleHAiOjE2NjM5MTQ5Mzh9.zSnRwTwJkIdONwZ80mlYWoBmgMO5OC1Wl5GZn6NKRhY';
const standardToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIyLCJuYW1lIjoiVXN1YXJpbzIyIiwicm9sZSI6MiwiaWF0IjoxNjYzNjU1Nzg4LCJleHAiOjE2NjM5MTQ5ODh9.RA-PeUK_2-10Q2pfPFKZ9s-z-I-h_DJ1w3Qdgg2Tg3U';

describe('👦 👩 TESTIMONIES ENDPOINT', () => {
  describe('🔒 User Authentication', () => {
    it('should return a 401 error if token was not sent', (done) => {
      chai.request(server)
        .get('/testimonies')
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
        .get('/testimonies')
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
        .get('/testimonies')
        .set('authorization', adminToken)
        .end((err, response) => {
          expect(response).have.status(200);
          expect(response.ok).to.eql(true);
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });
  });

  describe('👦 👩 GET TESTIMONIES  ', () => {
    describe('👍 Successfull response object', () => {
      it('should return a response object with message:"list of all testimonies"', (done) => {
        chai.request(server)
          .get('/testimonies')
          .set('authorization', adminToken)
          .end((err, response) => {
            const { body } = response;
            expect(response).have.status(200);
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(2);
            expect(body.message).to.eql('list of all testimonies');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });
  describe('👦 👩  POST TESTIMONIES', () => {
    describe('✋ Body Validations', () => {
      it('should return a 403 error if name or content are missed in body request', (done) => {
        const requestBody = {
          content: 'Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content',
        };
        chai.request(server)
          .post('/testimonies/')
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
      it('testimony is not created if name or content are missed in body request', (done) => {
        const requestBody = {
          content: 'Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content',
        };
        chai.request(server)
          .post('/testimonies/')
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
    it('should return a 400 error if name or content already exist', (done) => {
      const requestBody = {
        name: 'New testimony 3',
        content: 'Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content',
      };
      chai.request(server)
        .post('/testimonies/')
        .set('authorization', adminToken)
        .send(requestBody)
        .end((err, response) => {
          const { ok, status, created } = response;
          expect(status).to.eql(400);
          expect(ok).to.eql(false);
          expect(created).to.eql(false);
          if (err) { console.log('errors? =>', err); }
          done();
        });
    });

    it('should return a 403 error if content has lenght minor than 100 characteres', (done) => {
      const requestBody = {
        name: 'New testimony 8',
        content: 'Testimony content Testimony content Testimony content',
      };
      chai.request(server)
        .post('/testimonies/')
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

    describe('👍 Successfull response', () => {
      it('should return a 201 response', (done) => {
        const requestBody = {
          name: 'New testimony 6',
          content: 'Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content',
        };
        chai.request(server)
          .post('/testimonies/')
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
      it('should return a response object with message:"testimony created"', (done) => {
        const requestBody = {
          name: 'New testimony 7',
          content: 'Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content',
        };
        chai.request(server)
          .post('/testimonies/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { body } = response;
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(2);
            expect(body.message).to.eql('testimony created');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response data object', (done) => {
        const requestBody = {
          name: 'New testimony 9',
          content: 'Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony content Testimony',
        };
        chai.request(server)
          .post('/testimonies/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { data } = response.body;
            expect(data).to.be.an('object');
            expect(Object.keys(data)).to.have.lengthOf(6);
            expect(data).to.have.property('id').that.is.a('number');
            expect(data).to.have.property('name').that.is.a('string');
            expect(data).to.have.property('content').that.is.a('string');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });

  describe('👦 👩  PUT TESTIMONY', () => {
    describe('✋ Body Validations', () => {
      it('should return a 404 error if body was not sent', (done) => {
        const id = 1;
        chai.request(server)
          .put(`/testimonies/${id}`)
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
          name: 'Testimony updated',
        };
        chai.request(server)
          .put(`/testimonies/${id}`)
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
          name: 'Testimony updated',
        };
        chai.request(server)
          .put(`/testimonies/${id}`)
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { ok, text } = response;
            expect(response).have.status(404);
            expect(ok).to.eql(false);
            expect(text).to.eql('testimony not found');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });

    describe('✋ Id Validations', () => {
      it('should return a 404 error if id is not sent', (done) => {
        const requestBody = {
          name: 'Testimony updated',
        };
        chai.request(server)
          .put('/testimonies/')
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
          name: 'Testimony 2 updated',
        };
        chai.request(server)
          .put(`/testimonies/${id}`)
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
      it('should return a response object with message:"testimony updated"', (done) => {
        const id = '2';
        const requestBody = {
          name: 'Member 2 updated',
        };
        chai.request(server)
          .put(`/testimonies/${id}`)
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { body } = response;
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(1);
            expect(body.message).to.eql('testimony updated');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });

  describe('👦 👩  DELETE TESTIMONY', () => {
    describe('✋ Id Validations', () => {
      it('should return a 500 error if id is not a number', (done) => {
        const id = 'js';
        chai.request(server)
          .delete(`/testimonies/${id}`)
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
          .delete(`/testimonies/${id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { ok, text } = response;
            expect(response).have.status(404);
            expect(ok).to.eql(false);
            expect(text).to.eql('testimony not found');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });

      it('should return a 404 error if id is not sent', (done) => {
        chai.request(server)
          .delete('/testimonies/')
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
        const id = '15';
        chai.request(server)
          .delete(`/testimonies/${id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { ok, status } = response;
            expect(status).to.eql(200);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });

      it('should return a response object with message:"testimony deleted"', (done) => {
        const id = '14';
        chai.request(server)
          .delete(`/testimonies/${id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { body } = response;
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(1);
            expect(body.message).to.eql('testimony deleted');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });
});
