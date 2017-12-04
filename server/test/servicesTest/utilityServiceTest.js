import chai from 'chai';
import UtilityService from '../../services/utilityService';

const expect = chai.expect;

describe('Test class UtilityService', () => {
	describe('Test method removeWhiteSpace of UtilityService', () => {
		it('UtilityService.removeWhiteSpace(\' Continental\') should equal', () => {
			expect(UtilityService.removeWhiteSpace(' Continental')).to.equal('Continental')
		});
		it('UtilityService.removeWhiteSpace(\' Continental    Center\', false) should equal', () => {
			expect(UtilityService.removeWhiteSpace('Continental    Center', false))
			.to.equal('Continental Center')
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
		const center = UtilityService.upperCaseFirst({name: 'continental center'});
		it('UtilityService.upperCaseFirst({'
			+'name: \'continental center\''
		  +'}) should should capitalize the first character of the value of name', () => {
			expect(center).to.be.an('object');
			expect(center).to.have.own.property('name').to.be.a('string')
			.that.is.equal('Continental center');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		const center = UtilityService.upperCaseFirst({
			name: 'continental center'}, {bool: true});
		it('UtilityService.upperCaseFirst({'
			+'name: \'continental center\''
		  +'}, {bool: true}) should capitalize the first character of every word', () => {
			expect(center).to.be.an('object');
			expect(center).to.have.own.property('name').to.be.a('string')
			.that.is.equal('Continental Center');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		let name = 'continental center';
		name = UtilityService.upperCaseFirst(name)
		it('UtilityService.upperCaseFirst(\'continental center\''
		  +') should capitalize the first character in the string argument', () => {
			expect(name).to.be.a('string');
			expect(name).to.be.equal('Continental center');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		let name = 'continental center';
		name = UtilityService.upperCaseFirst(name, {bool: true})
		it('UtilityService.upperCaseFirst(\'continental name\''
		  +', {bool: true}) should capitalize the first character of every word in the string argument', () => {
			expect(name).to.be.a('string');
			expect(name).to.be.equal('Continental Center');
		});
	})
	describe('Test method upperCaseFirst of UtilityService', () => {
		const recipe = UtilityService.upperCaseFirst({
			title: 'Stella Odua and Azeez'}, 
			{bool: true, skip: ['and']
		});
		it('UtilityService.upperCaseFirst({'
			+'title: \'Stella Odua and Azeez\'}, {bool: true, skip: [\'and\']})'
			+' should capitalize the first character of every word in the value of title'
			+'excluding the string in the array', () => {
			expect(recipe).to.be.an('object');
			expect(recipe).to.have.own.property('title').to.be.a('string')
			.that.is.equal('Stella Odua and Azeez');
		});
	})
})