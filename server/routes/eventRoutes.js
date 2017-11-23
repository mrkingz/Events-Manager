import express from 'express';
import controllers from '../controllers';
import services from '../services';
import validations from '../validations';

const { EventController, UserController, CenterController } = controllers,
      { ValidationService } = services,
      { EventValidations } = validations,
      eventRouter = express.Router();

eventRouter.route('/api/v1/events')
.all(UserController.validateUserAccess())
.post(EventValidations.validateEvent(),
    EventValidations.isExistEvent(),
    CenterController.vaildateCapacity(),
    CenterController.isCenterAvailable(),
    EventController.createEvent())
.get(EventController.getEvents())

eventRouter.route('/api/v1/events/:eventId')
.all(UserController.validateUserAccess(),
    ValidationService.isValidIntegerURI())
.get(EventController.getEvent())
.delete(EventController.deleteEvent())
.put(EventValidations.validateEvent(),
    CenterController.isValidCenter(),
    CenterController.vaildateCapacity(),
    CenterController.isCenterAvailable(),
    EventController.updateEvent())



export default eventRouter;