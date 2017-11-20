import models from '../models';
import services from '../services'
import bcrypt from 'bcrypt';

const { User } = models,
      { ModelService } = services;

/**
 * @class UserController
 */
class UserController extends ModelService {
    /**
     * @description Signup a new user
     * @static
     * @memberof UserController
     * @return {Function} A middleware function that handles the POST request 
     */
    static signup() {
        return (req, res, next) => {
            const {...modelAttributes} = req.body;
            return this.createModelObject(User, {attributes: modelAttributes})
            .then((prom) => {
                const {status, ...details} = prom;
                this.successResponse(res, {
                    status,
                    message: 'Signup completed successfully!',
                    user: {
                        userId: details.user.userId,
                        username: details.user.username,
                        email: details.user.email,
                        role: details.user.role,
                        createdAt: details.user.createdAt,
                        updatedAt: details.user.updatedAt
                    }
                }, 201);
            })
            .catch(error => {
                this.errorResponse(res, error);
            });
        };  
    }
}
export default UserController;