'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_ykg32xj3w = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\routes\\centerRoutes.js',
        hash = '1e766c5b3239fa8a245db4cc8496a1940e36825b',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\routes\\centerRoutes.js',
        statementMap: {
            '0': {
                start: {
                    line: 6,
                    column: 45
                },
                end: {
                    line: 6,
                    column: 56
                }
            },
            '1': {
                start: {
                    line: 7,
                    column: 30
                },
                end: {
                    line: 7,
                    column: 38
                }
            },
            '2': {
                start: {
                    line: 8,
                    column: 30
                },
                end: {
                    line: 8,
                    column: 41
                }
            },
            '3': {
                start: {
                    line: 9,
                    column: 21
                },
                end: {
                    line: 9,
                    column: 37
                }
            },
            '4': {
                start: {
                    line: 11,
                    column: 0
                },
                end: {
                    line: 19,
                    column: 1
                }
            },
            '5': {
                start: {
                    line: 21,
                    column: 0
                },
                end: {
                    line: 30,
                    column: 1
                }
            }
        },
        fnMap: {},
        branchMap: {},
        s: {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0
        },
        f: {},
        b: {},
        _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
    },
        coverage = global[gcv] || (global[gcv] = {});

    if (coverage[path] && coverage[path].hash === hash) {
        return coverage[path];
    }

    coverageData.hash = hash;
    return coverage[path] = coverageData;
}();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _services = require('../services');

var _services2 = _interopRequireDefault(_services);

var _validations = require('../validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (cov_ykg32xj3w.s[0]++, _controllers2.default),
    CenterController = _ref.CenterController,
    UserController = _ref.UserController,
    _ref2 = (cov_ykg32xj3w.s[1]++, _services2.default),
    ValidationService = _ref2.ValidationService,
    _ref3 = (cov_ykg32xj3w.s[2]++, _validations2.default),
    CenterValidations = _ref3.CenterValidations,
    centerRouter = (cov_ykg32xj3w.s[3]++, _express2.default.Router());

cov_ykg32xj3w.s[4]++;


centerRouter.route('/api/v1/centers').post(UserController.validateUserAccess(), UserController.checkPrivilege(), CenterValidations.validateCenter(), CenterValidations.ifExistCenter(), CenterController.createCenter()).get(CenterController.searchCenters(), CenterController.getCenters());

cov_ykg32xj3w.s[5]++;
centerRouter.route('/api/v1/centers/:centerId').put(UserController.validateUserAccess(), UserController.checkPrivilege(), CenterValidations.validateCenter(), CenterValidations.ifExistCenter(), CenterController.updateCenter()).get(ValidationService.isValidIntegerURI(), CenterController.getBookings(), CenterController.getCenter());

exports.default = centerRouter;