/* eslint-disable no-console */
/* eslint-disable no-undef */

const chai = require('chai');

const chaiHttp = require('chai-http');

const { expect } = require('chai');

const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('✍️ TESTIMONIES ENDPOINT', () => {
  let adminToken = '';
  let adminId = 0;
  let standardToken = '';
  let standardId = 0;
  const image = 'https://testimonyimage.jpg';
  const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const requestBody = {
    name: 'Test Testimony',
    image,
    content,
  };
  const requestBody2 = {
    name: 'Test Testimony 2',
    image,
    content,
  };
  const requestBody3 = {
    name: 'Test Testimony 3',
    image,
    content,
  };
  let testimonyId = 0;
  let testimony2Id = 0;
  let testimony3Id = 0;

  before('Admin register', (done) => {
    const adminRequest = {
      firstName: 'AdminUser',
      lastName: 'lastName',
      email: 'testimoniesAdminUser@mail.com',
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
      email: 'testimoniesStandardUser@mail.com',
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
  describe('✍️  GET TESTIMONIES  ', () => {
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
    });

    describe('👍 Successfull response object', () => {
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
  describe('✍️  POST TESTIMONIES', () => {
    describe('🔒 User Authentication', () => {
      it('should return a 401 error if token was not sent', (done) => {
        chai.request(server)
          .post('/testimonies')
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
          .post('/testimonies')
          .set('authorization', standardToken)
          .end((err, response) => {
            expect(response).have.status(403);
            expect(response.text).to.eql('forbidden: admin access is required');
            expect(response.ok).to.eql(false);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
    describe('👍 Successfull response', () => {
      it('should return a 201 response', (done) => {
        chai.request(server)
          .post('/testimonies/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const { ok, status, body } = response;
            console.log(`📝 TEST TESTIMONY ID ${body.data.id} CREATED`);
            testimonyId = body.data.id;
            expect(status).to.eql(201);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response object with message:"testimony created"', (done) => {
        chai.request(server)
          .post('/testimonies/')
          .set('authorization', adminToken)
          .send(requestBody2)
          .end((err, response) => {
            const { body } = response;
            console.log(`📝 TEST TESTIMONY 2 ID ${body.data.id} CREATED`);
            testimony2Id = body.data.id;
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(2);
            expect(body.message).to.eql('testimony created');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response data object', (done) => {
        chai.request(server)
          .post('/testimonies/')
          .set('authorization', adminToken)
          .send(requestBody3)
          .end((err, response) => {
            const { data } = response.body;
            console.log(`📝 TEST TESTIMONY 2 ID ${data.id} CREATED`);
            testimony3Id = data.id;
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
    describe('✋ Body Validations', () => {
      it('should return a 403 error if name or content are missed in body request', (done) => {
        chai.request(server)
          .post('/testimonies/')
          .set('authorization', adminToken)
          .send(requestBody.name)
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
        chai.request(server)
          .post('/testimonies/')
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

      it('should return a 400 error if testimony name already exist', (done) => {
        chai.request(server)
          .post('/testimonies/')
          .set('authorization', adminToken)
          .send(requestBody)
          .end((err, response) => {
            const {
              ok, status, created, text,
            } = response;
            expect(status).to.eql(400);
            expect(ok).to.eql(false);
            expect(created).to.eql(false);
            expect(text).to.eql('testimony already exists');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });

      it('should return a 403 error if content has lenght minor than 100 characteres', (done) => {
        chai.request(server)
          .post('/testimonies/')
          .set('authorization', adminToken)
          .send({
            name: 'Test Testimony 4',
            content: 'Testimony content',
          })
          .end((err, response) => {
            const { ok, status, created } = response;
            expect(status).to.eql(403);
            expect(ok).to.eql(false);
            expect(created).to.eql(false);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });

  describe('✍️  PUT TESTIMONY', () => {
    describe('🔒 User Authentication', () => {
      it('should return a 401 error if token was not sent', (done) => {
        chai.request(server)
          .put(`/testimonies/${testimonyId}`)
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
          .put(`/testimonies/${testimonyId}`)
          .set('authorization', standardToken)
          .end((err, response) => {
            expect(response).have.status(403);
            expect(response.text).to.eql('forbidden: admin access is required');
            expect(response.ok).to.eql(false);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
    describe('✋ Body Validations', () => {
      it('should return a 404 error if body was not sent', (done) => {
        chai.request(server)
          .put(`/testimonies/${testimonyId}`)
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
        chai.request(server)
          .put(`/testimonies/${id}`)
          .set('authorization', adminToken)
          .send({
            name: 'Test Testimony updated',
          })
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
          .put('/testimonies/')
          .set('authorization', adminToken)
          .send({
            name: 'Test Testimony updated',
          })
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
          .put(`/testimonies/${testimonyId}`)
          .set('authorization', adminToken)
          .send({
            name: 'Test Testimony updated',
          })
          .end((err, response) => {
            const { ok, status } = response;
            expect(status).to.eql(201);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
      it('should return a response object with message:"testimony updated"', (done) => {
        chai.request(server)
          .put(`/testimonies/${testimonyId}`)
          .set('authorization', adminToken)
          .send({
            name: 'Test Testimony updated',
          })
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

  describe('✍️  DELETE TESTIMONY', () => {
    describe('🔒 User Authentication', () => {
      it('should return a 401 error if token was not sent', (done) => {
        chai.request(server)
          .delete(`/testimonies/${testimonyId}`)
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
          .delete(`/testimonies/${testimonyId}`)
          .set('authorization', standardToken)
          .end((err, response) => {
            expect(response).have.status(403);
            expect(response.text).to.eql('forbidden: admin access is required');
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
        chai.request(server)
          .delete(`/testimonies/${testimonyId}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { ok, status } = response;
            console.log('🧹 TEST TESTIMONY DELETE STATUS =>', status);
            expect(status).to.eql(200);
            expect(ok).to.eql(true);
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });

      it('should return a response object with message:"testimony deleted"', (done) => {
        chai.request(server)
          .delete(`/testimonies/${testimony2Id}`)
          .set('authorization', adminToken)
          .end((err, response) => {
            const { body, status } = response;
            console.log('🧹 TEST TESTIMONY 2 DELETE STATUS =>', status);
            expect(body).to.be.an('object');
            expect(Object.keys(body)).to.have.lengthOf(1);
            expect(body.message).to.eql('testimony deleted');
            if (err) { console.log('errors? =>', err); }
            done();
          });
      });
    });
  });
  after('Test 3 cleaning', (done) => {
    chai.request(server)
      .delete(`/testimonies/${testimony3Id}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        const { status } = response;
        console.log('🧹 TEST TESTIMONY 3 DELETE STATUS =>', status);
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
