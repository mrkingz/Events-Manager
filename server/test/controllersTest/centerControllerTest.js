// import chai from 'chai';
// import supertest from 'supertest';
// import UserController from '../../controllers/eventController';
// import app from '../../app.js';
// import DBSync from '../dbSync';
// import utoken from './userController.test';

// const expect = chai.expect,
// 			server = supertest.agent(app);
// 	console.log(utoken.token);
// 	const centers = [{
// 		name: 'Victoria\'s engagement party',
// 		capacity: '2000',
// 		price: '20000',
// 		location: 'Owerri',
// 		address: '16, binta Joad, Owerri',
// 		description: 'Nice place',
// 		userId: 1,			
// 	}];

	
// describe('Test class centerController', () => {
// 	DBSync.clearDatabase();
// 	describe('Test method createCenter of EventController with valid data', () => {
// 		it('should return JSON object containing center details', (done) => {
// 			server
// 			.post('/api/v1/centers')
// 			.set('Connection', 'keep alive')
// 			.set('Accept', 'application/json')
// 			.set('Content-Type', 'application/json')
// 			.type('form')
// 			.send(centers[0])
// 			.end((err, res) => {
// 				expect(res.statusCode).to.equal(401);
// 				expect(res.body.status).to.equal('fail');
// 				expect(res.body.message).to.equal('Access denied! Token not provided');
// 				if (err) return done(err);
// 				done();
// 			});
// 		})
// 	})	
// 	describe('Test method createCenter of EventController with valid data', () => {
// 		it('should return JSON object containing center details', (done) => {
// 			server
// 			.post('/api/v1/centers')
// 			.set('Connection', 'keep alive')
// 			.set('Accept', 'application/json')
// 			.set('Content-Type', 'application/json')
// 			.set('token', 'token')
// 			.type('form')
// 			.send(centers[0])
// 			.end((err, res) => {
// 				expect(res.statusCode).to.equal(401);
// 				expect(res.body.status).to.equal('fail');
// 				expect(res.body.message).to.equal('Access denied! Invalid authentication token provided');
// 				if (err) return done(err);
// 				done();
// 			});
// 		})
// 	})
// })
