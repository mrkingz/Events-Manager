import chai from 'chai';
import supertest from 'supertest';
import UserController from '../../controllers/eventController';
import ModelService from '../../services/modelService';
import models from '../../models'
import app from '../../app.js';
import DBSync from '../dbSync';
import centerData from '../testData/centerData';
import eventData from '../testData/eventData';
import userData from '../testData/userData';

let userToken, adminToken;
const expect = chai.expect,
      { User, Event, Center } = models,
      users = userData.users,
      server = supertest.agent(app);
      
	
describe('Test eventRoutes', () => {

    DBSync.clearDatabase();

    describe('Test eventRoutes', () => {

        before((done) => {
            ModelService.createModelObject(User, { attributes: users[2] })
            .then(() => {
                return done();
            });
        })
        
        before((done) => {
            ModelService.createModelObject(User, { attributes: userData.admin[0] })
            .then(() => {
                return done();
            });
        })

        before((done) => {
            ModelService.createModelObject(Center, { attributes: centerData[0] })
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

        before((done) => {
            server
            .post('/api/v1/users/login')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .type('form')
            .send(userData.admin[0])
            .end((err, res) => {
                adminToken = res.body.token;
                if (err) return done(err);
                done();
            });
        })

        it('should deny access for token not provided', (done) => {
            server
            .post('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .type('form')
            .send(eventData[0])
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
            .post('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', 'token')
            .type('form')
            .send(eventData[0])
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Access denied! Invalid authentication token provided');
                if (err) return done(err);
                done();
            });
        })

        it('should return event title is required', (done) => {
            server
            .post('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send(eventData[1])
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Event title is required!');
                if (err) return done(err);
                done();
            });
        })
        it('should return date is required', (done) => {
            server
            .post('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send(eventData[2])
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Date is required!');
                if (err) return done(err);
                done();
            });
        })
        it('should return time is required', (done) => {
            server
            .post('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send(eventData[3])
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Time is required!');
                if (err) return done(err);
                done();
            });
        })
        it('should return number of estimated guests is required', (done) => {
            server
            .post('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send(eventData[4])
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Number of estimated guests is required!');
                if (err) return done(err);
                done();
            });
        })
        it('should return description is required', (done) => {
            server
            .post('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send(eventData[5])
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Description is required!');
                if (err) return done(err);
                done();
            });
        })
        it('should return 404 for getting all events if none exist', (done) => {
            server
            .get('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Events not found!');
                if (err) return done(err);
                done();
            })
        })

        it('should created add new event', (done) => {
            server
            .post('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send(eventData[0])
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Event successfully created!');
                if (err) return done(err);
                done();
            });
        })
        it('should created add new event', (done) => {
            server
            .post('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send(eventData[7])
            .end((err, res) => {
                expect(res.statusCode).to.equal(201);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Event successfully created!');
                if (err) return done(err);
                done();
            });
        })
        it('should get all events', (done) => {
            const attributes = eventData[0]
            server
            .get('/api/v1/events')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .end((err, res) => {
                const events = res.body.events;
                expect(res.statusCode).to.equal(302);
                expect(events).to.be.an.instanceOf(Array);
                expect(events[0]).to.have.property('eventId');
                expect(events[0]).to.have.property('title').to.be.a('string')
                .that.is.equal(attributes.title);
                expect(events[0]).to.have.property('date').to.be.a('string')
                .that.is.equal(attributes.date);
                expect(events[0]).to.have.property('time').to.be.equal(attributes.time)
                expect(events[0]).to.have.property('estimatedGuests').to.be.a('number')
                .that.is.equal(attributes.estimatedGuests);
                expect(events[0]).to.have.property('description').to.be.a('string')
                .that.is.equal(attributes.description);
                expect(events[0]).to.have.property('createdAt')
                expect(events[0]).to.have.property('updatedAt')
                if (err) return done(err);
                done();
            });
        })
        it('should return 404 for getting a event that does not exist', (done) => {
            server
            .get('/api/v1/events/10')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Event does not exist!');
                if (err) return done(err);
                done();
            })
        })
        it('should get all events', (done) => {
            const attributes = eventData[0]
            server
            .get('/api/v1/events/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .end((err, res) => {
                const event = res.body.event;
                expect(res.statusCode).to.equal(302);
                expect(event).to.be.an('object');
                expect(event).to.have.property('eventId');
                expect(event).to.have.property('title').to.be.a('string')
                .that.is.equal(attributes.title);
                expect(event).to.have.property('date').to.be.a('string')
                .that.is.equal(attributes.date);
                expect(event).to.have.property('time').to.be.equal(attributes.time)
                expect(event).to.have.property('estimatedGuests').to.be.a('number')
                .that.is.equal(attributes.estimatedGuests);
                expect(event).to.have.property('description').to.be.a('string')
                .that.is.equal(attributes.description);
                expect(event).to.have.property('createdAt')
                expect(event).to.have.property('updatedAt')
                if (err) return done(err);
                done();
            });
        })
        it('should return a no change found error', (done) => {
            const attributes = centerData[0]
            server
            .put('/api/v1/events/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send({title: eventData[0].title})
            .end((err, res) => {
                const event = res.body.event;
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Event not updated, no change found');
                if (err) return done(err);
                done();
            });
        })
        it('should update an event', (done) => {
            const attributes = eventData[0]
            attributes.title = 'Adeola\'s Birthday Bash';
            server
            .put('/api/v1/events/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .send({title: attributes.title})
            .end((err, res) => {
                const event = res.body.event;
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Event successfully updated!');
                if (err) return done(err);
                done();
            });
        })

        it('should update an event', (done) => {
            server
            .put('/api/v1/centers/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', adminToken)
            .type('form')
            .send({ availability: false })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.status).to.equal('Fail');
                expect(res.body.message).to.equal('Sorry, date is required!');
                if (err) return done(err);
                done();
            });
        })
        it('should update an event', (done) => {
            server
            .put('/api/v1/centers/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', adminToken)
            .type('form')
            .send({ availability: false, date: '21/12/2017' })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Center successfully updated! No longer available!');
                if (err) return done(err);
                done();
            });
        })
        it('should update an event', (done) => {
            server
            .put('/api/v1/centers/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', adminToken)
            .type('form')
            .send({ availability: true, date: '21/12/2017' })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Center successfully updated! Now available');
                if (err) return done(err);
                done();
            });
        })
        it('should delete an event', (done) => {
            server
            .delete('/api/v1/events/1')
            .set('Connection', 'keep alive')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('token', userToken)
            .type('form')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.status).to.equal('Success');
                expect(res.body.message).to.equal('Event successfully deleted');
                if (err) return done(err);
                done();
            });
        })
    })
})