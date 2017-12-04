import models from '../models';
import UtilityService from './utilityService';

const status = { 
	success: 'Success',
	failure: 'Fail' 
};

/**
 * @description 
 * @class ModelService
 */
 class ModelService extends UtilityService {
 	/**
 	 * @description Create an object of a model; i.e., a row of a table in the database 
 	 * @static
 	 * @memberof ModelSeervice
 	 * @param {Object} model The model to be instantiated
 	 * @param {Objects} options 
 	 * Note: options.attributes: model attributes
 	 *       options.message: optional message to be sent if successful
 	 * @returns {Promise.Object} A promise that resolves if object
 	 * is successfully created or rejects with an error object if otherwise
 	 */
 	static createModelObject(model, options) {
 		return model.create(this.trimAttributes(options.attributes))
 		.then((newObj) => {
 			return {
 				status: status.success,
 				message: (typeof options.message !== 'undefined') 
 						  ? options.message
 						  : `${model.name} successfully created!`,
 				[model.name.toLowerCase()]: newObj
 			};
 		})
 		.catch((error) => {
		  	const err = this.refactorError(`Could not create ${model.name}`, error);
		  	return Promise.reject(err);
 		});
 	}

	/**
	 * @description Checks if at leats an attribute of a model has been modified
	 * when update is beign made
	 * @static
	 * @memberof ModelService
	 * @param {Object} model
	 * @param {Object} updates object with the new attributes
	 * @returns {Object} An object with two properties--isVerfied and isEdited.
	 * Note: isVerified is true, if it's a valid form; false, if otherwise 
	 * isEdited is true, if at least an attributed was edited; false, if otherwise
	 */
	static verifyUpdate(updates, modelObject) {
		const modelAttributes = modelObject.attributes;
		const formFields = Object.keys(updates);

		let edited = false;
	
		const commonElem = formFields.filter((elem) => {
								return modelAttributes.indexOf(elem) > -1;
						   });

		for (let i = 0; i < commonElem.length; i++) {
			//Check if at least one attribute of the object has been edited
    		if (updates[commonElem[i]].toString().toLowerCase() != modelObject[commonElem[i]].toString().toLowerCase()) {
	  			edited = true;
	  			break
	  		}
	  	}

		return {
			isVerified: formFields.length === commonElem.length,
			isEdited: edited,
		}
	} 

 	/**
 	 * @description Gets a single object of a model -- equivalent to a database
 	 * table row
 	 * @memberof ModelService
 	 * @static
 	 * @param {Object} model
 	 * @param {Object} options
 	 * @retrns {Promise.Object} A promise which resoolves with the found  
 	 * object (table row) or reject with an error object if otherwise
 	 * @see findAllModelObjects(model, options)
 	 */
 	static findOneModelObject(model, options) {
 		const error = new Error();
 		const {id, message, ...opt} = options;
 	    return ((Object.keys(options.where).includes('id'))
 			? model.findById(id, opt)
 			: model.findOne(options)
 		)
		.then((object) => {
			if(!object) {
    			error.code = 404;
    			error.message = (typeof message === 'undefined') 
    						? `${model.name} does not exist!`
    						: message;
    		throw error;
  		}
			return object;
		})
		.catch(error => {
			return Promise.reject(error);
		})
	}


 	/**
 	 * @description check ifa model object exist
 	 * @memberof ModelService
 	 * @static
 	 * @param {Object} model
 	 * @param {Object} options
 	 * Note: options.where: the condition by which object will be find
 	 *       options.message: the message to send if found
 	 * @retrns {Promise.object} A promise that resolve with true if not found;
 	 * reject with an error if found
 	 */
 	static ifExistModelObject(model, options) {
	 	const {id, message, ...opt} = options;
    	return ((Object.keys(options.where).includes('id'))
		  ? model.findById(options.where.id, opt)
		  : model.findOne(opt)
		)
	 	.then(object => {
	 		const error = Error();
	 		error.code = 409;
	 		error.message = (typeof options.message !== 'undefined')
	 										? options.message 
	 										: `${model.name} already exist`;

	 		return (!object) ? Promise.resolve(true) : Promise.reject(error);
	 	})
 	}

 	/**
 	 * @description Gets all object of a model -- equivalent to database
 	 * table rows
 	 * @memberof ModelService
 	 * @static
 	 * @param {Object} model
 	 * @param {Object} options
 	 * @retrns {Promise.Object} A promise which resoolves with the found  
 	 * object (table row) or reject with an error object if otherwise
 	 * @see findOneModelObject(model, options)
 	 */
 	static findAllModelObjects(model, options) {
 	  return model.findAll(options)
 		.then(models => {
 			if(models.length > 0)
 				return models;
 			else {
				// Here, we pluralizes the error message properly
				let name = model.name.toString();
				if(name.toLowerCase().substr(-1) === 'y')
					name = name.substr(0, name.length - 1)+'ies'
				else name += 's';

 				const error = new Error();
 				error.code = 404;
 				error.message = (typeof options.message === 'undefined')
 								 				? `${name} not found!`
 								 				: options.message;
 				throw error;
 			}
 		})
 		.catch(error => {
 			return Promise.reject(error);
 		});
 	}

	/**
	 * @description Deletes a model object; i.e., a table row
	 * @static
	 * @memberof ModelService
	 * @param {Object} model 
	 * @param {Object} options
	 * @returns {Promise.Object} A promise that resolve if the delete 
	 * is successful or rejects with an error object if otherwise
	 */
    static deleteModelObject(model, options) {
		return this.findOneModelObject(model, options)
		.then((modelObject) => {	
		 	return modelObject.destroy()
		 	.then(() => {
		 		return {
		 			status: 'Success',
		 			message: (typeof options.message === 'undefined') 
		 								? `${model.name} successfully deleted`
		 								: options.message
		 		};
		 	});
		})
		.catch(error => {
		 	return Promise.reject(error);	
	  })
	} 

	/**
	 * @description Updates a model object; i.e., a table row
	 * @static
	 * @memberof ModelService
	 * @param {Object} model
	 * @param {Object} attributes
	 * @param {Object} newAttributes
	 * @param {Object} updatesObj object with the new attributes
	 * @returns {Promise.Object} A promise that resolve if the update 
	 * is successful; rejects if otherwise
	 */
    static updateModelObject(model, options, updatesObj) {
		return this.findOneModelObject(model, {
			where: this.trimAttributes(options.where),
		})
		.then((modelObject) => {	
			const attributes = this.trimAttributes(options.attributes);
		    const verify = this.verifyUpdate(updatesObj, modelObject);
		    return modelObject.update(attributes, {fields: Object.keys(attributes)})
		 	.then((updatedModel) => {
		 	 	if(updatedModel) {
		 	 		return {
						status: (verify.isEdited) ? status.success : status.failure,
						// Send a proper message to the client
						message: (verify.isEdited) 
											? (typeof options.message !== 'undefined') 
													? options.message : `${model.name} successfully updated!`
											: `${model.name} not updated, no change found`,
						[model.name.toLowerCase()]: updatedModel,
		 	 		};
		 	 	} else {
					const msg =`Could not update ${model.name}`
					throw this.refactorError(msg, error);
				}
			})
    	})
		.catch(error => {
			return Promise.reject(error);		
		})
	}

    /**
 	 * @description Refactor error object for better readability
 	 * @static 
 	 * @memberof ModelService
 	 * @param {Object} model an object of the model in context
 	 * @param {Object} error the error object thrown
 	 * @returns {Object} the refactored error object
 	 */
  	static refactorError(message, err) {
		const error = new Error();
		error.success = false;
		let serverErr = false;

		if(!err.code) {
			switch(err.name) {
				case 'SequelizeValidationError':
				case 'SequelizeUniqueConstraintError':
					const errorInfo = err.errors[0];
					const path = errorInfo.path;
					error.code = 400;

					if (errorInfo.type.toLowerCase() === 'notnull violation')
						message = this.upperCaseFirst(path) + ' is required!';
					else message = err.errors[0].message
					break;
				default:
					error.code = 500;
					serverErr = true;
			}
			error.code = error.code || err.code;
			error.message = (serverErr) ? `Server error! `+message : message
		}
   		return error;
	}
	
   /**
 	* @description Process and format error object
	* @static 
	* @memberof ModelService
	* @param {Object} response the server's response object
	* @param {Object} error the error object to be processed
	* @returns {Object} the processed error object
	*/
	static errorResponse(response, error, msg) {
		if(!error.code){ error.code = 500; error.message = msg || error.toString();} //remove this later
		return response.status(error.code).send({
			status: status.failure,
			message: msg || error.message
		});
	}

   /**
 	* @description Returns success message
	* @static 
	* @memberof ModelService
	* @param {Object} response the server's response object
	* @param {Object} object the data to return
	* @param {Integer} code status code (default is 200)
	* @returns {Object} 
	*/
	static successResponse(response, object, code) {
		const statusCode = code || 200;
		return response.status(statusCode).json(object);
	}
	

   /**
 	* @description Returns status message object
	* @static 
	* @method
	* @memberof ModelService
	* @returns {Object} 
	*/
	static getStatus() {
		return status;
	}
}
export default ModelService;