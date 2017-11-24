'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_xuxe9d6yc = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\routes\\authRoutes.js',
        hash = 'edad307cfa1309435a6e3bdc255f52d1ab241792',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\routes\\authRoutes.js',
        statementMap: {
            '0': {
                start: {
                    line: 6,
                    column: 23
                },
                end: {
                    line: 6,
                    column: 49
                }
            },
            '1': {
                start: {
                    line: 7,
                    column: 24
                },
                end: {
                    line: 7,
                    column: 51
                }
            },
            '2': {
                start: {
                    line: 8,
                    column: 19
                },
                end: {
                    line: 8,
                    column: 35
                }
            },
            '3': {
                start: {
                    line: 10,
                    column: 0
                },
                end: {
                    line: 14,
                    column: 29
                }
            },
            '4': {
                start: {
                    line: 16,
                    column: 0
                },
                end: {
                    line: 18,
                    column: 26
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
            '4': 0
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

var UserController = (cov_xuxe9d6yc.s[0]++, _controllers2.default.UserController),
    UserValidations = (cov_xuxe9d6yc.s[1]++, _validations2.default.UserValidations),
    authRouter = (cov_xuxe9d6yc.s[2]++, _express2.default.Router());

cov_xuxe9d6yc.s[3]++;
authRouter.post('/api/v1/users', UserValidations.validateUser(), UserValidations.isUniqueEmail(), UserValidations.isUniqueUsername(), UserController.signup());

cov_xuxe9d6yc.s[4]++;
authRouter.post('/api/v1/users/login', UserController.validateAuthCredentials(), UserController.signin());

exports.default = authRouter;