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
}

export default CenterController;