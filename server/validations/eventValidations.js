import services from '../services';
import models from '../models';

const { Center, Event } = models,
	  {ModelService, ValidationService, UtilityService} = services;

/**
 * @class EventValidations
 */
class EventValidations extends ValidationService {
  /**
   * @description validates event details
   * @static 
   * @method validateEvent
   * @memberof EventValidations
   * @return {function} An express function the handles the validations
   **/
  static validateEvent() {
    return (req, res, next) => {
        const error = new Error();
        error.code = 400;

        if(req.method === 'POST') {
            const bodyObj = req.body;
	        if (bodyObj.title && bodyObj.centerId && bodyObj.date && bodyObj.time && bodyObj.estimatedGuests && bodyObj.description) {

                req.body.title = this.removeWhiteSpace(bodyObj.title, false);
                req.body.centerId = this.removeWhiteSpace(bodyObj.centerId);
                req.body.date = this.removeWhiteSpace(bodyObj.date);
                req.body.time = this.removeWhiteSpace(bodyObj.time);            
                req.body.estimatedGuests = this.removeWhiteSpace(bodyObj.estimatedGuests);
	            req.body.description = this.removeWhiteSpace(bodyObj.description, false);

                /**
                 * After removing white space(s), check for empty strings
                 * and validate values
                 */
                if (this.isEmpty(req.body.title)) //if title is empty
                    error.message = 'Event title cannot be empty string!';
                
                else if (!this.isValidName(req.body.title)) //if valid event title
                    error.message = 'Event title can only contain letters, numbers and these characters -,\''
                
                else if (this.isEmpty(req.body.centerId)) // if center is not specified
                    error.message = 'Proposed center not specified. Please, select a center.';
 
                else if (!this.isInteger(req.body.centerId)) // if centerId is not an integer
                    error.message = 'Invalid entry for centerId, must be an integer!';
                    
                else if (this.isEmpty(req.body.date)) // if date is empty
                    error.message = 'Date cannot be empty!';

                else if (this.isEmpty(req.body.time)) // if time is empty
                    error.message = 'time cannot be empty!';  

                else if (this.isEmpty(req.body.estimatedGuests)) // if estimatedGuests is empty
                    error.message = 'Address cannot be empty!';

                else if (!this.isInteger(req.body.estimatedGuests)) // if address is empty string
                    error.message = 'Number of estimated guests must be an integer value';

                else if (this.isEmpty(req.body.description)) //if description is empty
                    error.message = 'Description cannot be empty!';
                
                else if (!this.isString(req.body.description))
                    error.message = 'Please, enter a valid description!'

            } else if (!req.body.title) //if name is not provided
                    error.message = 'Event Title is required!';
            
                else if (!req.body.centerId) // if capacity is not provided
                    error.message = 'Proposed center is required!';

                else if (!req.body.date) // if date is not provided
                    error.message = 'Date is required!';

                else if (!req.body.time) // if time is not provided
                    error.message = 'Time is required!';
                    
                else if (!req.body.estimatedGuests) // if estimated guests is not provided
                    error.message = 'Number of estimated guests is required!'

                else if (!req.body.description) // if description is not provided
                    error.message = 'Description is required!';

            } else if (req.method === 'PUT') {

                if(typeof req.body.title !== 'undefined') { 
                    if (this.isEmpty(req.body.title))
                        error.message = 'Event title cannot be empty!';

                    else if (!this.isValidName(req.body.title))
                        error.message = 'Event title can only contain letters, numbers and these characters -,\''

                } 
                if (!error.message && typeof req.body.centerId != 'undefined') { 
                    if (this.isEmpty(req.body.centerId))
                        error.message = 'Proposed center not specified. Please, select a center.';

                    else if (!this.isInteger(req.body.centerId))
                        error.message =  'Invalid entry for centerId, must be an integer!';

                } 
                if (!error.message && typeof req.body.date !== 'undefined') {
                    if (this.isEmpty(req.body.date))
                        error.message = 'Date cannot be empty!';
                }
                if (!error.message && typeof req.body.time !== 'undefined') {
                    if (this.isEmpty(req.body.time))
                        error.message = 'Time cannot be empty!';
                } 
                if (!error.message && typeof req.body.estimatedGuests !== 'undefined') {
                    if (this.isEmpty(req.body.estimatedGuests))
                        error.message = 'Number of estimated guests cannot be empty!';

                    else if (!this.isInteger(req.body.estimatedGuests))
                        error.message = 'Number of estimated guests, must be an integer value!';

                }
                if (!error.message && typeof req.body.description !== 'undefined') {
                    if (this.isEmpty(req.body.description))
                        error.message = 'Description cannot bet empty!';

                    else if (!this.isString(req.body.description))
                        error.message = 'Please, enter a valid description!';
                }
            }

            return (error.message) // if error message is set, send error to client
                ? ModelService.errorResponse(res, error) 
                : next();
        }
    }

    /**
     * @description validate if a particular event already exist
     * @static
     * @method isExistEvent
     * @memberof EventValidations
     * @returns {function} A middleware function that handles the validations
     */
    static isExistEvent() {
  	    return (req, res, next) => {
              
  		    if (!req.body.title)
  			    return next();
  		    else {
                req.body = this.upperCaseFirst(req.body, {bool: true});                 
	  		    return ModelService.ifExistModelObject(Event, {
                    where: {
                        userId: req.body.user.userId,
                        title: req.body.title,
                        date: req.body.date
                    },
                    message: `This ${Event.name.toLowerCase()} has already been slated for this date.`
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
export default EventValidations;