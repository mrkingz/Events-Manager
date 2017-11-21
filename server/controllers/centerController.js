import models from '../models';
import services from '../services'

const { Center, User } = models,
      { ModelService } = services;

/**
 * @class CenterController
 */
class CenterController extends ModelService {
    /**
     * @description Creates a center
     * @static
     * @memberof CenterController
     * @return {Function} A middleware function that handles the POST request 
     */
    static createCenter() {
        return (req, res) => {
            const {...modelAttributes} = req.body;
            modelAttributes.userId = req.body.user.userId;
            return this.createModelObject(Center, {attributes: modelAttributes})
            .then((center) => {
                this.successResponse(res, center, 201)
            })
            .catch(error => {
                this.errorResponse(res, error);
            });
        };
    }
}

export default CenterController;