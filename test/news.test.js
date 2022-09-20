const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { adminToken } = require('../config/config').test;

const app = require('../app');

let newsId;

chai.use(chaiHttp);
describe('NEWS TEST', () => {
  describe('GET /news', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .get('/news')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected return list of all news', (done) => {
      chai.request(app)
        .get('/news')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('list of all news');
          done();
        });
    });
  });

  describe('GET /news/:id', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .get('/news/1')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected news detail', (done) => {
      chai.request(app)
        .get('/news/1')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('news detail');
          done();
        });
    });

    it('expected not found error', (done) => {
      chai.request(app)
        .get('/news/999')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.be.equal('news not found');
          done();
        });
    });

    it('expected not found error', (done) => {
      chai.request(app)
        .get('/news/abc')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.be.equal('news not found');
          done();
        });
    });
  });

  describe('GET /news/:id/comments', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .get('/news')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected news detail with comments', (done) => {
      chai.request(app)
        .get('/news/1/comments')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('list of all comments from news 1');
          done();
        });
    });

    it('expected not found error', (done) => {
      chai.request(app)
        .get('/news/999/comments')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.be.equal('news not found');
          done();
        });
    });

    it('expected not found error', (done) => {
      chai.request(app)
        .get('/news/abc/comments')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.be.equal('news not found');
          done();
        });
    });
  });

  describe('POST /news', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .post('/news')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected success with status 201 (news created)', (done) => {
      chai.request(app)
        .post('/news')
        .set({ Authorization: adminToken })
        .field('name', 'Name 5')
        .field('content', 'content 5')
        .field('categoryId', 2)
        .attach('image', './test/imgTest/news.PNG', 'news.PNG')
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('news created');
          newsId = (res.body.data.id || 1);
          done();
        });
    });

    it('expected error with status 403 (no image file)', (done) => {
      chai.request(app)
        .post('/news')
        .set({ Authorization: adminToken })
        .field('name', 'Name 5')
        .field('content', 'content 5')
        .field('categoryId', 2)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0]).to.have.property('msg').to.equals('Ingrese un archivo de imagen');
          done();
        });
    });

    it('expected error with status 403 (name value is empty)', (done) => {
      chai.request(app)
        .post('/news')
        .set({ Authorization: adminToken })
        .field('name', '')
        .field('content', 'content 5')
        .field('categoryId', 2)
        .attach('image', './test/imgTest/news.PNG', 'news.PNG')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0]).to.have.property('msg').to.equals('Ingrese el nombre de la novedad');
          done();
        });
    });
  });

  describe('PUT /news/id', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .put(`/news/${newsId}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected success with status 200 (news updated)', (done) => {
      chai.request(app)
        .put(`/news/${newsId}`)
        .set({ Authorization: adminToken })
        .field('name', 'New name 5 [UPDATED]')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('news updated');
          done();
        });
    });

    it('expected error with status 403 (has no body)', (done) => {
      chai.request(app)
        .put(`/news/${newsId}`)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0]).to.have.property('msg').to.equals('No hay campos para actualizar');
          done();
        });
    });

    it('expected error with status 403 (no category exist)', (done) => {
      chai.request(app)
        .put(`/news/${newsId}`)
        .set({ Authorization: adminToken })
        .field('categoryId', '999')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0]).to.have.property('msg').to.equals('La categoria no existe');
          done();
        });
    });
  });

  describe('DELETE /news/id', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .delete('/news/1')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected success with status 200 (news updated)', (done) => {
      chai.request(app)
        .delete(`/news/${newsId}`)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals('news deleted');
          done();
        });
    });

    it('expected error with status 403 (news not found)', (done) => {
      chai.request(app)
        .delete('/news/999')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.errors[0]).to.have.property('msg').to.equals('La novedad no existe');
          done();
        });
    });
  });
});
