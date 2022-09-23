/* eslint-disable no-console */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');

const { expect } = require('chai');

const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('👦 👩 MEMBERS ENDPOINT', () => {
  let adminToken = '';
  let adminId = 0;
  let standardToken = '';
  let standardId = 0;
  const description = 'Test member description';
  const requestBody = {
    name: 'Test member',
    description,
  };
  const requestBody2 = {
    name: 'Test member 2',
    description,
  };
  const requestBody3 = {
    name: 'Test member 3',
    description,
  };
  let memberId = 0;

  let member2Id = 0;

  let member3Id = 0;

  before('Admin register', (done) => {
    const adminRequest = {
      firstName: 'AdminUser',
      lastName: 'lastName',
      email: 'AdminUser@mail.com',
      password: 'adminUser1',
      passwordConfirmation: 'adminUser1',
      image: 'http://adminUserImage.jpg',
      roleId: 1,
    };
    chai.request(server)
      .post('/auth/register/')
      .send(adminRequest)
      .end((err, response) => {
        const { text } = response;
        const { token } = response.body.data;
        console.log(`🔑 ADMIN ID ${text.slice(47, 49)} CREATED`);
        adminToken = token;
        adminId = text.slice(47, 49);
        if (err) { console.log('errors? =>', err); }
        done();
      });
  });
  before('Standard register', (done) => {
    const standardRequest = {
      firstName: 'StandardUser',
      lastName: 'lastName',
      email: 'standardUser@mail.com',
      password: 'standardUser1',
      passwordConfirmation: 'standardUser1',
      image: 'http://standardUserImage.jpg',
      roleId: 2,
    };
    chai.request(server)
      .post('/auth/register/')
      .send(standardRequest)
      .end((err, response) => {
        const { text } = response;
        const { token } = response.body.data;
        console.log(`🔑 STANDARD ID ${text.slice(47, 49)} CREATED`);
        standardToken = token;
        standardId = text.slice(47, 49);
        if (err) { console.log('errors? =>', err); }
        done();
      });
  });

  describe('👦 👩 GET MEMBERS  ', () => {
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
    describe('🔒 User Authentication', () => {
      it('should return a 401 error if token was not sent', (done) => {
        chai.request(server)
          .post('/members')
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
    describe('👍 Successfull response', () => {
      it('should return a 201 response', (done) => {
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { ok, status, body } = response;
            console.log(`👱‍♀️ TEST MEMBER ID ${body.data.id} CREATED`);
            memberId = body.data.id;
            expect(status).to.eql(201);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response object with message:"member created"', (done) => {
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody2)
          .end((err, response) => {
            const { body } = response;
            console.log(`🧔 TEST MEMBER 2 ID ${body.data.id} CREATED`);
            member2Id = body.data.id;
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(2);
            expect(body.message).to.eql('member created');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response data object', (done) => {
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody3)
          .end((err, response) => {
            const { data } = response.body;
            console.log(`👵 TEST MEMBER 2 ID ${data.id} CREATED`);
            member3Id = data.id;
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
    describe('✋ Body Validations', () => {
      it('should return a 403 error if name or description are missed in body request', (done) => {
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(description)
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
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody.name)
          .end((err, response) => {
            const { created, forbidden } = response;
            expect(forbidden).to.eql(true);
            expect(created).to.eql(false);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('member is not created if member name already exists', (done) => {
        chai.request(server)
          .post('/members/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const {
              status, badRequest, ok, text,
            } = response;
            expect(status).to.eql(400);
            expect(ok).to.eql(false);
            expect(badRequest).to.eql(true);
            expect(text).to.eql('member already exists');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });

  describe('👦 👩  PUT MEMBERS', () => {
    describe('🔒 User Authentication', () => {
      it('should return a 401 error if token was not sent', (done) => {
        chai.request(server)
          .put(`/members/${memberId}`)
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

    describe('✋ Body Validations', () => {
      it('should return a 404 error if body was not sent', (done) => {
        chai.request(server)
          .put(`/members/${memberId}`)
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
        chai.request(server)
          .put(`/members/${id}`)
          .set('authorization', adminToken)
          .send({ name: 'Test member updated' })
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
          .put(`/members/${id}`)
          .set('authorization', adminToken)
          .send({ name: 'Test member updated' })
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
          .put('/members/')
          .set('authorization', adminToken)
          .send({ name: 'Test member updated' })
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
        chai.request(server)
          .put(`/members/${memberId}`)
          .set('authorization', adminToken)
          .send({
            name: 'Test member updated',
          })
          .end((err, response) => {
            const { ok, status } = response;
            expect(status).to.eql(201);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response object with message:"member updated"', (done) => {
        chai.request(server)
          .put(`/members/${memberId}`)
          .set('authorization', adminToken)
          .send({
            name: 'Test member updated again',
          })
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
    describe('🔒 User Authentication', () => {
      it('should return a 401 error if token was not sent', (done) => {
        chai.request(server)
          .delete(`/members/${memberId}`)
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

    describe('🔒 User Authorization', () => {
      it('should return a 403 response if id param is not current user id or admin id', (done) => {
        chai.request(server)
          .delete(`/members/${memberId}`)
          .set('authorization', standardToken)
          .end((err, response) => {
            expect(response).have.status(403);
            expect(response.text).to.eql('forbidden: unauthorized user');
            expect(response.ok).to.eql(false);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
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
        chai.request(server)
          .delete(`/members/${memberId}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { ok, status } = response;
            console.log('🧹 TEST MEMBER DELETE STATUS =>', status);
            expect(status).to.eql(200);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });

      it('should return a response object with message:"member deleted"', (done) => {
        chai.request(server)
          .delete(`/members/${member2Id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { body, status } = response;
            console.log('🧹 TEST MEMBER 2 DELETE STATUS =>', status);
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(1);
            expect(body.message).to.eql('member deleted');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });
  after('Member 3 cleaning', (done) => {
    chai.request(server)
      .delete(`/members/${member3Id}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        const { status } = response;
        console.log('🧹 TEST MEMBER 3 DELETE STATUS =>', status);
        if (err) { console.log('errors? =>', err); }
        done();
      });
  });
  after('Standard cleaning', (done) => {
    chai.request(server)
      .delete(`/users/${standardId}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        const { status } = response;
        console.log('🧹 STANDARD USER DELETE STATUS =>', status);
        if (err) { console.log('errors? =>', err); }
        done();
      });
  });
  after('Admin cleaning', (done) => {
    chai.request(server)
      .delete(`/users/${adminId}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        const { status } = response;
        console.log('🧹 ADMIN USER DELETE STATUS =>', status);
        if (err) { console.log('errors? =>', err); }
        done();
      });
  });
});
