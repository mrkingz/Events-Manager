import chai from 'chai';
import supertest from 'supertest';
import UserController from '../../controllers/eventController';
import app from '../../app.js';
import DBSync from '../dbSync';
import centerData from '../testData/centerData';
import userData from '../testData/userData';

let userToken, adminToken;
const expect = chai.expect,
      users = userData.users,
      admin = userData.admin,
	  server = supertest.agent(app);
	
describe('Test class centerController', () => {
    DBSync.clearDatabase();
    it('should return JSON object containing user details', (done) => {
        server
        .post('/api/v1/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(users[0])
        .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.equal('Signup completed successfully!');
            if (err) return done(err);
            done();
        });
    })

    it('should return JSON object containing user details', (done) => {
        server
        .post('/api/v1/users')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(admin[0])
        .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.equal('Signup completed successfully!');
            if (err) return done(err);
            done();
        });
    })

    //Login as admin 
	it('should return JSON object containing user details', (done) => {
		server
		.post('/api/v1/users/login')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(admin[0])
		.end((err, res) => {
            adminToken = res.body.token;
			expect(res.statusCode).to.equal(200);
			expect(res.body.status).to.equal('success');
			expect(res.body.message).to.equal('Token successfully generated');
			if (err) return done(err);
			done();
		});
	})

    //Login as a user
	it('should return JSON object containing user details', (done) => {
		server
		.post('/api/v1/users/login')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(users[0])
		.end((err, res) => {
            userToken = res.body.token;
			expect(res.statusCode).to.equal(200);
			expect(res.body.status).to.equal('success');
			expect(res.body.message).to.equal('Token successfully generated');
			if (err) return done(err);
			done();
		});
	})
    it('should return JSON object containing center details', (done) => {
        server
        .post('/api/v1/centers')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(centerData[0])
        .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Access denied! Token not provided');
            if (err) return done(err);
            done();
        });
    })
    it('should return JSON object containing center details', (done) => {
        server
        .post('/api/v1/centers')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('token', 'token')
        .type('form')
        .send(centerData[0])
        .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.equal('Access denied! Invalid authentication token provided');
            if (err) return done(err);
            done();
        });
    })
    it('should return JSON object containing center details', (done) => {
        server
        .post('/api/v1/centers')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('token', adminToken)
        .type('form')
        .send(centerData[0])
        .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.equal('Center successfully created!');
            if (err) return done(err);
            done();
        });
    })
})

