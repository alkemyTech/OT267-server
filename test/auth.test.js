/* eslint-disable no-undef */
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('Auth endpoint', () => {
  describe('POST auth/register', () => {
    it('Should register a new user', () => {
      chai.request(app)
        .post('/auth/register')
        .send({
          firstName: 'Alfredo',
          lastName: 'Blanco',
          email: 'alfre.@mail.com',
          password: '12345678A',
          passwordConfirmation: '12345678A',
          roleId: '2',
        })
        .end((err, res) => {
          expect(err).to.be(null);
          expect(res).to.have.status(200);
        });
    });
  });
});
