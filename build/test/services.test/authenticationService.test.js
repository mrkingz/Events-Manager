'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _AuthenticationService = require('../../services/AuthenticationService');

var _AuthenticationService2 = _interopRequireDefault(_AuthenticationService);

var _keypair = require('keypair');

var _keypair2 = _interopRequireDefault(_keypair);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyPair = (0, _keypair2.default)({ bits: 512 }),
    expect = _chai2.default.expect,
    credentials = {
	userId: 1,
	username: 'mrKingz',
	email: 'kingsleyfrankdemesi@gmail.com'
};

describe('Test class AuthenticationService', function () {
	describe('Test method generateJWT of AuthenticationService', function () {
		it('should accept as argument user credentials and a secretekey, and generate token', function () {
			return _AuthenticationService2.default.generateJWT(credentials, keyPair.private).then(function (token) {
				expect(token).to.be.a('string').that.is.not.empty;
			});
		});
	});
	describe('Test method generateJWT of AuthenticationService with user creadentias', function () {
		it('should reject with an error if any/both arguements is/are undefined', function () {
			return _AuthenticationService2.default.generateJWT(credentials).catch(function (error) {
				expect(error).to.be.an.instanceof(Error);
				expect(error).to.have.own.property('success').to.be.a('boolean').that.is.equal(false);
				expect(error).to.have.own.property('message').to.be.a('string').that.is.equal('Server error! Could not generate token');
			});
		});
	});
	describe('Test method decodeJWT of AuthenticationService with user creadentias', function () {
		var promise = _AuthenticationService2.default.generateJWT(credentials, keyPair.private);
		it('should verify a token and return the decoded payload', function () {
			return promise.then(function (token) {
				return _AuthenticationService2.default.decodeJWT(token, keyPair.private).then(function (decoded) {
					expect(decoded).to.be.an('object');
					expect(decoded).to.have.own.property('userId').to.be.a('number').that.is.equal(credentials.userId);
					expect(decoded).to.have.own.property('email').to.be.a('string').that.is.equal(credentials.email);
					expect(decoded).to.have.own.property('username').to.be.a('string').that.is.equal(credentials.username);
				});
			});
		});
	});
	describe('Test method decodeJWT of AuthenticationService with incorrect secrete key', function () {
		var promise = _AuthenticationService2.default.generateJWT(credentials, keyPair.private);
		it('should reject with error with a different secrete key', function () {
			return promise.then(function (token) {
				return _AuthenticationService2.default.decodeJWT(token, keyPair.public).catch(function (error) {
					expect(error).to.be.an.instanceof(Error);
					expect(error.code).to.be.equal(401);
					expect(error).to.have.own.property('message').to.be.a('string').that.is.equal('Access denied! Invalid authentication token provided');
				});
			});
		});
		it('should reject with error with an invalid token passed as argument', function () {
			return promise.then(function (token) {
				return _AuthenticationService2.default.decodeJWT('token', keyPair.private).catch(function (error) {
					expect(error).to.be.an.instanceof(Error);
					expect(error.code).to.be.equal(401);
					expect(error).to.have.own.property('message').to.be.a('string').that.is.equal('Access denied! Invalid authentication token provided');
				});
			});
		});
	});
});