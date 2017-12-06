import chai from 'chai';
import AuthenticationService from '../../services/authenticationService';
import createKeyPair from 'keypair';

const keyPair = createKeyPair({bits: 512}),
	  expect = chai.expect,
	  credentials = {
	  	userId: 1,
	  	username: 'mrKingz',
	  	email: 'kingsleyfrankdemesi@gmail.com'
	  };

describe('Test class AuthenticationService', () => {
	describe('Test method generateJWT of AuthenticationService', () => {
        it('should accept as argument user credentials and a secretekey, and generate token', () => {
            return AuthenticationService.generateJWT(credentials, keyPair.private)
            .then((token) => {
            expect(token).to.be.a('string').that.is.not.empty;
            });
        });
	});
	describe('Test method generateJWT of AuthenticationService with user creadentias', () => {
        it('should reject with an error if any/both arguements is/are undefined', () => {
            return AuthenticationService.generateJWT(credentials)
            .catch((error) => {
            expect(error).to.be.an.instanceof(Error);
            expect(error).to.have.property('status')
            .to.be.a('string').that.is.equal('Fail');
            expect(error).to.have.own.property('message').to.be.a('string')
            .that.is.equal('Server error! Could not generate token');
            });
        });
	});
	describe('Test method decodeJWT of AuthenticationService with user creadentias', () => {
        const promise = AuthenticationService.generateJWT(credentials, keyPair.private)
        it('should verify a token and return the decoded payload', () => {
            return promise.then((token) => {
                return AuthenticationService.decodeJWT(token, keyPair.private)
                .then((decoded) => {
                expect(decoded).to.be.an('object')
                expect(decoded).to.have.own.property('userId').to.be.a('number')
                .that.is.equal(credentials.userId);
                expect(decoded).to.have.own.property('email').to.be.a('string')
                .that.is.equal(credentials.email)
                expect(decoded).to.have.own.property('username').to.be.a('string')
                .that.is.equal(credentials.username)
                });
            })
        });
	});
	describe('Test method decodeJWT of AuthenticationService with incorrect secrete key', () => {
	    const promise = AuthenticationService.generateJWT(credentials, keyPair.private)
        it('should reject with error with a different secrete key', () => {
            return promise.then((token) => {
                return AuthenticationService.decodeJWT(token, keyPair.public)
                .catch((error) => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.code).to.be.equal(401)
                expect(error).to.have.own.property('message').to.be.a('string')
                .that.is.equal('Access denied! Invalid authentication token provided')
                });
            })
	    });
        it('should reject with error with an invalid token passed as argument', () => {
            return promise.then((token) => {
                return AuthenticationService.decodeJWT('token', keyPair.private)
                .catch((error) => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.code).to.be.equal(401)
                expect(error).to.have.own.property('message').to.be.a('string')
                .that.is.equal('Access denied! Invalid authentication token provided')
                });
            })
        });
    });
})
