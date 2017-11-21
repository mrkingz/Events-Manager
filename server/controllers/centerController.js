import models from '../models';
import services from '../services'

const { Center, User } = models,
      { ModelService } = services;

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
    static getCenters()
    {
        return (req, res) => {
            return this.findAllModelObjects(Center, {
                where: { userId: req.body.user.userId },
                order: [['name', 'ASC']]
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
    static getCenter()
    {
        return (req, res) => {
            return this.findAllModelObjects(Center, {
                where: { centerId: req.params.centerId }
            })
            .then((center) => {
                this.successResponse(res, {center: center});
            })
            .catch(error => {
                this.errorResponse(res, error);
            })
        }
    }
}

export default CenterController;