import express from 'express';
import controllers from '../controllers';
import services from '../services';
import validations from '../validations';

const { EventController, UserController } = controllers,
      { ValidationService } = services,
      { EventValidations } = validations,
      eventRouter = express.Router();

eventRouter.route('/api/v1/events')
.post(UserController.validateUserAccess(),
    EventValidations.validateEvent(),
    EventValidations.isExistEvent(),
    EventController.createEvent())

eventRouter.route('/api/v1/events/:eventId')
.all(UserController.validateUserAccess())
.get(EventController.getEvent())



export default eventRouter;