const request = require('supertest');
const should = require('should')
const { app } = require('./index')

describe('GET /users는', function() {
    describe('성공시', function() {
        it ('사용자 데이터를 배열 형태로 반환합니다.', function(done) {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array)
                    done();
                })
        })
    
        it ('사용자 데이터를 최대 Limit개수만큼만 응답한다.', function(done) {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done()
                })
        })
    });

    describe('실패시', function() {
        it ('Limit이 숫자형이 아니면 400 에러코드를 응답한다.', function(done) {
            request(app)
                .get('/users?limit=five')
                .expect(400)
                .end((err, res) => {
                    done();
                })
        })
    })
})


describe('GET /user/:id는', function() {
    describe('성공시', function() {
        it ('단일 사용자 객체를 반환한다.', function(done) {
            request(app)
                .get('/user/123')
                .end((err, res) => {
                    res.body.should.have.property('id', 123);
                    done();
                })
        })
    });
    describe('실패시', function() {
        it ('존재하지 않는 사용자 아이디면 404 에러코드를 응답한다.', function(done) {
            request(app)
                .get('/user/111')
                .expect(404)
                .end((err, res) => {
                    done();
                })
        });
        it ('아이디가 숫자가 아닌경우 400 에러코드를 응답한다', function(done) {
            request(app)
                .get('/user/five')
                .expect(400)
                .end((err, res) => {
                    done();
                })
        })
    });
});

describe('/DELETE /user/:id/delete는', function() {
    describe('성공시', function() {
        it('id를 가진 단일 사용자 객체를 배열에서 제거한다.', function(done) {
            request(app)
                .delete('/user/123/delete')
                .expect(204)
                .end((err, res) => {
                    done();
                })
        })
    })
    describe('실패시', function() {
        it ('아이디가 숫자가 아닌경우 400 에러코드를 응답한다', function(done) {
            request(app)
                .get('/user/five/delete')
                .expect(400)
                .end((err, res) => {
                    done();
                })
        })
    })
})








