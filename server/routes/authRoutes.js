
import express from 'express';
import controllers from '../controllers';
import services from '../services';
import validations from '../validations';

const UserController = controllers.UserController,
      UserValidations = validations.UserValidations,
      authRouter = express.Router();

authRouter.post('/api/v1/users',
    UserValidations.validateUser(),
    UserValidations.isUniqueEmail(), 
    UserValidations.isUniqueUsername(),
    UserController.signup());

authRouter.post('/api/v1/users/login',
	UserController.validateAuthCredentials(),
	UserController.signin());

export default authRouter;