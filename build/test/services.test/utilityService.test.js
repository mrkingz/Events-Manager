'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _UtilityService = require('../../services/UtilityService');

var _UtilityService2 = _interopRequireDefault(_UtilityService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

describe('Test class UtilityService', function () {
	describe('Test method removeWhiteSpace of UtilityService', function () {
		it('UtilityService.removeWhiteSpace(\' Continental\') should equal', function () {
			expect(_UtilityService2.default.removeWhiteSpace(' Continental')).to.equal('Continental');
		});
		it('UtilityService.removeWhiteSpace(\' Continental    Recipes\', false) should equal', function () {
			expect(_UtilityService2.default.removeWhiteSpace('Continental    Recipes', false)).to.equal('Continental Recipes');
		});
		it('UtilityService.removeWhiteSpace(\' Continentals \', true) should equal', function () {
			expect(_UtilityService2.default.removeWhiteSpace(' Continentals ', true)).to.equal('Continentals');
		});
	});
	describe('Test method trimAttributes of UtilityService', function () {
		var user = _UtilityService2.default.trimAttributes({
			firstname: ' John',
			lastname: ' Okon ',
			email: 'something@gmail.com'
		});
		it('UtilityService.trimAttributes({' + 'firstanme: \' John  \',' + 'lastanme: \' Okon  \',' + 'email: \'something@gmail.com\' ,' + '}) should remove trailing  and leading white spaces from the object string property', function () {
			expect(user).to.be.an('object');
			expect(user).to.have.own.property('firstname').to.be.a('string').that.is.equal('John');
			expect(user).to.have.own.property('lastname').to.be.a('string').that.is.equal('Okon');
			expect(user).to.have.own.property('email').to.be.a('string').that.is.equal('something@gmail.com');
		});
	});
	describe('Test method upperCaseFirst of UtilityService', function () {
		var category = _UtilityService2.default.upperCaseFirst({ categoryTitle: 'continental recipes' });
		it('UtilityService.upperCaseFirst({' + 'categoryTitle: \'continental recipes\'' + '}) should should capitalize the first character of the value of categoryTitle', function () {
			expect(category).to.be.an('object');
			expect(category).to.have.own.property('categoryTitle').to.be.a('string').that.is.equal('Continental recipes');
		});
	});
	describe('Test method upperCaseFirst of UtilityService', function () {
		var category = _UtilityService2.default.upperCaseFirst({
			categoryTitle: 'continental recipes' }, { bool: true });
		it('UtilityService.upperCaseFirst({' + 'categoryTitle: \'continental recipes\'' + '}, {bool: true}) should capitalize the first character of every word in the value of categoryTitle', function () {
			expect(category).to.be.an('object');
			expect(category).to.have.own.property('categoryTitle').to.be.a('string').that.is.equal('Continental Recipes');
		});
	});
	describe('Test method upperCaseFirst of UtilityService', function () {
		var categoryTitle = 'continental recipes';
		categoryTitle = _UtilityService2.default.upperCaseFirst(categoryTitle);
		it('UtilityService.upperCaseFirst(\'continental recipes\'' + ') should capitalize the first character in the string argument', function () {
			expect(categoryTitle).to.be.a('string');
			expect(categoryTitle).to.be.equal('Continental recipes');
		});
	});
	describe('Test method upperCaseFirst of UtilityService', function () {
		var categoryTitle = 'continental recipes';
		categoryTitle = _UtilityService2.default.upperCaseFirst(categoryTitle, { bool: true });
		it('UtilityService.upperCaseFirst(\'continental recipes\'' + ', {bool: true}) should capitalize the first character of every word in the string argument', function () {
			expect(categoryTitle).to.be.a('string');
			expect(categoryTitle).to.be.equal('Continental Recipes');
		});
	});
	describe('Test method upperCaseFirst of UtilityService', function () {
		var recipe = _UtilityService2.default.upperCaseFirst({
			title: 'fried rice and chicken' }, { bool: true, skip: ['and']
		});
		it('UtilityService.upperCaseFirst({' + 'title: \'fruits and vegetables\'}, {bool: true, skip: [\'and\']})' + ' should capitalize the first character of every word in the value of title' + 'excluding the string in the array', function () {
			expect(recipe).to.be.an('object');
			expect(recipe).to.have.own.property('title').to.be.a('string').that.is.equal('Fried Rice and Chicken');
		});
	});
	describe('Test method upperCaseFirst of UtilityService', function () {
		var categoryTitle = 'fruits and vegetables';
		categoryTitle = _UtilityService2.default.upperCaseFirst(categoryTitle, { bool: true, skip: ['and'] });
		it('UtilityService.upperCaseFirst(\'fruits and vegetables\'' + ', {bool: true}) should capitalize the first character of every word in the string argument,' + ' excluding the string the in array', function () {
			expect(categoryTitle).to.be.a('string');
			expect(categoryTitle).to.be.equal('Fruits and Vegetables');
		});
	});
});