import chai from 'chai';
import supertest from 'supertest';
import UserController from '../../controllers/userController';
import userData from '../testData/userData';
import ModelService from '../../services/modelService';
import { User } from '../../models'
import app from '../../app.js';
import DBSync from '../dbSync';

let userToken;
const expect = chai.expect,
      users = userData.users,
	  server = supertest.agent(app);

describe('Test UserController class', () => {

	DBSync.clearDatabase();
    before((done) => {
        ModelService.createModelObject(User, { attributes: users[0] })
        .then(() => {
            return done();
        });
	})
	
	it('should signup a new user', (done) => {
		server
		.post('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(users[1])
		.end((err, res) => {
			expect(res.statusCode).to.equal(201);
			expect(res.body.status).to.equal('Success');
			expect(res.body.message).to.equal('Signup completed successfully!');
			if (err) return done(err);
			done();
		});
	})
	it('should return an invalid email address error message', (done) => {
		server
		.post('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(users[2])
		.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('Enter a valid email address!');
			if (err) return done(err);
			done();
		});
	})
	it('should return a username not available error message', (done) => {
		server
		.post('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(users[3])
		.end((err, res) => {
			expect(res.statusCode).to.equal(409);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('Username is not available!');
			if (err) return done(err);
			done();
		});
	})
	it('should return email has been used error message', (done) => {
		server
		.post('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(users[0])
		.end((err, res) => {
			expect(res.statusCode).to.equal(409);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('Email has been used!');
			if (err) return done(err);
			done();
		});
	})
	it('should return a password required error massage', (done) => {
		server
		.post('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(users[4])
		.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('Password is required!');
			if (err) return done(err);
			done();
		});
	})

	it('should generate a token and sign in a user', (done) => {
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
			expect(res.body.status).to.equal('Success');
			expect(res.body.message).to.equal('Token successfully generated');
			if (err) return done(err);
			done();
		});
	})
	it('should return JSON object containing user details', (done) => {
		server
		.post('/api/v1/users/login')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('Username and password required!');
			if (err) return done(err);
			done();
		});
	})
	it('should return JSON object containing user details', (done) => {
		server
		.post('/api/v1/users/login')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send({ username: 'don_philly1', password: 'pass'})
		.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('Invalid username and password');
			if (err) return done(err);
			done();
		});
	})
	it('should return the message new password is required', (done) => {
		server
		.put('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
    	.set('token', userToken)
		.type('form')
		.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('New password is required');
			if (err) return done(err);
			done();
		});
	})
	it('should return appropriate message for invalid password', (done) => {
		server
		.put('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
    	.set('token', userToken)
		.type('form')
		.send({password: 'Pass'})
		.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('Password must be at leat at least 8 characters long!');
			if (err) return done(err);
			done();
		});
	})
	it('should not reset user password', (done) => {
		server
		.put('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
    	.set('token', userToken)
		.type('form')
		.send({password: 'Password'})
		.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('Password must containat 1 or more lower and upper case letter, 1 digit (Special charecters can be included)!');
			if (err) return done(err);
			done();
		});
	})
	it('should not reset user password', (done) => {
		server
		.put('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
    	.set('token', userToken)
		.type('form')
		.send({password: 'Password1'})
		.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal('Fail');
			expect(res.body.message).to.equal('New password must be different from old password');
			if (err) return done(err);
			done();
		});
	})

	it('should reset user password', (done) => {
		server
		.put('/api/v1/users')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
    	.set('token', userToken)
		.type('form')
		.send({password: 'Password2'})
		.end((err, res) => {
			expect(res.statusCode).to.equal(200);
			expect(res.body.status).to.equal('Success');
			expect(res.body.message).to.equal('New password saved successfully');
			if (err) return done(err);
			done();
		});
	})
})