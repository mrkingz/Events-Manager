import models from '../models';
import services from '../services'
import bcrypt from 'bcrypt';

const { User } = models,
      { ModelService, AuthenticationService } = services;

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
            .then((promise) => {
                const {status, ...details} = promise;
                this.successResponse(res, {
                    status,
                    message: 'Signup completed successfully!',
                    /**
                     * We have to make sure password is not returned
                     */
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

    /**
     * @description Authenticates a user with username and password 
     * @static
     * @memberof UserController
     * @return {Function} A middleware function that handles the authenitication
     */
    static signin() { 
        return (req, res) => {
            const error = new Error();

            // Check if user's username exist
            return this.findOneModelObject(User, {
                where: {username: req.body.username.trim()}, 
                attributes: {exclude: ['createdAt', 'updatedAt']}
            })
            .then((user) => {
                return bcrypt.compare(req.body.password.trim(), user.password)
                .then((validPass) => {
                    if(validPass) {
                        const secret = process.env.SECRET_KEY;
                        const {userId, email, username} = user;

                        // Generate a JSON Web Token
                        return AuthenticationService.generateJWT({userId, email, username}, secret)
                        .then(jwt => {
                            this.successResponse(res, {
                                status: 'success',
                                message: 'Token successfully generated',
                                token: jwt,
                            });
                        });
                    }
                    else throw error;
                });
            })
            .catch(error => {
                if(error.code !== 500 && !error.messgae) {
                    error.code = 400;
                    error.message = 'Invalid username and password';
                }

                this.errorResponse(res, error);
            });
        };
    }

    /**
     * @description Validates if authentication credentials are provided
     * Note: if request method is POST, it validates username and password
     *       if request method is PUT, validates password only
     * @static
     * @memberof UserController
     * @return {Function} A middleware function that handles the validation
     */
    static validateAuthCredentials() {
        return (req, res, next) => {
            const error = new Error();
            error.code = 400;
            if (req.method === 'POST') {
                if (!req.body.username || !req.body.password)
                    error.message = 'Username and password required!';
            } else if (req.method === 'PUT') {
                if(!req.body.password)
                    error.message = 'New password required!';
            }

            if(error.message) 
                this.errorResponse(res, error)
            else return next();
        }
    }

    /**
     * @description Verifies user's token and validates user's access
     * @memberof UserController
     * @static
     * @return {Function} A middleware function that validates user's token
     */
    static validateUserAccess() {
        return (req, res, next) => {
            const error = new Error();
            let token = req.cookies.token || req.get('Authorization') || 
                        req.query.token || req.body.token || req.headers['token']; 

            if(token) {

                const regex = new RegExp('/^Bearer (\S+)$/'),
                      match = regex.exec(token);

                token = (match) ? match[1] : token;

                return AuthenticationService.decodeJWT(token, process.env.SECRET_KEY)
                .then((decoded) => {
                    return this.findOneModelObject(User, {
                        where: {
                            userId: decoded.userId,
                            email: decoded.email,
                            username: decoded.username
                        },
                        attributes: ['userId','email', 'username', 'role'],
                    })
                    .then((user) => {
                        req.body.user = user //append user details
                        return next();
                    });
                })
                .catch(error => { 
                    this.errorResponse(res, error); 
                });
            }
            else {
                error.code = 401;
                this.errorResponse(res, error, 'Access denied! Token not provided');
            }
        }
    }

    /**
     * @description checks for approipriate privileges
     * @method checkPrivilege
     * @memberof UserController
     * @static
     * @return {function} An express middleware function that checks if users's privileges
     */    
    static checkPrivilege() {
        return (req, res, next) => {
            if (req.body.user.role === 1) {
                return next();
            } else {

                const error = new Error();
                error.message = "Access denied! You do not have the privilege to perform this operation"
                error.code  = 403;
                return this.errorResponse(res, error);
            }
        };
    }
}
export default UserController;