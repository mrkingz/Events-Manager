'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _modelService = require('../../services/modelService');

var _modelService2 = _interopRequireDefault(_modelService);

var _dbSync = require('../dbSync');

var _dbSync2 = _interopRequireDefault(_dbSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect,
    User = _models2.default.User,
    userId = 1,
    adminRole = 1,
    userRole = 2;


describe('Test class ModelService', function () {
	_dbSync2.default.clearDatabase();
	describe('Test method createModelObject', function () {
		it('should create an object of a model', function () {
			var attributes = {
				username: 'mrKingz',
				email: 'example.mail@gmail.com',
				password: 'Password1'
			};
			return _modelService2.default.createModelObject(User, { attributes: attributes }).then(function (modelObject) {
				expect(modelObject).to.be.an('object');
				expect(modelObject).to.have.own.property('status').to.be.a('string').that.is.equal('success');
				expect(modelObject).to.have.property('message').to.be.a('string').that.is.equal('User successfully created!');
				expect(modelObject.user).to.be.an('object').that.is.an.instanceof(User);
				expect(modelObject.user).to.have.property('userId').to.be.equal(userId);
				expect(modelObject.user).to.have.property('username').to.be.a('string').that.is.equal(attributes.username);
				expect(modelObject.user).to.have.property('email').to.be.a('string').that.is.equal(attributes.email);
				expect(modelObject.user).to.have.property('role').to.be.equal(userRole);
				expect(modelObject.user).to.have.property('password').to.be.a('string').that.is.not.empty;
				expect(modelObject.user).to.have.property('createdAt').to.be.an.instanceof(Date);
				expect(modelObject.user).to.have.property('updatedAt').to.be.an.instanceof(Date);
			});
		});
		it('should throw an appropriate error if email has been used', function () {
			var attributes = {
				username: 'mrKingz_ng',
				email: 'example.mail@gmail.com',
				password: 'Password1'
			};
			return _modelService2.default.createModelObject(User, { attributes: attributes }).catch(function (error) {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string').that.is.equal('Email has been used');
			});
		});
		it('should reject with an error for invalid inputs', function () {
			var attributes = {
				username: 'mrKingz',
				email: 'example.mail@gamil',
				password: 'Password1'
			};
			return _modelService2.default.createModelObject(User, { attributes: attributes }).catch(function (error) {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string').that.is.equal('Invalid email address!');
			});
		});
		it('should reject with an error for missing inputs', function () {
			var attributes = {
				email: 'example.mail@gamil.com',
				password: 'Password1'
			};
			return _modelService2.default.createModelObject(User, { attributes: attributes }).catch(function (error) {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('message').to.be.a('string').that.is.equal('Username is required!');
			});
		});
	});
});