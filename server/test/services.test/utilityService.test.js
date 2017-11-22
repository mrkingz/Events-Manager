import chai from 'chai';
import UtilityService from '../../services/UtilityService';

const expect = chai.expect;

describe('Test class UtilityService', () => {
	describe('Test method removeWhiteSpace of UtilityService', () => {
		it('UtilityService.removeWhiteSpace(\' Continental\') should equal', () => {
			expect(UtilityService.removeWhiteSpace(' Continental')).to.equal('Continental')
		});
		it('UtilityService.removeWhiteSpace(\' Continental    Recipes\', false) should equal', () => {
			expect(UtilityService.removeWhiteSpace('Continental    Recipes', false))
			.to.equal('Continental Recipes')
		});
		it('UtilityService.removeWhiteSpace(\' Continentals \', true) should equal', () => {
			expect(UtilityService.removeWhiteSpace(' Continentals ', true))
			.to.equal('Continentals')
		});
	})
	describe('Test method trimAttributes of UtilityService', () => {
		const user = UtilityService.trimAttributes({
			firstname: ' John',
			lastname: ' Okon ', 
			email: 'something@gmail.com'
		});
		it('UtilityService.trimAttributes({'
			+'firstanme: \' John  \','
			+'lastanme: \' Okon  \','
			+'email: \'something@gmail.com\' ,'
		  +'}) should remove trailing  and leading white spaces from the object string property', () => {
			expect(user).to.be.an('object');
			expect(user).to.have.own.property('firstname').to.be.a('string')
			.that.is.equal('John');
			expect(user).to.have.own.property('lastname').to.be.a('string')
			.that.is.equal('Okon');
			expect(user).to.have.own.property('email').to.be.a('string')
			.that.is.equal('something@gmail.com');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		const category = UtilityService.upperCaseFirst({categoryTitle: 'continental recipes'});
		it('UtilityService.upperCaseFirst({'
			+'categoryTitle: \'continental recipes\''
		  +'}) should should capitalize the first character of the value of categoryTitle', () => {
			expect(category).to.be.an('object');
			expect(category).to.have.own.property('categoryTitle').to.be.a('string')
			.that.is.equal('Continental recipes');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		const category = UtilityService.upperCaseFirst({
			categoryTitle: 'continental recipes'}, {bool: true});
		it('UtilityService.upperCaseFirst({'
			+'categoryTitle: \'continental recipes\''
		  +'}, {bool: true}) should capitalize the first character of every word in the value of categoryTitle', () => {
			expect(category).to.be.an('object');
			expect(category).to.have.own.property('categoryTitle').to.be.a('string')
			.that.is.equal('Continental Recipes');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		let categoryTitle = 'continental recipes';
		categoryTitle = UtilityService.upperCaseFirst(categoryTitle)
		it('UtilityService.upperCaseFirst(\'continental recipes\''
		  +') should capitalize the first character in the string argument', () => {
			expect(categoryTitle).to.be.a('string');
			expect(categoryTitle).to.be.equal('Continental recipes');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		let categoryTitle = 'continental recipes';
		categoryTitle = UtilityService.upperCaseFirst(categoryTitle, {bool: true})
		it('UtilityService.upperCaseFirst(\'continental recipes\''
		  +', {bool: true}) should capitalize the first character of every word in the string argument', () => {
			expect(categoryTitle).to.be.a('string');
			expect(categoryTitle).to.be.equal('Continental Recipes');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		const recipe = UtilityService.upperCaseFirst({
			title: 'fried rice and chicken'}, 
			{bool: true, skip: ['and']
		});
		it('UtilityService.upperCaseFirst({'
			+'title: \'fruits and vegetables\'}, {bool: true, skip: [\'and\']})'
			+' should capitalize the first character of every word in the value of title'
			+'excluding the string in the array', () => {
			expect(recipe).to.be.an('object');
			expect(recipe).to.have.own.property('title').to.be.a('string')
			.that.is.equal('Fried Rice and Chicken');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		let categoryTitle = 'fruits and vegetables';
		categoryTitle = UtilityService.upperCaseFirst(categoryTitle, {bool: true, skip: ['and']})
		it('UtilityService.upperCaseFirst(\'fruits and vegetables\''
		  +', {bool: true}) should capitalize the first character of every word in the string argument,'
		  +' excluding the string the in array', () => {
			expect(categoryTitle).to.be.a('string');
			expect(categoryTitle).to.be.equal('Fruits and Vegetables');
		});
	})
})