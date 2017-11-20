import models from '../models';

/**
 * @description
 * @class UtilityService
 */
class UtilityService {
	/**
	 * Converts the first character of a string to upper case
	 * If an object is passed, the method only convert its string 
	 * propeties
	 * @static
	 * @memberof UtilityService
	 * @param {(Object|String)} attributes The object whose string properties
	 * is or the string to be converted
	 * @param {Boolean} options
	 * Note: options.bool: if true, first character of every word will be
	 * 		 	 capitalize; if false (default), only the first character of the sentence 
	 * 		   will be capitalize
	 *       options.skip: array of words to skip
	 * @returns {(Object|String)} An object with converted string attributes or a 
	 * converted string
	 */
	static upperCaseFirst(attributes, options) {
    	let attr = null;
    	const bool = (options && typeof options.bool !== 'undefined') 
    			  			? options.bool : false;
    	const skip = (options && typeof options.skip !== 'undefined') 
    							? options.skip : [];
		if(typeof attributes === 'object') {
			attr = {};
			for(let key in attributes) {
				if(attributes.hasOwnProperty(key)) {
					if(typeof attributes[key] === 'string') {
						if(bool) {
							const array = attributes[key].split(' ');
							attr[key] = array.map((str) => {
								str = str.toString().trim();
								return (skip.includes(str))
										? str
										: str.charAt(0).toUpperCase() + str.substr(1);
							}).join(' ');
						} else {
							const str = attributes[key].toString().trim()
							attr[key] = (skip.includes(str))
										? str
										: str.charAt(0).toUpperCase() + str.substr(1);
						}
					}
					else attr[key] = attributes[key];
				}
			}
		} else if(typeof attributes === 'string') {
			if(bool) {
				const array = attributes.split(' ');
				attr = array.map((str) => {
					str = str.toString().trim();
					return (skip.includes(str))
							? str 
							: str.charAt(0).toUpperCase() + str.substr(1);
				}).join(' ');
			} else {
				const str = attributes.toString().trim()
				attr = (skip.includes(str)) 
						? str 
						: str.charAt(0).toUpperCase() + str.substr(1);
			}
		}
		else attr = attributes;
		return attr;
	}


	/**
	 * Removes any leading/trialing white space character from object's attributes
	 * @static
	 * @memberof UtilityService
	 * @param {Object} attributes The object with the attributes to trim
	 * @returns {Object} An object with trimed attributes
	 */
	static trimAttributes(attributes) {
	    const trimed = {};
	    for(let key in attributes) {
	        if(attributes[key])
	   			trimed[key] = attributes[key].toString().trim();
	   	}
		return trimed;
	}

	/**
	 * Removes all white space character, if any
	 * @static
	 * @memberof UtilityService
	 * @param {Strng} string The string to remove white space(s)
	 * @param {Boolean} removeAll:  if false, multiple white space will reduced to single;
	 * otherwise all white space(s) will be removed
	 * @returns {Object} An object with trimed attributes
	 */
	static removeWhiteSpace(string, removeAll) {
	 	let all = (typeof removeAll  !== 'undefined') ? removeAll : true ; //set true as default
	 	return (all) ? string.replace(/[ ]+/g, '') : string.replace(/[ ]+/g, ' ')
	}
}

export default UtilityService;