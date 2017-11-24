'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _ValidationService = require('../../services/ValidationService');

var _ValidationService2 = _interopRequireDefault(_ValidationService);

var _app = require('../../app.js');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect,
    server = _supertest2.default.agent(_app2.default);

describe('Test class ValidationService', function () {
	describe('Test method isInteger of ValidationService', function () {
		it('ValidationService.isInteger(1) should be true', function () {
			expect(_ValidationService2.default.isInteger(1)).to.be.equal(true);
		});
		it('ValidationService.isInteger(1.2) should be false', function () {
			expect(_ValidationService2.default.isInteger('1.2')).to.be.equal(false);
		});
		it('ValidationService.isInteger([]) should be false', function () {
			expect(_ValidationService2.default.isInteger([])).to.be.equal(false);
		});
		it('ValidationService.isInteger({}) should be false', function () {
			expect(_ValidationService2.default.isInteger({})).to.be.equal(false);
		});
		it('ValidationService.isInteger() to throw Error(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isInteger();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isEmpty of ValidationService', function () {
		it('ValidationService.isEmpty(\' \') should be true', function () {
			expect(_ValidationService2.default.isEmpty(' ')).to.be.equal(true);
		});
		it('ValidationService.isEmpty(something) should be false', function () {
			expect(_ValidationService2.default.isEmpty('something')).to.be.equal(false);
		});
		it('ValidationService.isEmpty() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isEmpty();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isValidPhoneNumber of ValidationService', function () {
		it('ValidationService.isValidPhoneNumber(08034710032) should be true', function () {
			expect(_ValidationService2.default.isValidPhoneNumber('08034710032')).to.be.equal(true);
		});
		it('ValidationService.isValidPhoneNumber(0801387137) should be false', function () {
			expect(_ValidationService2.default.isValidPhoneNumber('0801387137')).to.be.equal(false);
		});
		it('ValidationService.isValidPhoneNumber([]) should be false', function () {
			expect(_ValidationService2.default.isValidPhoneNumber([])).to.be.equal(false);
		});
		it('ValidationService.isValidPhoneNumber({}) should be false', function () {
			expect(_ValidationService2.default.isValidPhoneNumber({})).to.be.equal(false);
		});
		it('ValidationService.isValidPhoneNumber() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isValidPhoneNumber();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isEmail of ValidationService', function () {
		it('ValidationService.isEmail(mike@gmail.com) should be true', function () {
			expect(_ValidationService2.default.isEmail('mike@gmail.com')).to.be.equal(true);
		});
		it('ValidationService.isEmail(mike@mail) should be false', function () {
			expect(_ValidationService2.default.isEmail('mike@mail')).to.be.equal(false);
		});
		it('ValidationService.isEmail([]) should be false', function () {
			expect(_ValidationService2.default.isEmail([])).to.be.equal(false);
		});
		it('ValidationService.isEmail({}) should be false', function () {
			expect(_ValidationService2.default.isEmail({})).to.be.equal(false);
		});
		it('ValidationService.isEmail() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isEmail();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isAlphanumeric of ValidationService', function () {
		it('ValidationService.isAlphanumeric(123abc) should be true', function () {
			expect(_ValidationService2.default.isAlphanumeric('123abc')).to.be.equal(true);
		});
		it('ValidationService.isAlphanumeric(123) should be false', function () {
			expect(_ValidationService2.default.isAlphanumeric('123')).to.be.equal(false);
		});
		it('ValidationService.isAlphanumeric([]) should be false', function () {
			expect(_ValidationService2.default.isAlphanumeric([])).to.be.equal(false);
		});
		it('ValidationService.isAlphanumeric({}) should be false', function () {
			expect(_ValidationService2.default.isAlphanumeric({})).to.be.equal(false);
		});
		it('ValidationService.isAlphanumeric() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isAlphanumeric();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isValidPassword of ValidationService', function () {
		it('ValidationService.isValidPassword(123A-*abc) should be true', function () {
			expect(_ValidationService2.default.isValidPassword('123A-*abc')).to.be.equal(true);
		});
		it('ValidationService.isValidPassword(123abcde) should be false', function () {
			expect(_ValidationService2.default.isValidPassword('123abcde')).to.be.equal(false);
		});
		it('ValidationService.isValidPassword({asdf:1233}) should be false', function () {
			expect(_ValidationService2.default.isValidPassword({ asfd: 1233 })).to.be.equal(false);
		});
		it('ValidationService.isValidPassword([]) should be false', function () {
			expect(_ValidationService2.default.isValidPassword('[]')).to.be.equal(false);
		});
		it('ValidationService.isValidPassword() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isValidPassword();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isNumeric of ValidationService', function () {
		it('ValidationService.isNumeric(123) should be true', function () {
			expect(_ValidationService2.default.isNumeric('123')).to.be.equal(true);
		});
		it('ValidationService.isNumeric(123.45) should be true', function () {
			expect(_ValidationService2.default.isNumeric('123.45')).to.be.equal(true);
		});
		it('ValidationService.isNumeric(123abcde) should be false', function () {
			expect(_ValidationService2.default.isNumeric('123abcde')).to.be.equal(false);
		});
		it('ValidationService.isNumeric({}) should be false', function () {
			expect(_ValidationService2.default.isNumeric({})).to.be.equal(false);
		});
		it('ValidationService.isNumeric([]) should be false', function () {
			expect(_ValidationService2.default.isNumeric([])).to.be.equal(false);
		});
		it('ValidationService.isNumeric() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isNumeric();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isFloat of ValidationService', function () {
		it('ValidationService.isFloat(123.01) should be true', function () {
			expect(_ValidationService2.default.isFloat('123.01')).to.be.equal(true);
		});
		it('ValidationService.isFloat(124.) should be true', function () {
			expect(_ValidationService2.default.isFloat('124.')).to.be.equal(true);
		});
		it('ValidationService.isFloat(.124) should be true', function () {
			expect(_ValidationService2.default.isFloat('.124')).to.be.equal(true);
		});
		it('ValidationService.isFloat(123) should be false', function () {
			expect(_ValidationService2.default.isFloat('123')).to.be.equal(false);
		});
		it('ValidationService.isFloat({}) should be false', function () {
			expect(_ValidationService2.default.isFloat({})).to.be.equal(false);
		});
		it('ValidationService.isFloat([]) should be false', function () {
			expect(_ValidationService2.default.isFloat([])).to.be.equal(false);
		});
		it('ValidationService.isFloat() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isFloat();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isAlphabetic of ValidationService', function () {
		it('ValidationService.isAlphabetic(abcdef) should be true', function () {
			expect(_ValidationService2.default.isAlphabetic('abcdef')).to.be.equal(true);
		});
		it('ValidationService.isAlphabetic(124eg) should be false', function () {
			expect(_ValidationService2.default.isAlphabetic('124eg')).to.be.equal(false);
		});
		it('ValidationService.isAlphabetic(123) should be false', function () {
			expect(_ValidationService2.default.isAlphabetic('123')).to.be.equal(false);
		});
		it('ValidationService.isAlphabetic(#@^&) should be false', function () {
			expect(_ValidationService2.default.isAlphabetic('#@^&')).to.be.equal(false);
		});
		it('ValidationService.isAlphabetic({}) should be false', function () {
			expect(_ValidationService2.default.isAlphabetic({})).to.be.equal(false);
		});
		it('ValidationService.isAlphabetic([]) should be false', function () {
			expect(_ValidationService2.default.isAlphabetic([])).to.be.equal(false);
		});
		it('ValidationService.isAlphabetic() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isAlphabetic();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isString of ValidationService', function () {
		it('ValidationService.isString(abcdef) should be true', function () {
			expect(_ValidationService2.default.isString('abcdef')).to.be.equal(true);
		});
		it('ValidationService.isString(124eg) should be true', function () {
			expect(_ValidationService2.default.isString('124eg')).to.be.equal(true);
		});
		it('ValidationService.isString(123) should be true', function () {
			expect(_ValidationService2.default.isString('123')).to.be.equal(true);
		});
		it('ValidationService.isString([]) should be false', function () {
			expect(_ValidationService2.default.isString([])).to.be.equal(false);
		});
		it('ValidationService.isAlphabetic({}) should be false', function () {
			expect(_ValidationService2.default.isString({})).to.be.equal(false);
		});
		it('ValidationService.isString() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isString();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
	describe('Test method isValidName of ValidationService', function () {
		it('ValidationService.isValidName(Open Palace) should be true', function () {
			expect(_ValidationService2.default.isValidName('Open Palace')).to.be.equal(true);
		});
		it('ValidationService.isValidName(Don_jed\'s) should be false', function () {
			expect(_ValidationService2.default.isValidName('Don_jed\'s')).to.be.equal(false);
		});
		it('ValidationService.isValidName(Yar\'Adua) should be true', function () {
			expect(_ValidationService2.default.isValidName('Yar\'Adua')).to.be.equal(true);
		});
		it('ValidationService.isValidName([]) should be false', function () {
			expect(_ValidationService2.default.isValidName([])).to.be.equal(false);
		});
		it('ValidationService.isValidName({}) should be false', function () {
			expect(_ValidationService2.default.isValidName({})).to.be.equal(false);
		});
		it('ValidationService.isValidName() to throw SyntaxError(Expect one argument, none found instead)', function () {
			expect(function () {
				_ValidationService2.default.isValidName();
			}).to.throw(SyntaxError, 'Expect one argument, none found instead');
		});
	});
});