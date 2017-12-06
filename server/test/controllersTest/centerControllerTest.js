import chai from 'chai';
import supertest from 'supertest';
import UserController from '../../controllers/eventController';
import ModelService from '../../services/modelService';
import models from '../../models'
import app from '../../app.js';
import DBSync from '../dbSync';
import centerData from '../testData/centerData';
import userData from '../testData/userData';

let userToken, adminToken;
const expect = chai.expect,
      { User } = models,
      users = userData.users,
      admin = userData.admin,
      server = supertest.agent(app);
      
    DBSync.clearDatabase();
	
describe('Users', () => {

    before((done) => {
        ModelService.createModelObject(User, { attributes: users[0] })
        .then(() => {
            return done();
        });
    })

	it('should return JSON with a generated token', (done) => {
		server
		.post('/api/v1/users/login')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(users[0])
		.end((err, res) => {
            if(res.statusCode === 200) {
                userToken = res.body.token;
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Token successfully generated');
            } else {
                expect(res.statusCode).to.equal(500);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Server error! Could not generate token'); 
            }
            if (err) return done(err);
            done();
        });
	})
    it('should created a new center', (done) => {
        if(userToken) {
            server
            .post('/api/v1/centers')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send(centerData[0])
            .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Sorry, you are not authorized to perform this operation!');
                if (err) return done(err);
                done();
            });
        } else {
            expect(res.statusCode).to.equal(401);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Access denied! Token not provided');
        }
    })
})

describe('Test class centerController', () => {

    before((done) => {
        ModelService.createModelObject(User, { attributes: admin[0] })
        .then(() => {
            return done();
        });
    })
    //Login as a user
    it('should deny access for token not provided', (done) => {
        server
        .post('/api/v1/centers')
        .set('Connection', 'keep alive')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(centerData[0])
        .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Access denied! Token not provided');
            if (err) return done(err);
            done();
        });
    })

    it('should deny access for invalid token', (done) => {
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
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Access denied! Invalid authentication token provided');
            if (err) return done(err);
            done();
        });
    })

    //Login as admin 
	it('should return JSON with a token for an admin', (done) => {
		server
		.post('/api/v1/users/login')
		.set('Connection', 'keep alive')
		.set('Accept', 'application/json')
		.set('Content-Type', 'application/json')
		.type('form')
		.send(admin[0])
		.end((err, res) => {
            if(res.statusCode === 200) {
                adminToken = res.body.token;
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Token successfully generated');
            } else {
                expect(res.statusCode).to.equal(500);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Server error! Could not generate token');               
            }
			if (err) return done(err);
			done();
		});
	})

    it('should created a new center', (done) => {
        if(adminToken) {
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
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Center successfully created!');
                if (err) return done(err);
                done();
            });
        } else {
            expect(res.statusCode).to.equal(401);
            expect(res.body.status).to.equal('Fail');
            expect(res.body.message).to.equal('Access denied! Token not provided');            
        }
    })
})

