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

describe('Testing contacts endpoints', () => {

    describe('#Get contacts: GET /contacts', () => {
        // Test auth
        it('Shoul return and error for not auth user', (done) => {
            chai.request(app)
                .get('/contacts')
                .end((error, res) => {
                    expect(error).to.be.null;
                    expect(res).to.have.status(401);
                    done();
                });
        });

        // Test get contacts
        it('Should return the list of contacts', (done) => {
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
});
