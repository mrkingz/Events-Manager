import chai from 'chai';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import UserController from '../../controllers/userController';
import app from '../../app.js';
import DBSync from '../dbSync';

let token;
const expect = chai.expect,
			server = supertest.agent(app);
	
	const passwords = [
		'Password1',
	];
	const hashedPasswords = passwords.map((password) => {
		return bcrypt.hashSync(password, 10);
	});
	
	const userSignup = [{
		username: 'don_phillly',
		password: passwords[0],
		email: 'don_philly@gmail.com',
		role: 1,
	}, {
		username: 'don_phillly',
		password: 'Badmos12',
		email: 'don_philly',			
	}, {
		username: 'don_phillly',
		password: null,
		email: 'don_philly',			
	}];

	const userSignin = [{
		username: 'don_phillly',
		password: passwords[0],
	}, {
		username: 'don',
	}, {
		username: 'don_phillly',					
	}];

	const centers = [{
		name: 'Victoria\'s engagement party',
		capacity: '2000',
		price: '20000',
		location: 'Owerri',
		address: '16, binta Joad, Owerri',
		description: 'Nice place',
		userId: 1,			
	}];		
	

describe('Test controller classes', () => {

	DBSync.clearDatabase();

	/***************************************************
	 *  	UserController Unit test    			   *
	 ************************************************* */	
	describe('Test method signup of UserController with valid data', () => {
		it('should return JSON object containing user details', (done) => {
			server
			.post('/api/v1/users')
			.set('Connection', 'keep alive')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.type('form')
			.send(userSignup[0])
			.end((err, res) => {
				expect(res.statusCode).to.equal(201);
				expect(res.body.status).to.equal('success');
				expect(res.body.message).to.equal('Signup completed successfully!');
				if (err) return done(err);
				done();
			});
		})
	})
	describe('Test method signup of UserController with invalid email', () => {
		it('should return JSON object containing user details', (done) => {
			server
			.post('/api/v1/users')
			.set('Connection', 'keep alive')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.type('form')
			.send(userSignup[1])
			.end((err, res) => {
				expect(res.statusCode).to.equal(400);
				expect(res.body.status).to.equal('fail');
				expect(res.body.message).to.equal('Enter a valid email address!');
				if (err) return done(err);
				done();
			});
		})
	})
	describe('Test method signup of UserController with empty password', () => {
		it('should return JSON object containing user details', (done) => {
			server
			.post('/api/v1/users')
			.set('Connection', 'keep alive')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.type('form')
			.send(userSignup[2])
			.end((err, res) => {
			expect(res.statusCode).to.equal(400);
			expect(res.body.status).to.equal('fail');
			expect(res.body.message).to.equal('Password must containat 1 or more lower and upper case letter, 1 digit (Special charecters can be included)!');
			if (err) return done(err);
			done();
			});
		})
	})

	describe('Test method signup of UserController with empty password', () => {
		it('should return JSON object containing user details', (done) => {
			server
			.post('/api/v1/users/login')
			.set('Connection', 'keep alive')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.type('form')
			.send(userSignup[0])
			.end((err, res) => {
			token = res.body.token;
			expect(res.statusCode).to.equal(200);
			expect(res.body.status).to.equal('success');
			expect(res.body.message).to.equal('Token successfully generated');
			if (err) return done(err);
			done();
			});
		})
	})

	/***************************************************
	 *  	CenterController Unit test  			   *
	 ************************************************* */
	describe('Test method createCenter of CenterController with valid data', () => {
		it('should return JSON object containing center details', (done) => {
			server
			.post('/api/v1/centers')
			.set('Connection', 'keep alive')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.type('form')
			.send(centers[0])
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				expect(res.body.status).to.equal('fail');
				expect(res.body.message).to.equal('Access denied! Token not provided');
				if (err) return done(err);
				done();
			});
		})
	})	

	describe('Test method createCenter of EventController with valid data', () => {
		it('should return JSON object containing center details', (done) => {
			server
			.post('/api/v1/centers')
			.set('Connection', 'keep alive')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('token', 'token')
			.type('form')
			.send(centers[0])
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				expect(res.body.status).to.equal('fail');
				expect(res.body.message).to.equal('Access denied! Invalid authentication token provided');
				if (err) return done(err);
				done();
			});
		})
	})

	describe('Test method createCenter of EventController with valid data', () => {
		it('should return JSON object containing center details', (done) => {
			server
			.post('/api/v1/centers')
			.set('Connection', 'keep alive')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.set('token', token)
			.type('form')
			.send(centers[0])
			.end((err, res) => {
				expect(res.statusCode).to.equal(403);
				expect(res.body.status).to.equal('fail');
				expect(res.body.message).to.equal('Access denied! You do not have the privilege to perform this operation');
				if (err) return done(err);
				done();
			});
		})
	})

})

export default token;
