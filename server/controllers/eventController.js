import models from '../models';
import services from '../services'

const { Center, User, Event } = models,
      { ModelService } = services;

/**
 * @class EventController
 */
class EventController extends ModelService {
    /**
     * @description Creates a center
     * @static
     * @method createEvent
     * @memberof EventController
     * @return {Function} A middleware function that handles the POST request 
     */
    static createEvent() {
        return (req, res) => {
            const {user, ...modelAttributes} = req.body;
            modelAttributes.userId = user.userId;
            return this.findOneModelObject(Center, {
                where: { centerId: req.body.centerId }
            })
            .then((center) => {
                return this.createModelObject(Event, {attributes: modelAttributes})
                .then((event) => {
                    this.successResponse(res, event, 201)
                })
            })
            .catch(error => {
                this.errorResponse(res, error);
            });
        };
    }
}

export default EventController;