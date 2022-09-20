/**
 * Test para los endpoints del CRUD de activities.
 * End points a testear
 * - GET /activities
 * - POST /activities
 * - PUT /activities/:id
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const app = require('../app');
require('dotenv').config();

// Para que chai use el chai-http
chai.use(chaiHttp);

// Token para los tests.
const adminToken = process.env.TEST_ADMIN_TOKEN;

// eslint-disable-next-line no-undef
describe('Testing activities endpoints', () => {

  describe('#Get activities, GET /activities', () => {
    // Test auth
    it('Should return and error for not auth user or admin', (done) => {
      chai.request(app)
        .get('/activities')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });

    // getAllActivities
    it('Should return the list of activities', (done) => {
      chai
        .request(app)
        .get('/activities')
        .set({ Authorization: adminToken })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').equal('list of all activities');
          expect(res.body.data).to.be.a('array');
          done();
        });
    });
  });

  describe('#Create activities', () => {

    it('Should return and error for not auth user or admin', (done) => {
      chai.request(app)
        .post('/activities')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });

    // createActivity
    it('Should create a new activity', (done) => {
      chai
        .request(app)
        .post('/activities')
        .set({ Authorization: adminToken })
        .field('name', 'Test activity')
        .field('content', 'Test of content')
        .attach('image', './test/img-test/activity.png', 'activity.png')
        .end((error, res) => {
          expect(error).to.have.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body)
            .to.have.property('message')
            .equal('activity created');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('content');
          expect(res.body.data).to.have.property('image');
          done();
        });
    });
  });

  describe('#Update activities POST /activities', () => {

    it('Should return and error for not auth user or admin', (done) => {
      chai.request(app)
        .put('/activities/1')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });

    it('Should update an activity using id with all body', (done) => {
      chai.request(app)
        .put('/activities/7')
        .set({ Authorization: adminToken })
        .field('name', 'Nuevo nombre de la actividad')
        .field('content', 'Contenido actualizado de la actividad')
        .attach('image', './test/img-test/activity.png', 'activity.png')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').equal('activity updated');
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('Should return and error for update with not exists id', (done) => {
      chai.request(app)
        .put('/activities/10000000')
        .set({ Authorization: adminToken })
        .field('name', 'Nuevo nombre de la actividad')
        .field('content', 'Contenido actualizado de la actividad')
        .attach('image', './test/img-test/activity.png', 'activity.png')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(404);
          expect(res.text).to.be.equal('activity not found');
          done();
        });
    });

    it('Should return and error for update with not numeric id', (done) => {
      chai.request(app)
        .put('/activities/1s')
        .set({ Authorization: adminToken })
        .field('name', 'Nuevo nombre de la actividad')
        .field('content', 'Contenido actualizado de la actividad')
        .attach('image', './test/img-test/activity.png', 'activity.png')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(500);
          done();
        });
    });

  });
});
