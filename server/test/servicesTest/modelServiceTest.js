import chai from 'chai';
import supertest from 'supertest';
import app from '../../app.js';
import models from '../../models';
import bcrypt from 'bcrypt';
import ModelService from '../../services/modelService';
import DBSync from '../dbSync';
import userData from '../testData/userData';
import centerData from '../testData/centerData';

let userId, centerObj, centerDel;
const expect = chai.expect,
	  attributes = centerData[0],
	  { User, Center } = models,
	  server = supertest.agent(app);


describe('Test class ModelService', () => {

	DBSync.clearDatabase();
	
    before((done) => {
        ModelService.createModelObject(User, { attributes: userData.admin[0] })
        .then((user) => {
			userId = user.userId;
            return done();
        });
	})
	
    before((done) => {
        ModelService.createModelObject(Center, { attributes: centerData[2] })
        .then((centerObject) => {
			centerDel = centerObject.center;
            return done();
        });
    })

	describe('Test method createModelObject', () => {
		it('should create an object of a model', () => {
			return ModelService.createModelObject(Center, { attributes: attributes })
			.then((modelObject) => {
				centerObj = modelObject.center;
				expect(modelObject).to.be.an('object')
				expect(modelObject).to.have.own.property('status').to.be.a('string')
				.that.is.equal('Success');
				expect(modelObject).to.have.property('message').to.be.a('string')
				.that.is.equal('Center successfully created!');
				expect(modelObject.center).to.be.an('object')
				.that.is.an.instanceof(Center);
				expect(modelObject.center).to.have.property('centerId');
				expect(modelObject.center).to.have.property('name').to.be.a('string')
				.that.is.equal(attributes.name);
				expect(modelObject.center).to.have.property('capacity').to.be.a('number')
                .that.is.equal(attributes.capacity);
                expect(modelObject.center).to.have.property('price').to.be.equal(attributes.price)
				expect(modelObject.center).to.have.property('location').to.be.a('string')
				.that.is.equal(attributes.location);
				expect(modelObject.center).to.have.property('address').to.be.a('string')
				.that.is.equal(attributes.address);
				expect(modelObject.center).to.have.property('description').to.be.a('string')
				.that.is.equal(attributes.description);
				expect(modelObject.center).to.have.property('createdAt').to.be.an.instanceof(Date)
				expect(modelObject.center).to.have.property('updatedAt').to.be.an.instanceof(Date)
			})
		})
		it('should return false for isEdited if model object was not edited', () => {
			const result = ModelService.verifyUpdate({name: attributes.name}, centerObj);
			expect(result).to.be.an('object');
			expect(result).to.have.own.property('isVerified').to.be.a('boolean').that.is.equal(true)
			expect(result).to.have.own.property('isEdited').to.be.a('boolean').that.is.equal(false)
		})
		it('should return true for isEdited if model object was edited', () => {
			const result = ModelService.verifyUpdate({name: 'Royal Crown Event Center'}, centerObj);
			expect(result).to.be.an('object');
			expect(result).to.have.own.property('isVerified').to.be.a('boolean').that.is.equal(true)
			expect(result).to.have.own.property('isEdited').to.be.a('boolean').that.is.equal(true)
		})
		it('should return a model object', () => {
			return ModelService.findOneModelObject(Center, { 
				where: {centerId: centerObj.centerId}
			 })
			.then((center) => {
				expect(center).to.be.an.instanceof(Center);
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
				expect(center).to.have.property('createdAt').to.be.an.instanceof(Date)
				expect(center).to.have.property('updatedAt').to.be.an.instanceof(Date)
			})
		})
		it('should reject with an error if object does not exist', () => {
			return ModelService.findOneModelObject(Center, { 
				where: { centerId: 4 } 
			})
			.catch((error) => {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Center does not exist!')
			})
		})
		it('should return a model objects', () => {
			return ModelService.findAllModelObjects(Center, {
				order: [['name', 'ASC']],
			})
			.then((center) => {
				expect(center).to.be.an.instanceOf(Array);
				expect(center[0]).to.have.property('centerId');
				expect(center[0]).to.have.property('name').to.be.a('string')
				.that.is.equal(attributes.name);
				expect(center[0]).to.have.property('capacity').to.be.a('number')
                .that.is.equal(attributes.capacity);
                expect(center[0]).to.have.property('price').to.be.equal(attributes.price)
				expect(center[0]).to.have.property('location').to.be.a('string')
				.that.is.equal(attributes.location);
				expect(center[0]).to.have.property('address').to.be.a('string')
				.that.is.equal(attributes.address);
				expect(center[0]).to.have.property('description').to.be.a('string')
				.that.is.equal(attributes.description);
				expect(center[0]).to.have.property('createdAt').to.be.an.instanceof(Date)
				expect(center[0]).to.have.property('updatedAt').to.be.an.instanceof(Date)
			})
		})
		it('should reject with an error if objects does not exist', () => {
			return ModelService.findAllModelObjects(Center)
			.catch((error) => {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Center does not exist!')
			})
		})
		it('should reject with an error if object already exist', () => {
			return ModelService.ifExistModelObject(Center, { 
				where: { centerId: centerObj.centerId } 
			})
			.catch((error) => {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Center already exist')
			})
		})
		it('should resolve with a boolean value of true if object does not exist', () => {
			return ModelService.ifExistModelObject(Center, { 
				where: { centerId: 5 } 
			})
			.then((result) => {
				expect(result).to.be.a('boolean').that.is.equal(true)
			})
		})
		it('should delete a model object', () => {
			return ModelService.deleteModelObject(Center, { 
				where: { centerId: centerDel.centerId } 
			})
			.then((result) => {
				expect(result).to.have.own.property('status')
				.that.is.equal('Success');
				expect(result).to.have.own.property('message')
				.that.is.equal('Center successfully deleted');
			})
		})
		it('should reject with an error if object to delete does not exist', () => {
			return ModelService.deleteModelObject(Center, { 
				where: { centerId: 21 } 
			})
			.catch((error) => {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Center does not exist!')
			})
		})
		it('should not update a model objects', () => {
			return ModelService.updateModelObject(Center, {
				where: { centerId: centerObj.centerId },
				attributes: centerObj
			})
			.then((update) => {
				const center = update.center;
				expect(update).to.be.an('object');
				expect(update).to.have.own.property('status')
				.that.is.equal('Fail');
				expect(update).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Center not updated, no change found')
				expect(center).to.have.property('name')
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
				expect(center).to.have.property('createdAt').to.be.an.instanceof(Date)
				expect(center).to.have.property('updatedAt').to.be.an.instanceof(Date)
			})
		})
		it('should return update a model objects', () => {
			const newValue = { price: '3000' }
			return ModelService.updateModelObject(Center, {
				where: { centerId: centerObj.centerId },
				attributes: newValue
			})
			.then((update) => {
				const center = update.center;
				expect(update).to.be.an('object');
				expect(update).to.have.own.property('status')
				.that.is.equal('Success');
				expect(update).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Center successfully updated!')
				expect(center).to.have.property('name')
				.that.is.equal(attributes.name);
				expect(center).to.have.property('capacity').to.be.a('number')
                .that.is.equal(attributes.capacity);
                expect(center).to.have.property('price').to.be.equal(newValue.price)
				expect(center).to.have.property('location').to.be.a('string')
				.that.is.equal(attributes.location);
				expect(center).to.have.property('address').to.be.a('string')
				.that.is.equal(attributes.address);
				expect(center).to.have.property('description').to.be.a('string')
				.that.is.equal(attributes.description);
				expect(center).to.have.property('createdAt').to.be.an.instanceof(Date)
				expect(center).to.have.property('updatedAt').to.be.an.instanceof(Date)
			})
		})
		it('should reject with an error if object to update does not exist', () => {
			return ModelService.updateModelObject(Center, { 
				where: { centerId: 6 },
				attributes: centerObj
			})
			.catch((error) => {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Center does not exist!')
			})
		})
		it('should refactor an error object', () => {
			const err = new Error();

			const error = ModelService.refactorError('Could not create center!', err)
			expect(error).to.be.an.instanceof(Error);
			expect(error).to.have.property('message').to.be.a('string')
			.that.is.equal('Server error! Could not create center!')
		})
		it('should refactor an error object and remove sequelize error message', () => {
			const err = {
				name: 'SequelizeValidationError',
				errors: [{
					path: 'password',
					type: 'notnull violation',
					message: 'Username is not available',
				}]
			};

			const error = ModelService.refactorError('', err)
			expect(error).to.be.an.instanceof(Error);
			expect(error).to.have.property('message').to.be.a('string')
			.that.is.equal('Password is required!')
		})
		it('should refactor an error object and return an appropriate message', () => {
			const err = {
				name: 'SequelizeValidationError',
				errors: [{
					path: 'password',
					type: 'something else',
					message: 'Username is not available',
				}]
			};

			const error = ModelService.refactorError('', err)
			expect(error).to.be.an.instanceof(Error);
			expect(error).to.have.property('message').to.be.a('string')
			.that.is.equal('Username is not available')
		})
	})
	it('should return a json', () => {
		const result = ModelService.getStatus();
		expect(result).to.be.an('object');
		expect(result).to.have.own.property('success').to.be.a('string').that.is.equal('Success')
		expect(result).to.have.own.property('failure').to.be.a('string').that.is.equal('Fail')
	})
});