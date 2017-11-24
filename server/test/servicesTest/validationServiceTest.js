import chai from 'chai';
import supertest from 'supertest';

import ValidationService from '../../services/validationService';
import app from '../../app.js';

const expect = chai.expect,
			server = supertest.agent(app);

describe('Test class ValidationService', () => {
	describe('Test method isValidIntegerURI of ValidationService with an invalid URI', () => {
		const centerId = '12w'
		it('should return 404 status code', (done) => {
			server
			.get(`/api/v1/centers/${centerId}`)
			.end((err, res) => {
			 	const middleware = ValidationService.isValidIntegerURI();
			 	expect(middleware).to.be.a('function');
			 	expect(res.body).to.be.an('object');
				 expect(res.statusCode).to.equal(400);
				 expect(res.body.message).to.be.equal('12w, is not a valid resource identifier');
			 	return done();
			})
		})
	})
	describe('Test method isInteger of ValidationService', () => {
		it('ValidationService.isInteger(1) should be true', () => {
			expect(ValidationService.isInteger(1)).to.be.equal(true)
		});
		it('ValidationService.isInteger(1.2) should be false', () => {
			expect(ValidationService.isInteger('1.2')).to.be.equal(false)
		});
		it('ValidationService.isInteger([]) should be false', () => {
			expect(ValidationService.isInteger([])).to.be.equal(false)
		});
		it('ValidationService.isInteger({}) should be false', () => {
			expect(ValidationService.isInteger({})).to.be.equal(false)
		});
		it('ValidationService.isInteger() to throw Error(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isInteger()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});
	})
	describe('Test method isEmpty of ValidationService', () => {
		it('ValidationService.isEmpty(\' \') should be true', () => {
			expect(ValidationService.isEmpty(' ')).to.be.equal(true)
		});
		it('ValidationService.isEmpty(something) should be false', () => {
			expect(ValidationService.isEmpty('something')).to.be.equal(false)
		});
		it('ValidationService.isEmpty() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isEmpty()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	})
	describe('Test method isValidPhoneNumber of ValidationService', () => {
		it('ValidationService.isValidPhoneNumber(08034710032) should be true', () => {
			expect(ValidationService.isValidPhoneNumber('08034710032')).to.be.equal(true)
		});
		it('ValidationService.isValidPhoneNumber(0801387137) should be false', () => {
			expect(ValidationService.isValidPhoneNumber('0801387137')).to.be.equal(false)
		});
		it('ValidationService.isValidPhoneNumber([]) should be false', () => {
			expect(ValidationService.isValidPhoneNumber([])).to.be.equal(false)
		});
		it('ValidationService.isValidPhoneNumber({}) should be false', () => {
			expect(ValidationService.isValidPhoneNumber({})).to.be.equal(false)
		});
		it('ValidationService.isValidPhoneNumber() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isValidPhoneNumber()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	})
	describe('Test method isEmail of ValidationService', () => {
		it('ValidationService.isEmail(mike@gmail.com) should be true', () => {
			expect(ValidationService.isEmail('mike@gmail.com')).to.be.equal(true)
		});
		it('ValidationService.isEmail(mike@mail) should be false', () => {
			expect(ValidationService.isEmail('mike@mail')).to.be.equal(false)
		});
		it('ValidationService.isEmail([]) should be false', () => {
			expect(ValidationService.isEmail([])).to.be.equal(false)
		});
		it('ValidationService.isEmail({}) should be false', () => {
			expect(ValidationService.isEmail({})).to.be.equal(false)
		});
		it('ValidationService.isEmail() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isEmail()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	});
	describe('Test method isAlphanumeric of ValidationService', () => {
		it('ValidationService.isAlphanumeric(123abc) should be true', () => {
			expect(ValidationService.isAlphanumeric('123abc')).to.be.equal(true)
		});
		it('ValidationService.isAlphanumeric(123) should be false', () => {
			expect(ValidationService.isAlphanumeric('123')).to.be.equal(false)
		});
		it('ValidationService.isAlphanumeric([]) should be false', () => {
			expect(ValidationService.isAlphanumeric([])).to.be.equal(false)
		});
		it('ValidationService.isAlphanumeric({}) should be false', () => {
			expect(ValidationService.isAlphanumeric({})).to.be.equal(false)
		});
		it('ValidationService.isAlphanumeric() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isAlphanumeric()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	});
	describe('Test method isValidPassword of ValidationService', () => {
		it('ValidationService.isValidPassword(123A-*abc) should be true', () => {
			expect(ValidationService.isValidPassword('123A-*abc')).to.be.equal(true)
		});
		it('ValidationService.isValidPassword(123abcde) should be false', () => {
			expect(ValidationService.isValidPassword('123abcde')).to.be.equal(false)
		});
		it('ValidationService.isValidPassword({asdf:1233}) should be false', () => {
			expect(ValidationService.isValidPassword({asfd: 1233})).to.be.equal(false)
		});
		it('ValidationService.isValidPassword([]) should be false', () => {
			expect(ValidationService.isValidPassword('[]')).to.be.equal(false)
		});
		it('ValidationService.isValidPassword() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isValidPassword()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	});
	describe('Test method isNumeric of ValidationService', () => {
		it('ValidationService.isNumeric(123) should be true', () => {
			expect(ValidationService.isNumeric('123')).to.be.equal(true)
		});
		it('ValidationService.isNumeric(123.45) should be true', () => {
			expect(ValidationService.isNumeric('123.45')).to.be.equal(true)
		});
		it('ValidationService.isNumeric(123abcde) should be false', () => {
			expect(ValidationService.isNumeric('123abcde')).to.be.equal(false)
		});
		it('ValidationService.isNumeric({}) should be false', () => {
			expect(ValidationService.isNumeric({})).to.be.equal(false)
		});
		it('ValidationService.isNumeric([]) should be false', () => {
			expect(ValidationService.isNumeric([])).to.be.equal(false)
		});
		it('ValidationService.isNumeric() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isNumeric()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	});
	describe('Test method isFloat of ValidationService', () => {
		it('ValidationService.isFloat(123.01) should be true', () => {
			expect(ValidationService.isFloat('123.01')).to.be.equal(true)
		});
		it('ValidationService.isFloat(124.) should be true', () => {
			expect(ValidationService.isFloat('124.')).to.be.equal(true)
		});
		it('ValidationService.isFloat(.124) should be true', () => {
			expect(ValidationService.isFloat('.124')).to.be.equal(true)
		});
		it('ValidationService.isFloat(123) should be false', () => {
			expect(ValidationService.isFloat('123')).to.be.equal(false)
		});
		it('ValidationService.isFloat({}) should be false', () => {
			expect(ValidationService.isFloat({})).to.be.equal(false)
		});
		it('ValidationService.isFloat([]) should be false', () => {
			expect(ValidationService.isFloat([])).to.be.equal(false)
		});
		it('ValidationService.isFloat() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isFloat()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	});
	describe('Test method isAlphabetic of ValidationService', () => {
		it('ValidationService.isAlphabetic(abcdef) should be true', () => {
			expect(ValidationService.isAlphabetic('abcdef')).to.be.equal(true)
		});
		it('ValidationService.isAlphabetic(124eg) should be false', () => {
			expect(ValidationService.isAlphabetic('124eg')).to.be.equal(false)
		});
		it('ValidationService.isAlphabetic(123) should be false', () => {
			expect(ValidationService.isAlphabetic('123')).to.be.equal(false)
		});
		it('ValidationService.isAlphabetic(#@^&) should be false', () => {
			expect(ValidationService.isAlphabetic('#@^&')).to.be.equal(false)
		});
		it('ValidationService.isAlphabetic({}) should be false', () => {
			expect(ValidationService.isAlphabetic({})).to.be.equal(false)
		});
		it('ValidationService.isAlphabetic([]) should be false', () => {
			expect(ValidationService.isAlphabetic([])).to.be.equal(false)
		});
		it('ValidationService.isAlphabetic() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isAlphabetic()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	});
	describe('Test method isString of ValidationService', () => {
		it('ValidationService.isString(abcdef) should be true', () => {
			expect(ValidationService.isString('abcdef')).to.be.equal(true)
		});
		it('ValidationService.isString(124eg) should be true', () => {
			expect(ValidationService.isString('124eg')).to.be.equal(true)
		});
		it('ValidationService.isString(123) should be true', () => {
			expect(ValidationService.isString('123')).to.be.equal(true)
		});
		it('ValidationService.isString([]) should be false', () => {
			expect(ValidationService.isString([])).to.be.equal(false)
		});
		it('ValidationService.isAlphabetic({}) should be false', () => {
			expect(ValidationService.isString({})).to.be.equal(false)
		});
		it('ValidationService.isString() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isString()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	});
	describe('Test method isValidName of ValidationService', () => {
		it('ValidationService.isValidName(Open Palace) should be true', () => {
			expect(ValidationService.isValidName('Open Palace')).to.be.equal(true)
		});
		it('ValidationService.isValidName(Don_jed\'s) should be false', () => {
			expect(ValidationService.isValidName('Don_jed\'s')).to.be.equal(false)
		});
		it('ValidationService.isValidName(Yar\'Adua) should be true', () => {
			expect(ValidationService.isValidName('Yar\'Adua')).to.be.equal(true)
		});
		it('ValidationService.isValidName([]) should be false', () => {
			expect(ValidationService.isValidName([])).to.be.equal(false)
		});
		it('ValidationService.isValidName({}) should be false', () => {
			expect(ValidationService.isValidName({})).to.be.equal(false)
		});
		it('ValidationService.isValidName() to throw SyntaxError(Expect one argument, none found instead)', () => {
			expect(() => { ValidationService.isValidName()}).to.throw(SyntaxError, 'Expect one argument, none found instead')
		});	
	});
})
