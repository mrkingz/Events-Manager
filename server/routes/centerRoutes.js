import express from 'express';
import controllers from '../controllers';
import services from '../services';
import validations from '../validations';

const { CenterController, UserController } = controllers,
      { CenterValidations } = validations,
      centerRouter = express.Router();

centerRouter.route('/api/v1/centers')
.all(UserController.validateUserAccess(),
    UserController.checkPrivilege())
.post(CenterValidations.validateCenter(),
    CenterValidations.ifExistCenter(),
    CenterController.createCenter());

centerRouter.route('/api/v1/centers/:centerId')
.all(UserController.validateUserAccess(),
    UserController.checkPrivilege())
.put(CenterValidations.validateCenter(),
    CenterValidations.ifExistCenter(),
    CenterController.updateCenter())
.get()

export default centerRouter;