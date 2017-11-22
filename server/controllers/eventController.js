import models from '../models';
import services from '../services'

const { Center, User, Event } = models,
      { ModelService } = services,
      include = [{
          model: User,
          attributes: ['userId', 'email','username']
      }];

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

    /**
     * @description Gets a single event
     * @static
     * @method getEvent
     * @memberof EventController
     * @returns {function} An express middleware function that handles the GET request
     */
    static getEvent() {
        return (req, res) => {
            return this.findOneModelObject(Event, {
                where: { 
                    eventId: req.params.eventId,
                    userId: req.body.user.userId
                },
                include: include
            })
            .then((event) => {
                this.successResponse(res, {event: event});
            })
            .catch(error => {
                this.errorResponse(res, error);
            })
        }
    }

    /**
     * @description Updates an event details
     * @static
     * @method updateEvent
     * @memberof EventController
     * @return {function} A middleware function that handles the PUT request 
     */
    static updateEvent() {
        return (req, res) => {
            const {user, ...update} = req.body;
            return this.updateModelObject(Event, {
                where: {
                    eventId: req.params.eventId,
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
     * @description Deletes a event
     * @static
     * @method deleteEvent
     * @memberof EventController
     * @returns {Function} A middleware funtion that handlses the DELETE request
     */
    static deleteEvent() {
        return (req, res) => {
            return this.deleteModelObject(Event, {
                where: {
                    eventId: req.params.eventId,
                    userId: req.body.user.userId
                }
            })
            .then((result) => {
                this.successResponse(res, result);
            })
            .catch(error => {
                this.errorResponse(res, error);
            })
        }
    }
}

export default EventController;