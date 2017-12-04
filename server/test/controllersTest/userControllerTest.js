import chai from 'chai';
import supertest from 'supertest';
import UserController from '../../controllers/userController';
import userData from '../testData/userData';
import app from '../../app.js';
import DBSync from '../dbSync';

let token;
const expect = chai.expect,
      users = userData.users,
	  server = supertest.agent(app);

describe('Test controller classes', () => {

	DBSync.clearDatabase();

	describe('Test method signup of UserController with valid data', () => {
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
				expect(res.body.status).to.equal('Success');
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
			.send(users[1])
			.end((err, res) => {
				expect(res.statusCode).to.equal(400);
				expect(res.body.status).to.equal('fail');
				expect(res.body.message).to.equal('Enter a valid email address!');
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
			.send(users[2])
			.end((err, res) => {
				expect(res.statusCode).to.equal(400);
				expect(res.body.status).to.equal('fail');
				expect(res.body.message).to.equal('Password must containat 1 or more lower and upper case letter, 1 digit (Special charecters can be included)!');
				if (err) return done(err);
				done();
			});
		})
	})
})

describe('Test method signin of UserController with empty password', () => {
	it('should return JSON object containing user details', (done) => {
		server
		.post('/api/v1/users/login')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(users[0])
		.end((err, res) => {
			token = res.body.token;
			expect(res.statusCode).to.equal(200);
			expect(res.body.status).to.equal('Success');
			expect(res.body.message).to.equal('Token successfully generated');
			if (err) return done(err);
			done();
		});
	})
})