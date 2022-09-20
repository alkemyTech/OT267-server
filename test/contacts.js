/**
 * Testing para los endponits de contactos
 * GET /contacts
 * POST /contacts
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
const standarUserToken = process.env.TEST_STANDAR_USER_TOKEN

describe('Testing contacts endpoints', () => {

    describe('#Get contacts: GET /contacts', () => {
        // Test auth sin token
        it('Shoul return and error for not auth user, without using token', (done) => {
            chai.request(app)
                .get('/contacts')
                .end((error, res) => {
                    expect(error).to.be.null;
                    expect(res).to.have.status(401);
                    done();
                });
        });

        // Test auth con token de usuario estandar
        it('Shoul return and error for not auth user, using standar user token', (done) => {
            chai.request(app)
                .get('/contacts')
                .set({ Authorization: standarUserToken })
                .end((error, res) => {
                    expect(error).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.text).to.be.equal('forbidden: admin access is required');
                    done();
                });
        });

        // Test get contacts
        it('Should return the list of contacts, using admin token', (done) => {
            chai.request(app)
                .get('/contacts')
                .set({ Authorization: adminToken})
                .end((error, res) => {
                    expect(error).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('list of all contacts');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.be.a('array');
                    done();
                });
        });
    });

    describe('#Create contact, POST /contacts', () => {
        
        it('Should created new contact', (done) => {
            chai.request(app)
                .post('/contacts')
                .send({
                    name: 'Test contact',
                    phone: '3215452154',
                    email: 'test@gmail.com',
                    message: 'Test message',
                })
                .end((error, res) => {
                    expect(error).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message').equal('contact registered succesfully');
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.property('name');
                    expect(res.body.data).to.have.property('email');
                    done();
                });
        });


        it('Shoul an error for not include name property', (done) => {
            chai.request(app)
                .post('/contacts')
                .send({
                    name: '',
                    phone: '3215452154',
                    email: 'test@gmail.com',
                    message: 'Test message',
                })
                .end((error, res) => {
                    expect(error).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property('errors');
                    expect(res.body).to.be.a('object');
                    expect(res.body.errors).to.be.a('array');
                    done();
                });
        });

        it('Shoul an error for not include email property', (done) => {
            chai.request(app)
                .post('/contacts')
                .send({
                    name: 'Test contact',
                    phone: '3215452154',
                    email:'',
                    message: 'Test message',
                })
                .end((error, res) => {
                    expect(error).to.be.null;
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property('errors');
                    expect(res.body).to.be.a('object');
                    expect(res.body.errors).to.be.a('array');
                    done();
                });
        });

    });

});
