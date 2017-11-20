
import express from 'express';
import controllers from '../controllers';
import services from '../services';
import validations from '../validations';

const UserController = controllers.UserController,
      UserValidations = validations.UserValidations,
      authRouter = express.Router();

authRouter.post('/api/v1/signup',
  UserValidations.validateUser(),
  UserValidations.isUniqueEmail(), 
  UserValidations.isUniqueUsername(),
  UserController.signup());

export default authRouter;