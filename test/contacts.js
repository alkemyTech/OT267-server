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

    describe('# GET /contacts', () => {
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

    });
});
