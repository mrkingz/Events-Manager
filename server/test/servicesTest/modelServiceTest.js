import chai from 'chai';
import models from '../../models';
import bcrypt from 'bcrypt';
import ModelService from '../../services/modelService';
import DBSync from '../dbSync';
import userData from '../testData/userData';

const expect = chai.expect,
			{ User } = models,
            userId = 1,
            adminRole = 1,
            userRole = 2;

describe('Test class ModelService', () => {
    DBSync.clearDatabase();
	describe('Test method createModelObject', () => {
		it('should create an object of a model', () => {
			const attributes = userData.admin[0];
			return ModelService.createModelObject(User, { attributes: attributes })
			.then((modelObject) => {
				expect(modelObject).to.be.an('object')
				expect(modelObject).to.have.own.property('status').to.be.a('string')
				.that.is.equal('Success');
				expect(modelObject).to.have.property('message').to.be.a('string')
				.that.is.equal('User successfully created!');
				expect(modelObject.user).to.be.an('object')
				.that.is.an.instanceof(User);
				expect(modelObject.user).to.have.property('userId').to.be.equal(userId);
				expect(modelObject.user).to.have.property('username').to.be.a('string')
				.that.is.equal(attributes.username);
				expect(modelObject.user).to.have.property('email').to.be.a('string')
                .that.is.equal(attributes.email);
                expect(modelObject.user).to.have.property('role').to.be.equal(adminRole)
				expect(modelObject.user).to.have.property('password').to.be.a('string')
				.that.is.not.empty;
				expect(modelObject.user).to.have.property('createdAt').to.be.an.instanceof(Date)
				expect(modelObject.user).to.have.property('updatedAt').to.be.an.instanceof(Date)
			})
		})
		it('should throw an appropriate error if email has been used', () => {
			const attributes = {
					username: 'mrKingz_ng',
					email: 'example.mail@gmail.com',
					password: 'Password1'
				}
			return ModelService.createModelObject(User, { attributes: attributes })
			.catch((error) => {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Email has been used')
			})
		})
		it('should reject with an error for invalid inputs', () => {
			const attributes = {
					username: 'mrKingz',
					email: 'example.mail@gamil',
					password: 'Password1'
				}
			return ModelService.createModelObject(User, { attributes: attributes })
			.catch((error) => {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Invalid email address!')
			})
		})
		it('should reject with an error for missing inputs', () => {
			const attributes = {
					email: 'example.mail@gamil.com',
					password: 'Password1'
				}
			return ModelService.createModelObject(User, { attributes: attributes })
			.catch((error) => {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string')
				.that.is.equal('Username is required!')
			})
		})
	})
});