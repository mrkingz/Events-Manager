import services from '../services';
import models from '../models';

const { Center } = models,
	  {ModelService, ValidationService, UtilityService} = services;

/**
 * @class CenterValidations
 */
class CenterValidations extends ValidationService {
  /**
   * @description validates center details
   * @static 
   * @method validateCenter
   * @memberof CenterValidations
   * @return {function} An express function the handles the validations
   **/
  static validateCenter() {
    return (req, res, next) => {
        const error = new Error();
        error.code = 400;

        if(req.method === 'POST') {
            const bodyObj = req.body;
	        if (bodyObj.name && bodyObj.capicity && bodyObj.price && bodyObj.location && bodyObj.address && bodyObj.description) {

                const {availability, ...details} = req.body;

                req.body.name = this.removeWhiteSpace(details.name, false);
                req.body.capicity = this.removeWhiteSpace(details.capacity);
                req.body.price = this.removeWhiteSpace(details.price);
                req.body.location = this.removeWhiteSpace(details.location);            
                req.body.address = this.removeWhiteSpace(details.address, false);
	            req.body.description = this.removeWhiteSpace(details.description, false);

                /**
                 * After removing white space(s), check for empty strings
                 * and validate values
                 */
                if (this.isEmpty(req.body.name)) //if name is empty string
                    error.message = 'Center name cannot be empty string!';
                
                else if (!this.isValidName(req.body.name)) //if valid center name
                    error.message = 'Center name can only contain letters, numbers and these characters -,\''
                
                else if (this.isEmpty(req.body.capacity)) // if capacity is empty string
                    error.message = 'Capacity cannot be empty!';
 
                else if (!this.isInteger(req.body.capacity)) // if capacity is not an integer
                    error.message = 'Invalid entry for capacity, must be an integer!';
                    
                else if (this.isEmpty(req.body.price)) // if price is empty string
                    error.message = 'Price cannot be empty!';

                else if (!this.isValidCurrency(req.body.price)) // if price is not numeric
                    error.message = 'Invalid entry for price, must be numeric!';

                else if (this.isEmpty(req.body.location)) // if Location is empty string
                    error.message = 'Location cannot be empty!';  

                else if (!this.isAlphabetic(req.body.location)) // if Location is not a string
                    error.message = 'Invalid entry for location, must be in word(s)!';  

                else if (this.isEmpty(req.body.address)) // if address is empty string
                    error.message = 'Address cannot be empty!';

                else if (!this.isString(req.body.address)) // if address is empty string
                    error.message = 'Inavlid entry for address, must be in word(s)!';

                else if (this.isEmpty(req.body.description)) //if description is empty
                    error.message = 'Description cannot be empty!';
                
                else if (!this.isString(req.body.description)) //if instructions is numeric
                    error.message = 'Please, enter a valid description!'
                
                else if (!this.isString(req.body.ingredients)) //if ingredients is numeric
                    error.message = 'Not a valid list of ingredients!';

            } else if (!req.body.name) //if name is not provided
                    error.message = 'Name is required!';
            
                else if (!req.body.capacity) // if capacity is not provided
                    error.message = 'Capacity is required!';

                else if (!req.body.price) // if price is not provided
                    error.message = 'Price is required!';

                else if (!req.body.location) // if location is not provided
                    error.message = 'Location is required!';
                    
                else if (!req.body.address) // if address is not provided
                    error.message = 'Address is required!'

                else if (!req.body.description) // if description is not provided
                    error.message = 'Description is required!';

            } else if (req.method === 'PUT') {

                if(typeof req.body.name !== 'undefined') { 
                    if (this.isEmpty(req.body.name))
                        error.message = 'Name cannot be empty!';

                    else if (!this.isValidName(req.body.name))
                        error.message = 'Center name can only contain letters, numbers and these characters -,\''

                } 
                if (!error.message && typeof req.body.capacity != 'undefined') { 
                    if (this.isEmpty(req.body.capacity))
                        error.message = 'Capacity cannot be empty!';

                    else if (!this.isInteger(req.body.capacity))
                        error.message =  'Invalid entry for capacity, must be an integer!';

                } 
                if (!error.message && typeof req.body.price !== 'undefined') {
                    if (this.isEmpty(req.body.price))
                        error.message = 'Price cannot bet empty!';

                    else if (!this.isValidCurrency(req.body.price))
                        error.message = 'Invalid entry for price, must be numeric!';

                }
                if (!error.message && typeof req.body.location !== 'undefined') {
                    if (this.isEmpty(req.body.location))
                        error.message = 'Location cannot bet empty!';

                    else if (!this.isAlphabetic(req.body.location))
                        error.message = 'Location can only contain letter!';

                } 
                if (!error.message && typeof req.body.address !== 'undefined') {
                    if (this.isEmpty(req.body.address))
                        error.message = 'Address cannot bet empty!';

                    else if (!this.isString(req.body.address))
                        error.message = 'Invalid entry for address, must be in word(s)!';

                }
                if (!error.message && typeof req.body.description !== 'undefined') {
                    if (this.isEmpty(req.body.description))
                        error.message = 'Description cannot bet empty!';

                    else if (!this.isString(req.body.description))
                        error.message = 'Invalid entry for address, must be in word(s)!';
                }
                if (!error.message && typeof req.body.availability !== 'undefined') {
                    if (this.isEmpty(req.body.availability))
                       error.message = 'Availability cannot bet empty!';

                     else if (!this.isBoolean(req.body.availability))
                         error.message = 'Please, enter true or false for availability';
                }
            }

            return (error.message) // if error message is set, send error to client
                ? ModelService.errorResponse(res, error) 
                : next();
        }
    }

    /**
     * @description validate if center already exist
     * @static
     * @isExistCenter
     * @memberof CenterValidations
     * @returns {function} A middleware function that handles the validations
     */
    static ifExistCenter() {
  	    return (req, res, next) => {
              
  		    if (!req.body.name)
  			    return next();
  		    else {
                req.body = this.upperCaseFirst(req.body, {bool: true});                 
	  		    return ModelService.ifExistModelObject(Center, {
                    where: {
                        userId: req.body.user.userId,
                        name: req.body.name,
                        location: req.body.location
                    },
                    message: `${Center.name} name already exist!`
                })
                .then(() => {
                    return next();
                })
                .catch(error => {
                    ModelService.errorResponse(res, error)
                })
  		    }
  	    }
    }
}
export default CenterValidations;