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
      
	
describe('Test centerRoutes', () => {

    DBSync.clearDatabase();

    describe('Test with user token', () => {

        before((done) => {
            ModelService.createModelObject(User, { attributes: users[2] })
            .then(() => {
                return done();
            });
        })

        before((done) => {
            server
            .post('/api/v1/users/login')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .type('form')
            .send(users[2])
            .end((err, res) => {
                userToken = res.body.token;
                if (err) return done(err);
                done();
            });
        })

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

        it('should return a not authorize message', (done) => {
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
        })
        it('should return a not authorize message', (done) => {
            const attributes = centerData[0]
            server
            .put('/api/v1/centers/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send({name: centerData[0]})
            .end((err, res) => {
                const center = res.body.center;
                expect(res.statusCode).to.equal(403);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Sorry, you are not authorized to perform this operation!');
                if (err) return done(err);
                done();
            });
        })
    })

    describe('Test with admin token', () => {

        before((done) => {
            ModelService.createModelObject(User, { attributes: admin[0] })
            .then(() => {
                return done();
            });
        })
        
        before((done) => {
            server
            .post('/api/v1/users/login')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .type('form')
            .send(admin[0])
            .end((err, res) => {
                adminToken = res.body.token;
                if (err) return done(err);
                done();
            });
        })
        it('should return 404 for getting all centers if none exist', (done) => {
            server
            .get('/api/v1/centers')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', adminToken)
            .type('form')
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Centers not found!');
                if (err) return done(err);
                done();
            })
        })
        it('should created a new center', (done) => {
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
        })

        it('should get all centers', (done) => {
            const attributes = centerData[0]
            server
            .get('/api/v1/centers')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', adminToken)
            .type('form')
            .end((err, res) => {
                const centers = res.body.centers;
                expect(res.statusCode).to.equal(302);
				expect(centers).to.be.an.instanceOf(Array);
				expect(centers[0]).to.have.property('centerId');
				expect(centers[0]).to.have.property('name').to.be.a('string')
				.that.is.equal(attributes.name);
				expect(centers[0]).to.have.property('capacity').to.be.a('number')
                .that.is.equal(attributes.capacity);
                expect(centers[0]).to.have.property('price').to.be.equal(attributes.price)
				expect(centers[0]).to.have.property('location').to.be.a('string')
				.that.is.equal(attributes.location);
				expect(centers[0]).to.have.property('address').to.be.a('string')
				.that.is.equal(attributes.address);
				expect(centers[0]).to.have.property('description').to.be.a('string')
				.that.is.equal(attributes.description);
				expect(centers[0]).to.have.property('createdAt')
				expect(centers[0]).to.have.property('updatedAt')
                if (err) return done(err);
                done();
            });
        })
        it('should return 404 for getting a center that does not exist', (done) => {
            server
            .get('/api/v1/centers/10')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', adminToken)
            .type('form')
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Center does not exist!');
                if (err) return done(err);
                done();
            })
        })
        it('should get all centers', (done) => {
            const attributes = centerData[0]
            server
            .get('/api/v1/centers/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', adminToken)
            .type('form')
            .end((err, res) => {
                const center = res.body.center;
                expect(res.statusCode).to.equal(302);
				expect(center).to.be.an('object');
				expect(center).to.have.property('centerId');
				expect(center).to.have.property('name').to.be.a('string')
				.that.is.equal(attributes.name);
				expect(center).to.have.property('capacity').to.be.a('number')
                .that.is.equal(attributes.capacity);
                expect(center).to.have.property('price').to.be.equal(attributes.price)
				expect(center).to.have.property('location').to.be.a('string')
				.that.is.equal(attributes.location);
				expect(center).to.have.property('address').to.be.a('string')
				.that.is.equal(attributes.address);
				expect(center).to.have.property('description').to.be.a('string')
				.that.is.equal(attributes.description);
				expect(center).to.have.property('createdAt')
				expect(center).to.have.property('updatedAt')
                if (err) return done(err);
                done();
            });
        })
        it('should return a no change found error', (done) => {
            const attributes = centerData[0]
            server
            .put('/api/v1/centers/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', adminToken)
            .type('form')
            .send({name: centerData[0].name})
            .end((err, res) => {
                const center = res.body.center;
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Center not updated, no change found');
                if (err) return done(err);
                done();
            });
        })
        it('should update a center', (done) => {
            const attributes = centerData[0]
            attributes.name = 'A.B. Auditorium Multipurpose Event Center';
            server
            .put('/api/v1/centers/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', adminToken)
            .type('form')
            .send({name: attributes.name})
            .end((err, res) => {
                const center = res.body.center;
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Center successfully updated!');
				expect(center).to.be.an('object');
				expect(center).to.have.property('centerId');
				expect(center).to.have.property('name').to.be.a('string')
				.that.is.equal(attributes.name);
				expect(center).to.have.property('capacity').to.be.a('number')
                .that.is.equal(attributes.capacity);
                expect(center).to.have.property('price').to.be.equal(attributes.price)
				expect(center).to.have.property('location').to.be.a('string')
				.that.is.equal(attributes.location);
				expect(center).to.have.property('address').to.be.a('string')
				.that.is.equal(attributes.address);
				expect(center).to.have.property('description').to.be.a('string')
				.that.is.equal(attributes.description);
				expect(center).to.have.property('createdAt')
				expect(center).to.have.property('updatedAt')
                if (err) return done(err);
                done();
            });
        })
    })
})

