import UtilityService from './utilityService';
import ModelService from './modelService';
const syntaxError  = new SyntaxError('Expect one argument, none found instead')

/**
 * @description 
 * @class ValidationService
 */
class ValidationService extends UtilityService {
	/**
	 * @description Validates if param is a valid resource identfifier
	 * Note: this method only validate for a number param
	 * @method IsValidInetgerURI
	 * @static
	 * @memberof ValidationService
	 * @returns {function} A middleware function thhat handles the validation
	 */
	static isValidIntegerURI() {
		return (req, res, next) => {
			let params = req.params;
			let value;
			for(let key in params) {
				if(params[key] < 1 || !this.isInteger(params[key])) {
					value = params[key];
					break;
				}
			}

			if(value) {
				const error = new Error();
				error.code = 400;
				error.message = `${value}, is not a valid resource identifier`;
			    ModelService.errorResponse(res, error);
			}
			else return next();
		}
	}

	/**
	 * @description Validates it is an empty string
	 * @static isEmpty
	 * @memberof ValidationService
	 * @param {String} str The string to validate
	 * @returns {Boolean} true, if str is not empty; false, if otherwise
	 */
	static isEmpty(str) {
		if(typeof str == 'undefined')
			throw syntaxError;
		else return (str.match(/^[ ]+$/) || str.length === 0) ? true : false;
	}

	/**
	 * @description Validates if an imput is a number
	 * @method isInteger
	 * @memberof ValidationService
	 * @param {string} value
	 * @returns {boolean} true if value is a Integer; false, if otherwise
	 */
	static isInteger(value) {
		if(typeof value == 'undefined')
			throw syntaxError;
		else return (value.toString().match(/^[0-9]+$/)) ? true : false;
	}


	/**
	 * @description Validates phone number
	 * @method isValidPhoneNumber
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is a valid phone number; false, if otherwise
	 */
	static isValidPhoneNumber(str) {
		if(typeof str == 'undefined')
			throw syntaxError;
		else {
    		const exp = /(^([\+]{1}[1-9]{1,3}|[0]{1})[7-9]{1}[0-1]{1}[0-9]{8})$/
			return str.toString().match(exp) ? true : false;
		}
	}

	/**
	 * @description Validates email address
	 * @method isEmail
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is a valid email; false, if otherwise
	 */
	static isEmail(str)
	{
		if(typeof str == 'undefined')
			throw syntaxError;
		else {
			str = str === null ? ' ' : str;
			const exp = /([a-zA-Z0-9_\-.]+)@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9]+\.)+))([a-zA-Z]{2,4}|[0-9]{1.3})/
			return (str.toString().match(exp)) ? true : false;
		}
	}

	/**
	 * @description Validates if a string is alphanumeric
	 * @method isAlphanumeric
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is alphanumeric; false, if otherwise
	 */
	static isAlphanumeric(str) {
		if(typeof str == 'undefined')
			throw syntaxError;
		else {
		  	const exp = /^([a-zA-Z]+[0-9])|([0-9]+[a-zA-Z]+)|([a-zA-Z]+[0-9]+[a-zA-Z]+)$/;
	 	  	return (str.toString().match(exp)) ? true : false;
		}
	}

	/**
	 * @description Validates password
	 * @method isValidPassword
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is valid password; false, if otherwise
	 */
	static isValidPassword(str) {
		if(typeof str == 'undefined')
			throw syntaxError;
		else {
	  	const exp = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])).{8,30}$/;
	 		return (str.toString().match(exp)) ? true : false;
	 	}
	}

	/**
	 * @description Validates currency amount
	 * @method isValidCurrency
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is numeric; false, if otherwise
	 */
	static isValidCurrency(str) {
		if(typeof str == 'undefined')
			throw syntaxError
		else {
			str = this.removeWhiteSpace(str.replace(',', ''));
		 	return (this.isNumeric(str))? true : false;
		}
	}

	/**
	 * @description Validates if a string is numeric
	 * @method isNumeric
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is numeric; false, if otherwise
	 */
	static isNumeric(str) {
		if(typeof str == 'undefined')
			throw syntaxError
	    else return (this.isInteger(str) || this.isFloat(str)) ? true : false;
	}

	/**
	 * @description Validates if a string is float
	 * @method isFloat
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is float; false, if otherwise
	 */
	static isFloat(str) {
		if(typeof str == 'undefined')
			throw syntaxError;
		else if(isNaN(Number(str)))
		  	return false
		else return str.toString().match(/(^[0-9]*[.]{1}[0-9]*$)/) ? true : false;
  	}

	/**
	 * @description Validates if a string is alphabet
	 * @method isAlphabetic
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is alphabet; false, if otherwise
	 */
	static isAlphabetic(str) {
		if(typeof str == 'undefined')
			throw syntaxError;
		else return (str.toString().match(/^[a-zA-Z\s]+$/)) ? true : false;
	}

	/**
	 * @description Validates if a value is string
	 * @method isString
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is string; false, if otherwise
	 */
	static isString(str) {
		if(typeof str == 'undefined')
			throw syntaxError;
	  	else return (str.constructor === String) ? true : false;
	}

	/**
	 * @description Validates center name and event title.
	 * Note: name can only contain letters, hyphen and apostrophy and a period
	 * @method isValidName
	 * @memberof ValidationService
	 * @param {string} str
	 * @returns {boolean} true if str is string; false, if otherwise
	 */
	static isValidName(str) {
		if(typeof str == 'undefined')
			throw syntaxError;
		else {
		  const exp = /^[a-zA-Z0-9-.'\s]+$/;
	 	  return (str.toString().match(exp)) ? true : false;
		}
	}
} 

export default ValidationService;