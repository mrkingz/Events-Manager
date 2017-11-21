import express from 'express';
import controllers from '../controllers';
import services from '../services';
import validations from '../validations';

const { CenterController, UserController } = controllers,
      { CenterValidations } = validations,
      centerRouter = express.Router();

centerRouter.post('/api/v1/centers', 
    UserController.validateUserAccess(),
    UserController.checkPrivilege(),
    CenterValidations.validateCenter(),
    CenterValidations.ifExistCenter(),
    CenterController.createCenter());

export default centerRouter;