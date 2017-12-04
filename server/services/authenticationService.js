import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config';
import ModelService from './modelService';

/**
 * @description 
 * @class AuthenticationService
 */
class AuthenticationService {
	/** 
	 * @description Generates a JSON Web Token for authentication
	 * @memberof AuthenticationService
	 * @static
	 * @param {Object} credentials Object of the user credentials
	 * @param {String} secret
	 * @returns {Promise.object} A promise that resolves with 
	 * a json web token or rejects with an error
	 */
	static generateJWT(credentials, secret) {
		 return new Promise((resolve, reject) => {
		 	const options = {
		 		issuer: process.env.ISSUER,
		 		subject: process.env.SUBJECT,
		 		expiresIn: process.env.EXPIRATION
		 	};

			return jwt.sign(credentials, secret, options, (error, token) => {
				if(error) {	
					const error = new Error()
					const msg = 'Could not generate token';
					return reject(ModelService.refactorError(msg, error));
				}
				else return resolve(token);
			})
	  	});
	}

	/** 
	 * @description Verifies a JSON Web Token's signature and returns the payload
	 * @memberof AuthenticationService
	 * @static
	 * @param {String} token the token to verify 
	 * @param {String} secreteKey the secrete key 
	 * @returns {Object} An object that contains the decoded payload
	 */
	static decodeJWT(token, secretKey) {
		let decoded;
		try {
			const options = {
				issuer: process.env.ISSUER,
				//maxAge: process.env.MAX_AGE
			};
			const decoded = jwt.verify(token, secretKey, options);
			if(decoded)
				return Promise.resolve(decoded);
		}
		catch(error) {
			error.code = 401;
			if (error.message === 'jwt expired')
				error.message = 'Sorry, your token has expired. Please signin...';
			else 
				error.message = 'Access denied! Invalid authentication token provided';

			return Promise.reject(error);
		}
	}
}
export default AuthenticationService;