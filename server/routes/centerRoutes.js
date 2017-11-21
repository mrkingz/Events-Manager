import express from 'express';
import controllers from '../controllers';
import services from '../services';
import validations from '../validations';

const { CenterController, UserController } = controllers,
      { CenterValidations } = validations,
      centerRouter = express.Router();

centerRouter.route('/api/v1/centers')
.all(UserController.validateUserAccess())
.post(UserController.checkPrivilege(),
    CenterValidations.validateCenter(),
    CenterValidations.ifExistCenter(),
    CenterController.createCenter())
.get(CenterController.getCenters())

centerRouter.route('/api/v1/centers/:centerId')
.all(UserController.validateUserAccess())
.put(UserController.checkPrivilege(),
    CenterValidations.validateCenter(),
    CenterValidations.ifExistCenter(),
    CenterController.updateCenter())


export default centerRouter;