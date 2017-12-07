import services from '../services';
import models from '../models';

const {User} = models,
      {ModelService, ValidationService, UtilityService} = services;

/**
 * @class UserValidations
 */
class UserValidations extends ValidationService {
    /**
     * @description validates user account details
     * @static 
     * @memberof UserValidations
     * @return {function} An express function the handles the validations
     **/
    static validateUser() {
        return (req, res, next) => {

        const {...details} = req.body;
        req.body = details;
        const error = new Error();
        error.code = 400;

        if (req.method === 'POST') {
            if (typeof req.body.username !== 'undefined' 
                && typeof req.body.email !== 'undefined' 
                && typeof req.body.password !== 'undefined') {

                req.body.username = this.removeWhiteSpace(req.body.username);
                req.body.email = this.removeWhiteSpace(req.body.email);
                req.body.password = this.removeWhiteSpace(req.body.password);

                /**
                 * After removing white space(s), check for empty strings
                 * and validate values
                 */
                if (this.isEmpty(req.body.username)) //if username is empty string
                    error.message = 'Username cannot be empty string!';
                
                else if (this.isAlphanumeric(req.body.username)) //if username is valid
                    error.message = 'Username can only contain alphabets only!';
                
                else if (req.body.username.length < 3) //if username is too short
                    error.message = 'Username must be at least 3 characters!';
                
	            //if email is empty or invalid
	            else if (this.isEmpty(req.body.email) || !this.isEmail(req.body.email))
	                error.message = 'Enter a valid email address!';
	        
	            else if (this.isEmpty(req.body.password)) // if password is empty string
	                error.message = 'Password cannot be empty!'
	        
	            else if (req.body.password.length < 8) //if password is too short
	                error.message = 'Password must be at least 8 characters long!';
	        
                if (!this.isValidPassword(req.body.password)) //if valid password
                    error.message = 'Password must containat 1 or more lower and upper case letter, 1 digit (Special charecters can be included)!';	      }
                else if (!req.body.username) //if username is not provided
                    error.message = 'Username is required!';
                
                else if (!req.body.email) // if email is not provided
                    error.message = 'Email is required!'
                
                else if (!req.body.password) // if password is not provided
                    error.message = 'Password is required!';

            } else if (req.method === 'PUT') {

                if (typeof req.body.password !== 'undefined') { 

                    /**
                     * After removing white space(s), check for empty strings
                     * and validate values
                     */
                    req.body.password = this.removeWhiteSpace(req.body.password);

                    if (this.isEmpty(req.body.password))
                        error.message = 'New password cannot be empty!';
                    if (!error.message && req.body.password.length < 8)
                        error.message = 'Password must be at leat at least 8 characters long!';
                    if (!error.message && !this.isValidPassword(req.body.password))
                        error.message = 'Password must containat 1 or more lower and upper case letter, 1 digit (Special charecters can be included)!';
                }
                else error.message = 'New password is required'
            }

            return (error.message) // if error message is set, send error to client
                ? ModelService.errorResponse(res, error) 
                : next();
        }
    }

    /**
     * @description validate if email is unique
     * @static
     * @memberof UserValidations
     * @returns {function} A middleware function that handles the GET request
     */
    static isUniqueEmail() {
  	    return (req, res, next) => {
            if(!req.body.email)
                return next();
            else {
    		    return ModelService.ifExistModelObject(User, {where: {email: req.body.email}})
    		    .then(() => {
    		 		return next();
    		    })
                .catch(error => {
                    ModelService.errorResponse(res, error, 'Email has been used!')
                })
            }
        }
    }

    /**
     * @description validate if username is unique
     * @static
     * @memberof UserValidations
     * @returns {function} A middleware function that handles the GET request
     */
    static isUniqueUsername() {
  	    return (req, res, next) => {
            if(!req.body.username)
                return next();
            else {
                return ModelService
                .ifExistModelObject(User, {where: {username: req.body.username}})
                .then(() => {
    		 		return next();
    		    })
                .catch(error => {
                    ModelService.errorResponse(res, error, 'Username is not available!')
                })
            }
  	    }
    }
}
export default UserValidations;