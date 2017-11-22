import models from '../models';
import services from '../services'

const { Center, User, Event } = models,
      { ModelService } = services;
const include = [{
            model: Event,
            order: [['title', 'ASC']],
            include: [{
                model: User,
                attributes: ['username', 'email', 'userId']
            }]
        }]

/**
 * @class CenterController
 */
class CenterController extends ModelService {
    /**
     * @description Creates a center
     * @static
     * @method createCenter
     * @memberof CenterController
     * @return {Function} A middleware function that handles the POST request 
     */
    static createCenter() {
        return (req, res) => {
            const {...modelAttributes} = req.body;
            modelAttributes.userId = req.body.user.userId;
            return this.createModelObject(Center, {attributes: modelAttributes})
            .then((center) => {
                this.successResponse(res, center, 201)
            })
            .catch(error => {
                this.errorResponse(res, error);
            });
        };
    }

    /**
     * @description Updates an event center details
     * @static
     * @method updateCenter
     * @memberof CenterController
     * @return {Function} A middleware function that handles the PUT request 
     */
    static updateCenter() {
        return (req, res) => {
            const {user, ...update} = req.body
            return this.updateModelObject(Center, {
                where: {
                    centerId: req.params.centerId,
                    userId: req.body.user.userId
                },
                attributes: update
            }, req.body)
            .then((updated) => {
                this.successResponse(res, updated);
            })
            .catch(error => {
                this.errorResponse(res, error);
            })            
        }
    }

    /**
     * @description Gets all event centers
     * @method getCenters
     * @static
     * @memberof CenterController
     * @returns {function} A middleware function that handles the GET request
     */
    static getCenters() {
        return (req, res) => {
            return this.findAllModelObjects(Center, {
                order: [['name', 'ASC']],
                include: include,
                offset: req.query.page || 0,
                limit: 10
            })
            .then((centers) => {
                this.successResponse(res, {centers: centers});
            })
            .catch(error => {
                this.errorResponse(res, error);
            })
        }
    }

    /**
     * @description Gets a single event center
     * @method getCenter
     * @static
     * @memberof CenterController
     * @returns {function} A middleware function that handles the GET request
     */
    static getCenter() {
        return (req, res) => {
            return this.findOneModelObject(Center, {
                where: { centerId: req.params.centerId },
                include: include
            })
            .then((center) => {
                this.successResponse(res, {center: center});
            })
            .catch(error => {
                this.errorResponse(res, error);
            })
        }
    }

    /**
     * @description Checks if an event center exist
     * @method isValidCenter
     * @static
     * @memberof CenterController
     * @returns {function} An express middleware function that handles the validaion
     */
    static isValidCenter() {
        return (req, res, next) => {
            if(req.body.centerId) {
                return this.findOneModelObject(Center, {
                    where: { centerId: req.body.centerId },
                    attributes: ['centerId']
                })
                .then((center) => {
                    return next();
                })
                .catch(error => {
                    this.errorResponse(res, error);
                })
            }
            else return next();
        }
    }

    /**
     * @description Validatesthe number of estimated guest to make sure it doesn't exceed
     * the capacity of the given center
     * @static
     * @method validateCapacity
     * @memberof CenterController
     * @returns {function} An express middleware function that handles the validaion
     */
    static vaildateCapacity() {
        return (req, res, next) => {
            let validate = true;

            if(req.method === 'PUT' && !req.body.estimatedGuests)
                validate = false;

            if (validate) {
                return this.findOneModelObject(Center, {
                    where: { centerId: req.body.centerId },
                    attributes: ['capacity'],
                })
                .then((center) => {
                    if(parseInt(center.capacity, 10) >= parseInt(req.body.estimatedGuests, 10))
                        return next();
                    else {
                        const error = new Error();
                        error.message = `Sorry, number of estiamted guests is above the capacity of this ${Center.name.toLowerCase()}`;
                        throw error;
                    }
                })
                .catch(error => {
                    this.errorResponse(res, error);
                })

            } else return next();
        }
    }
}

export default CenterController;