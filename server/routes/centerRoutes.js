import express from 'express';
import controllers from '../controllers';
import services from '../services';
import validations from '../validations';

const { CenterController, UserController } = controllers,
      { ValidationService } = services,
      { CenterValidations } = validations,
      centerRouter = express.Router();

centerRouter.route('/api/v1/centers')
.post(UserController.validateUserAccess(),
    UserController.checkPrivilege(),
    CenterValidations.validateCenter(),
    CenterValidations.ifExistCenter(),
    CenterController.createCenter())
.get(CenterController.searchCenters(), 
    CenterController.getCenters()
)

centerRouter.route('/api/v1/centers/:centerId')
.put(UserController.validateUserAccess(),
    UserController.checkPrivilege(),
    //CenterValidations.validateCenter(),
    CenterValidations.ifExistCenter(),
    CenterController.updateCenter()
)
.get(ValidationService.isValidIntegerURI(),
    CenterController.getBookings(),
    CenterController.getCenter()
)



export default centerRouter;